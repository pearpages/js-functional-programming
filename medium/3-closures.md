# Closures

> Simply put closure is an inner function. So what is an inner function? Well, its a function within an another function.

```js
function outer() {
   function inner() {
   }
}
```

Technically the closure has access to three scopes:

1. Variables that are declared in its own declaration
2. Access to the global variables.
3. Access to the outer function's variable (interesting!)

> another important concept in closure -- closure remembering its context!