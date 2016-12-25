import { className } from 'utils/component'
import styles from './todo.scss'

const c = className(styles)

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
