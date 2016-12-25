import { className } from 'utils/component'
import styles from './todo.scss'

const c = className(styles)

/**
 * In our todomvc application, the item passed to <TodoItem> is observable.
 * <TodoItem> would also work if item was plain object.
 */
export default ({ item, onComplete, onDelete }) => (
    <div {...c(styles.item, { completed: item.completed })}>
        <input type="checkbox" checked={item.completed} onChange={() => onComplete(item.id)} />
        <label>{U.view('name', item)}</label>
        <a
            className={styles.close}
            children='x'
            href="#delete"
            onClick={(e) => {
                e.preventDefault()
                onDelete(item.id)}
            } />
    </div>
)
