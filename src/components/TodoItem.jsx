import { className } from 'utils/component'
import styles from './todo.scss'

const c = className(styles)

/**
 * In our todomvc application, the item passed to <TodoItem> is observable.
 * <TodoItem> would also work if item was plain object.
 */
export default ({ item, id, onComplete, onDelete }) => {
    const completed = U.view('completed', item)
    const name = U.view('name', item)

    return (
        <div {...c(styles.item, { completed })}>
            <input type="checkbox" checked={completed} onChange={() => onComplete(id)} />
            <label>{name}</label>
            <a
                className={styles.close}
                children='x'
                href="#delete"
                onClick={(e) => {
                    e.preventDefault()
                    onDelete(id)}
                } />
        </div>
    )
}
