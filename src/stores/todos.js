import { createAction, createStore } from 'utils/observable'

const [ addTodo, addTodo$ ] = createAction()
const [ renameTodo, renameTodo$ ] = createAction()
const [ deleteTodo, deleteTodo$ ] = createAction()
const [ toggleComplete, toggleComplete$ ] = createAction()
const [ clearCompleted, clearCompleted$ ] = createAction()

/**
 * createStore(initialValue, ...inputs) will create an observable property
 * with initialValue as starting value. Whenever an input stream
 * emits a new value, its corresponding fold function ((state, payload) => newState)
 * will be called to update the value hold within the store.
 */
export default createStore(
    [
        { id: 1, name: 'Stuff', completed: false },
        { id: 2, name: 'More stuff', completed: false }
    ],

    [addTodo$],
    (state, name) => state.concat({
        id: +new Date(),
        name,
        completed: false
    }),

    [renameTodo$],
    (state, { id, name }) => state.map((it) => it.id === id
        ? R.merge(it, { name })
        : it),

    [deleteTodo$],
    (state, id) => state.filter((it) => it.id !== id),

    [toggleComplete$],
    (state, id) => state.map((it) => it.id === id
        ? R.merge(it, { completed: !it.completed })
        : it),

    [clearCompleted$],
    (state) => state.filter((it) => !it.completed)
)

// If you need to update your store through imperative calls, just expose the API you want
export { addTodo, renameTodo, deleteTodo, toggleComplete, clearCompleted }
