import React from 'karet'
import R from 'ramda'
import { seq, length, mapIndexed } from 'karet.util'

export default ({ todos, onFilter }) => {
    const remaining = todos.map((it) => R.filter(({ completed }) => !completed, it))
    const filters = [
        { value: undefined, name:' All' },
        { value: false, name: 'Active' },
        { value: true, name: 'Completed' }
    ]

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
