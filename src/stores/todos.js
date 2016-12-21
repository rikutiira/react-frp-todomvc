import R from 'ramda'
import { createAction, createStore } from 'utils/observable'

const [ addTodo, addTodo$ ] = createAction()
const [ deleteTodo, deleteTodo$ ] = createAction()
const [ toggleComplete, toggleComplete$ ] = createAction()
const [ removeCompleted, removeCompleted$ ] = createAction()

export default createStore(
    [],

    [addTodo$],
    (state, name) => state.concat({
        id: +new Date(),
        name,
        completed: false
    }),

    [deleteTodo$],
    (state, id) => state.filter((it) => it.id !== id),

    [toggleComplete$],
    (state, id) => state.map((it) => it.id === id
        ? R.merge(it, { completed: !it.completed })
        : it),

    [removeCompleted$],
    (state) => state.filter((it) => !it.completed)
)

export { addTodo, deleteTodo, toggleComplete, removeCompleted }
