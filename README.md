# React with FRP

The code in this example project shows how to write React code in the following way:

- Your codebase will only consist of stateless function components, no need for component state or lifecycle methods
- Your components will only render once, no need for shouldComponentUpdate etc. rendering optimizations. The only thing which will ever re-render are the leaf DOM nodes
- This is made possible by never calling setState directly and passing observables to your components. Observables are like boxed values which hold values inside them. Observables do not change, only the values within them. [Karet](https://github.com/calmm-js/karet) subscribes into said observables and embeds them into Virtual DOM. Once the value changes, the subscribed node will re-render. This allows a minimal amount of diffing and re-rendering to happen, which is usually the biggest performance bottleneck in React applications.
- As added plus, with FRP even complex asynchronous flows become much more trivial to implement.