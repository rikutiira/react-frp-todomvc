import { className, createCb } from 'utils/component'
import { createActionProperty } from 'utils/observable'
import styles from './todo.scss'

const c = className(styles)

/**
 * In our todomvc application, the item passed to <TodoItem> is observable.
 * <TodoItem> would also work if item was plain object.
 */
export default ({ item, onRename, onComplete, onDelete }) => {
    const completed = U.view('completed', item)
    const name = U.view('name', item)
    const cb = createCb(item)
    const [ isEditing, isEditing$ ] = createActionProperty(R.always(false))
    const [ editName, editName$ ] = createActionProperty(R.always(undefined))
    const editValue$ = editName$.flatMap((n) => U.toProperty(n || name))

    return (
        <div {...c(styles.item, { completed })}>
            <input type="checkbox" checked={completed} onChange={cb(({ id }) => onComplete(id))} />
            {U.ifte(isEditing$,
                <input
                    type="text"
                    value={editValue$}
                    onChange={(e) => editName(e.target.value)}
                    onKeyDown={cb(({ id }, { target, keyCode }) => {
                        if (keyCode === 13) {
                            onRename({ id, name: target.value })
                            isEditing(false)
                        } else if (keyCode === 27) {
                            isEditing(false)
                        }
                    })} />,
                <label onDoubleClick={() => isEditing(true)}>{name}</label>
            )}
            <a
                className={styles.close}
                children='x'
                href="#delete"
                onClick={cb(({ id }, e) => {
                    e.preventDefault()
                    onDelete(id)
                })} />
        </div>
    )
}
