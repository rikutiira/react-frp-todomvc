import TodoItem from 'components/TodoItem.jsx'
import TodoFooter from 'components/TodoFooter.jsx'

import todos$, * as actions from 'stores/todos'
import route$, { transition } from 'stores/route'
import { createActionProperty } from 'utils/observable'

import styles from './todo.scss'

const FILTERS = [
    { value: undefined, id: '', name: 'All' },
    { value: false, id: 'active', name: 'Active' },
    { value: true, id: 'completed', name: 'Completed' }
]

/**
 * Components will never re-render. setState is never used anywhere and render() works as mounting function.
 *
 * DOM elements (<input>, <div>, etc.) will transparently attach listeners to their observable props and
 * will re-render whenever they emit new values. The elements will also unsubscribe once they unmount.
 */
export default () => {
    // action(value) will push value into action$, supports middleware functions before pushing into action$
    const [ todoValue, todoValue$ ] = createActionProperty(() => '')

    // create derived stream before return to keep JSX clean
    const visibleTodoIds$ = Kefir
        .combine([
            todos$,
            route$.map((route) => R.find(R.propEq('id', route), FILTERS).value)
        ])
        .map(([todos, filter]) => todos.filter(({ completed }) => R.isNil(filter) || completed === filter))
        .map(R.map(R.prop('id')))
        .toProperty()

    return (
        <div>
            <h1>todos</h1>
            <div className={styles.list}>
                { /* input re-renders when todoValue$ emits a value */ }
                <input
                    className={styles.add}
                    type="text"
                    placeholder="What needs to be done?"
                    value={todoValue$}
                    onChange={(e) => todoValue(e.target.value)}
                    onKeyDown={({ keyCode, target }) => {
                        if (keyCode === 13) {
                            actions.addTodo(target.value)
                            todoValue('')
                        }
                    }}/>
                <div>
                    { /* karet.utils (U) works with observables or plain js types */ }
                    {U.seq(visibleTodoIds$, U.mapCached((id) => {
                        return (
                            <TodoItem
                                key={id}
                                id={id}
                                item={U.find(R.whereEq({ id }), todos$)}
                                onRename={actions.renameTodo}
                                onComplete={actions.toggleComplete}
                                onDelete={actions.deleteTodo} />
                        )
                    }))}
                </div>
                { /* <TodoFooter>, like <TodoItem>, does not care whether todos is observable or not */ }
                <TodoFooter
                    todos={todos$}
                    filters={FILTERS}
                    activeFilter={route$}
                    onFilter={transition}
                    onClearCompleted={actions.clearCompleted} />
            </div>
        </div>
    )
}
