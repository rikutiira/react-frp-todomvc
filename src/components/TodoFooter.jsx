import React from 'karet'
import R from 'ramda'
import * as U from 'karet.util'

export default ({ todos, filters, onFilter, onClearCompleted }) => {
    const remaining = U.length(U.filter(({ completed }) => !completed, todos))

    return (
        <div>
            <span>{remaining} items left</span>
            <div>
                {U.seq(filters, U.mapIndexed(({ value, name }, idx) =>
                    <a
                        key={idx}
                        children={name}
                        href={'#/' + name.toLowerCase()}
                        onClick={() => onFilter(value)} />
                ))}
            </div>
            <a href="#" onClick={(e) => {
                e.preventDefault()
                onClearCompleted()
            }}>Clear completed</a>
        </div>
    )
}
