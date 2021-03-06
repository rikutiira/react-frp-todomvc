import 'styles/global.scss'
import 'globals'

import ReactDOM from 'react-dom'
import TodoList from 'components/TodoList.jsx'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
    <TodoList />,
    document.querySelector('#app')
)
