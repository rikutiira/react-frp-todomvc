import React from 'karet'
import Kefir from 'kefir'
import R from 'ramda'
import * as U from 'karet.util'

import TodoItem from 'components/TodoItem.jsx'
import TodoFooter from 'components/TodoFooter.jsx'

import todos$, * as actions from 'stores/todos'
import { createActionProperty } from 'utils/observable'

import styles from './todo.scss'

const FILTERS = [
    { value: undefined, route: '', name: 'All' },
    { value: false, route: 'active', name: 'Active' },
    { value: true, route: 'compeleted', name: 'Completed' }
]

console.log(styles)

/**
 * Components will never re-render. setState is never used anywhere and render() works as mounting function.
 *
 * DOM elements (<input>, <div>, etc.) will transparently attach listeners to their observable props and
 * will re-render whenever they emit new values. The elements will also unsubscribe once they unmount.
 */
export default () => {
    /**
     * createAction & createActionProperty can be used in models and components all the same.
     * Useful for working with imperative APIs like DOM.
     * See utils/observable for explanation what createAction does.
     */
    const [ todoValue, todoValue$ ] = createActionProperty(R.always(''))
    const [ setFilter, filter$ ] = createActionProperty(R.always(undefined))

    /**
     * You can create derived streams before your markup code to keep your components clean.
     * Streams are lazy so you can create them freely without worrying about doing unnecessary
     * calculations.
     */
    const visibleTodos$ = Kefir
        .combine([todos$, filter$])
        .map(([todos, filter]) => todos.filter(({ completed }) => R.isNil(filter) || completed === filter))

    return (
        <div>
            <h1>todos</h1>
            <div className={styles.list}>
                { /**
                   * - <input> will re-render whenever todoValue$ emits a new value
                   *
                   * - todoValue$ is a property with a current value which is why input will
                   *   render right away with the curent value. If it was a stream, it would not render
                   *   before the stream emitted a value.
                   *
                   * - todoValue() and actions.addTodo() are used to push values into their respective
                   *   observables to update the input value and todos in model.
                   */ }
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
                    { /**
                       * - Using karet.util (=U) functions, you don't have to care about whether you
                       *   are working with observables or primitive types, they both work the same way
                       *   which makes writing async code a lot nicer.
                       *
                       * - Most karet.util functions are lifted from Ramda and work the same way so
                       *   they are both familiar and well documented.
                       *
                       * - Funnily enough both U.seq and U.mapIndexed aren't Ramda functions here. ;)
                       *   They are equivalent to:
                       *   - U.seq(collection, ...funcs) === R.pipe(...funcs)(collection)
                       *   - U.mapIndexed === R.addIndex(R.map)
                       *
                       * - Note how the code looks like nice synchronous code. You don't really know that
                       *   you are dealing with asynchronous values here.
                       */ }
                    {U.seq(visibleTodos$, U.mapIndexed(({ id, name, completed }, idx) =>
                        <TodoItem
                            id={id}
                            name={name}
                            completed={completed}
                            key={idx}
                            onComplete={actions.toggleComplete}
                            onDelete={actions.deleteTodo} />
                    ))}
                </div>
                { /**
                   * Note how you are passing an observable to <TodoFooter>. Take a look at TodoFooter code,
                   * it actually doesn't know it's getting an observable and would work with plain arrays just
                   * the same.
                   */ }
                <TodoFooter
                    todos={todos$}
                    filters={FILTERS}
                    onFilter={setFilter}
                    onClearCompleted={actions.clearCompleted} />
            </div>
        </div>
    )
}
