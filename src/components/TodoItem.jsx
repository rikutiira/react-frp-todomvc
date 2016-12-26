import { className } from 'utils/component'
import styles from './todo.scss'

const c = className(styles)
const makeCb = R.curry((obs, cb) => K(obs, (val) => (e) => cb(e, val)))

/**
 * In our todomvc application, the item passed to <TodoItem> is observable.
 * <TodoItem> would also work if item was plain object.
 */
export default ({ item, onComplete, onDelete }) => {
    const completed = U.view('completed', item)
    const name = U.view('name', item)
    const cb = makeCb(U.view('id', item))

    return (
        <div {...c(styles.item, { completed })}>
            <input type="checkbox" checked={completed} onChange={cb((e, id) => onComplete(id))} />
            <label>{name}</label>
            <a
                className={styles.close}
                children='x'
                href="#delete"
                onClick={cb((e, id) => {
                    e.preventDefault()
                    onDelete(id)
                })} />
        </div>
    )
}
