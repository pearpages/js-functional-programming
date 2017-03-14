# High-order Functions (HOC)

>  Generally speaking, higher-order functions are written usually to abstract the common problems. In other words, higher-order functions are nothing but defining Abstractions.

> In mathematics and computer science, a higher-order function (also functional, functional form or functor) is a function that does at least one of the following: takes one or more functions as arguments (i.e., procedural parameters), returns a function as its result.

## Passing a Function

```js
var tellType = (arg) => (typeof  arg === function);
```