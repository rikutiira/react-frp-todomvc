import { className, createCb } from 'utils/component'
import styles from './todo.scss'

const c = className(styles)

/**
 * In our todomvc application, the item passed to <TodoItem> is observable.
 * <TodoItem> would also work if item was plain object.
 */
export default ({ item, onComplete, onDelete }) => {
    const completed = U.view('completed', item)
    const name = U.view('name', item)
    const cb = createCb(U.view('id', item))

    return (
        <div {...c(styles.item, { completed })}>
            <input type="checkbox" checked={completed} onChange={cb((id) => onComplete(id))} />
            <label>{name}</label>
            <a
                className={styles.close}
                children='x'
                href="#delete"
                onClick={cb((id, e) => {
                    e.preventDefault()
                    onDelete(id)
                })} />
        </div>
    )
}
