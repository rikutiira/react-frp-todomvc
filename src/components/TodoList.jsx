import React from 'karet'
import Kefir from 'kefir'
import { seq, mapIndexed } from 'karet.util'

import todos$, { addTodo, deleteTodo } from 'stores/todos'

export default () => (
    <div>
        <h1>Todos</h1>
        <div>
            {Kefir.later(1000, 'test')}
        </div>
    </div>
)
