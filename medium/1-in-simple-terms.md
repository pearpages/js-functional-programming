# What is Functional Programming?

> f(X) = Y

Functional programming is also about being *declarative* and writing *abstracted* code.

Functional programming is about creating functions in an abstracted way, which can be reused by other parts of the code.

## Referential Transparency

```js
function identity(i) {
    return i
}
```

## Pure Functions

> Pure functions are the functions that return the same output for the given input.

> In mathematics, a function is a relation between a set of inputs and a set of permissible outputs with the property that each input is related to exactly one output. The input to a function is called the argument and the output is called the value. The set of all permitted inputs to a given function is called the **domain** of the function, while the set of permissible outputs is called the **codomain**.

## Cachable

Since the pure function is going to always return the same output for the given input,
we can cache the function outputs.

## Is JavaScript a Functional Programming Language?

JavaScript is not a pure functional language (like Haskell) but rather a Multi-paradigm language. However the language is very much suitable for the functional programming paradigm.

JavaScript treats functions as its first-class citizens.