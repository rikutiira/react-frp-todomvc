import { className } from 'utils/component'

import styles from './todo.scss'

const c = className(styles)

/**
 * In our todomvc application, <TodoFooter> is being passed an observable of todos.
 * <TodoFooter> would work even if todos was a plain array instead.
 */
export default ({ todos, filters, activeFilter, onFilter, onClearCompleted }) => {
    const remaining = U.length(U.filter(({ completed }) => !completed, todos))
    const ifHasCompletedTodos = U.ift(U.not(U.equals(remaining, U.length(todos))))

    return (
        <div {...U.classes(styles.footer, 'cf')}>
            <span className={styles.filters}>
                {U.seq(filters, U.mapIndexed(({ value, name, id }, idx) =>
                    <a
                        {...c({ active: U.equals(activeFilter, id) })}
                        key={idx}
                        children={name}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault()
                            onFilter(id, value)
                        }} />
                ))}
            </span>

            <span className={styles.remaining}>{remaining} items left</span>

            {ifHasCompletedTodos(
                <a className={styles.clearCompleted} href="#" onClick={(e) => {
                    e.preventDefault()
                    onClearCompleted()
                }}>Clear completed</a>
            )}
        </div>
    )
}
