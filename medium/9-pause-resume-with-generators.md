# Pause, Resume with Generators

Before ES6 arrived, JavaScript developers used Promises to solve the above problem. Promises are great, but given the fact that ES6 has generators at language level, we don’t need Promises anymore!

```js
function* gen() {
    return 'first generator';
}
```

Generators are not normal functions, but an instance of *Generator* primitive type.

Generators are like sequences, once it's empty it will return undefined.

## Using Generators to Handle Async Calls

