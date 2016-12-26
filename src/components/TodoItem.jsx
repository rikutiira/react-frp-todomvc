import { className } from 'utils/component'
import { createActionProperty } from 'utils/observable'
import styles from './todo.scss'

const c = className(styles)

/**
 * In our todomvc application, the item passed to <TodoItem> is observable.
 * <TodoItem> would also work if item was plain object.
 */
export default ({ id, item, onRename, onComplete, onDelete }) => {
    const name = U.view('name', item)
    const completed = U.view('completed', item)

    const [ isEditing, isEditing$ ] = createActionProperty(R.always(false))

    const cancel = () => isEditing(false)
    const save = (name) => {
        name ? onRename({ id, name }) : onDelete(id)
        cancel()
    }

    return (
        <div {...c(styles.item, { completed })}>
            {U.ift(U.not(isEditing$),
                <input type="checkbox" checked={completed} onChange={() => onComplete(id)} />
            )}
            <label onDoubleClick={() => isEditing(true)}>{name}</label>
            {U.ift(isEditing$,
                <input
                    type="text"
                    defaultValue={name}
                    ref={(node) => node && node.focus()}
                    onBlur={(e) => save(e.target.value)}
                    onKeyDown={(e) => {
                        e.keyCode === 13 && save(e.target.value) ||
                        e.keyCode === 27 && cancel()
                    }} />
            )}
            <a
                className={styles.close}
                children='x'
                href="#delete"
                onClick={(e) => {
                    e.preventDefault()
                    onDelete(id)
                }} />
        </div>
    )
}
