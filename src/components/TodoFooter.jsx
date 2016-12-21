import React from 'karet'
import R from 'ramda'
import { seq, filter, length, mapIndexed } from 'karet.util'

export default ({ todos, filters, onFilter }) => {
    const remaining = filter(({ completed }) => !completed, todos)

    return (
        <div>
            <span>{ length(remaining) } items left</span>
            <div>
                {seq(filters, mapIndexed(({ value, name }, idx) =>
                    <a
                        key={idx}
                        children={name}
                        href={'#/'+value}
                        onClick={() => onFilter(value)} />
                ))}
            </div>
        </div>
    )
}
