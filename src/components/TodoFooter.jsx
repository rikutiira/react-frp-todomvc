import React from 'karet'
import R from 'ramda'
import * as U from 'karet.util'
import Kefir from 'kefir'

import styles from './todo.scss'

import routeModel from 'stores/route'

/**
 * In our todomvc application, TodoFooter is being passed an observable of todos. But
 * the code here would work even if you gave it an array instead.
 */
export default ({ todos, filters, onFilter, onClearCompleted }) => {
    const remaining = U.length(U.filter(({ completed }) => !completed, todos))

    return (
        <div {...U.classes(styles.footer, 'cf')}>
            <span className={styles.filters}>
                {U.seq(filters, U.mapIndexed(({ value, name, route }, idx) =>
                    <a
                        {...U.classes(U.ift(U.equals(routeModel, route), styles.active))}
                        key={idx}
                        children={name}
                        href={'#/' + route}
                        onClick={() => onFilter(value)} />
                ))}
            </span>

            <span className={styles.remaining}>{remaining} items left</span>

            {U.ift(U.not(U.equals(remaining, U.length(todos))),
                <a className={styles.clearCompleted} href="#" onClick={(e) => {
                    e.preventDefault()
                    onClearCompleted()
                }}>Clear completed</a>
            )}
        </div>
    )
}
