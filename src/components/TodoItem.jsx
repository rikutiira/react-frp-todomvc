import React from 'karet'

export default ({ id, name, completed, onComplete, onDelete }) => (
    <div>
        <input type="checkbox" checked={completed} onChange={() => onComplete(id)} />
        <span>{name}</span>
        <a children='X'
            href="#delete"
            onClick={(e) => {
                e.preventDefault()
                onDelete(id)}
            } />
    </div>
)
