import React from 'karet'
import R from 'ramda'
import { seq, length, mapIndexed } from 'karet.util'

export default ({ todos, filters, onFilter }) => {
    const remaining = todos.map((it) => R.filter(({ completed }) => !completed, it))

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
