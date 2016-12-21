import R from 'ramda'
import { createAction, createStore } from 'utils/observable'

/**
 * Whenever action(value) is called, action$ emits a new value.
 * This is a way to bridge reactive programming with imperative APIs.
 */
const [ addTodo, addTodo$ ] = createAction()
const [ deleteTodo, deleteTodo$ ] = createAction()
const [ toggleComplete, toggleComplete$ ] = createAction()
const [ clearCompleted, clearCompleted$ ] = createAction()

/**
 * - createStore(initialValue, ...inputs) will create an observable property
 *   with the initialValue as starting value. Whenever any of the input streams
 *   emit new values, their corresponding fold function ((state, payload) => newState)
 *   will update the current value of the store.
 *
 * - Since the store is just a normal observable, you can subsbcribe or derive data from
 *   it in other parts of your applications, and combine it with other observables if needed.
 */
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

    [clearCompleted$],
    (state) => state.filter((it) => !it.completed)
)

/**
 * - You expose the API which can be used to update the store.
 *
 * - Your store could also listen to any arbitrary stream (like events from server)
 *   and update itself even without imperative function calls.
 */
export { addTodo, deleteTodo, toggleComplete, clearCompleted }
