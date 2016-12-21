import { createAction, createStore } from 'utils/observable'

const [ addTodo, addTodo$ ] = createAction()
const [ deleteTodo, deleteTodo$ ] = createAction()

export default createStore(
    [],

    [addTodo$],
    (state, todo) => state.concat(todo),

    [deleteTodo$],
    (state, todo) => state.filter((it) => it.id === todo.id)
)

export { addTodo, deleteTodo }