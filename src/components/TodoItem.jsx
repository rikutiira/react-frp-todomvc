import React from 'karet'
import * as U from 'karet.util'

import styles from './todo.scss'

console.log(styles)

export default ({ id, name, completed, onComplete, onDelete }) => (
    <div {...U.classes(styles.item, U.ift(completed, styles.completed))}>
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
