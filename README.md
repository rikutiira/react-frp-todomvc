# React with FRP

The code in this example project shows how to write React code in the following way:

- Your codebase will only consist of stateless function components, no need for component state or lifecycle methods
- Your components will only render once, no need for shouldComponentUpdate etc. rendering optimizations. The only thing which will ever re-render are the leaf DOM nodes
- This is made possible by never calling setState directly and passing observables to your components. Observables are like boxed values which hold values inside them. Observables do not change, only the values within them. [Karet](https://github.com/calmm-js/karet) subscribes into said observables and embeds them into Virtual DOM. Once the value changes, the subscribed node will re-render. This allows a minimal amount of diffing and re-rendering to happen, which is usually the biggest performance bottleneck in React applications.
- Your UI components can still remain agnostic to whether they are working with observables or plain JS types.
- As added plus, with FRP even complex asynchronous flows become much more trivial to implement.

## What is FRP?

FRP stands for functional reactive programming and in the context of frontend development, it generally indicates the use of Observables to build reactive UIs. Popular FRP libraries for JS include [RxJS](https://github.com/Reactive-Extensions/RxJS), [Kefir](https://rpominov.github.io/kefir/) and [Bacon](https://baconjs.github.io/).

If you want to learn more, you can read [a great introduction to FRP](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) by André Staltz or check out [an interactive FP/FRP tutorial](http://reactivex.io/learnrx/) made by Netflix.