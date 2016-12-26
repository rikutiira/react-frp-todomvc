# React with FRP

The code in this example project shows how to write React code in the following way:

- Your codebase will only consist of stateless function components, no need for component state or lifecycle methods
- Your components will only render once, no need for shouldComponentUpdate etc. rendering optimizations. The only thing which will ever re-render are the leaf DOM nodes
- This is made possible by never calling setState directly and passing observables to your components. Observables are like boxed values which hold values inside them. Observables do not change, only the values within them. [Karet](https://github.com/calmm-js/karet) subscribes into said observables and embeds them into Virtual DOM. Once the value changes, the subscribed node will re-render. This allows a minimal amount of diffing and re-rendering to happen, which is usually the biggest performance bottleneck in React applications.
- Your UI components can still remain agnostic to whether they are working with observables or plain JS types.
- As added plus, with FRP even complex asynchronous flows become much more trivial to implement.

The code has been commented to explain some of the concepts behind how it works. Feel free to take a look!

## How it looks?

Below is a sample of the code in the project. You can find the whole source code under `src/` if you want to have a better look.

```js
const FILTERS = [
    { value: undefined, id: '', name: 'All' },
    { value: false, id: 'active', name: 'Active' },
    { value: true, id: 'completed', name: 'Completed' }
]

/**
 * Components will never re-render. setState is never used anywhere and render() works as mounting function.
 *
 * DOM elements (<input>, <div>, etc.) will transparently attach listeners to their observable props and
 * will re-render whenever they emit new values. The elements will also unsubscribe once they unmount.
 */
export default () => {
    // action(value) will push value into action$, supports middleware functions before pushing into action$
    const [ todoValue, todoValue$ ] = createActionProperty(() => '')

    // create derived stream before return to keep JSX clean
    const visibleTodoIds$ = Kefir
        .combine([
            todos$,
            route$.map((route) => R.find(R.propEq('id', route), FILTERS).value)
        ])
        .map(([todos, filter]) => todos.filter(({ completed }) => R.isNil(filter) || completed === filter))
        .map(R.map(R.prop('id')))
        .toProperty()

    return (
        <div>
            <h1>todos</h1>
            <div className={styles.list}>
                { /* input re-renders when todoValue$ emits a value */ }
                <input
                    className={styles.add}
                    type="text"
                    placeholder="What needs to be done?"
                    value={todoValue$}
                    onChange={(e) => todoValue(e.target.value)}
                    onKeyDown={({ keyCode, target }) => {
                        if (keyCode === 13) {
                            actions.addTodo(target.value)
                            todoValue('')
                        }
                    }}/>
                <div>
                    { /* karet.utils (U) works with observables or plain js types */ }
                    {U.seq(visibleTodoIds$, U.mapCached((id) => {
                        return (
                            <TodoItem
                                key={id}
                                id={id}
                                item={U.find(R.whereEq({ id }), todos$)}
                                onRename={actions.renameTodo}
                                onComplete={actions.toggleComplete}
                                onDelete={actions.deleteTodo} />
                        )
                    }))}
                </div>
                { /* <TodoFooter>, like <TodoItem>, does not care whether todos is observable or not */ }
                <TodoFooter
                    todos={todos$}
                    filters={FILTERS}
                    activeFilter={route$}
                    onFilter={transition}
                    onClearCompleted={actions.clearCompleted} />
            </div>
        </div>
    )
}
```

## What is FRP?

FRP stands for functional reactive programming and in the context of frontend development, it generally indicates the use of Observables to build reactive UIs. Popular FRP libraries for JS include [RxJS](https://github.com/Reactive-Extensions/RxJS), [Kefir](https://rpominov.github.io/kefir/) and [Bacon](https://baconjs.github.io/).

If you want to learn more, you can read [a great introduction to FRP](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) by André Staltz or check out [an interactive FP/FRP tutorial](http://reactivex.io/learnrx/) made by Netflix.