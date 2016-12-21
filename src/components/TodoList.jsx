import React from 'karet'
import Kefir from 'kefir'
import R from 'ramda'
import { seq, mapIndexed } from 'karet.util'

import TodoItem from 'components/TodoItem.jsx'
import TodoFooter from 'components/TodoFooter.jsx'

import todos$, * as actions from 'stores/todos'
import { createActionProperty } from 'utils/observable'

const FILTERS = [
    { value: undefined, name:' All' },
    { value: false, name: 'Active' },
    { value: true, name: 'Completed' }
]

export default () => {

    const [ todoValue, todoValue$ ] = createActionProperty(R.always(''))
    const [ setFilter, filter$ ] = createActionProperty(R.always(undefined))

    const visibleTodos$ = Kefir
        .combine([todos$, filter$])
        .map(([todos, filter]) => todos.filter(({ completed }) => R.isNil(filter) || completed === filter))

    return (
        <div>
            <h1>Todos</h1>
            <input
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
                {seq(visibleTodos$, mapIndexed(({ id, name, completed }, idx) =>
                    <TodoItem
                        id={id}
                        name={name}
                        completed={completed}
                        key={idx}
                        onComplete={actions.toggleComplete}
                        onDelete={actions.deleteTodo} />
                ))}
            </div>
            <TodoFooter todos={todos$} filters={FILTERS} onFilter={setFilter} />
        </div>
    )
}
