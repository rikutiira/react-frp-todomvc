import React from 'karet'
import ReactDOM from 'react-dom'

import TodoList from 'components/TodoList.jsx'

/**
 * Append div to document and render the dev app
 */
const div = document.createElement('div')
document.body.appendChild(div)

ReactDOM.render(
    <TodoList />,
    div
)
