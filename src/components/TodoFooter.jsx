import React from 'karet'
import R from 'ramda'
import * as U from 'karet.util'

export default ({ todos, filters, onFilter }) => {
    const remaining = U.filter(({ completed }) => !completed, todos)

    return (
        <div>
            <span>{ U.length(remaining) } items left</span>
            <div>
                {U.seq(filters, U.mapIndexed(({ value, name }, idx) =>
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
