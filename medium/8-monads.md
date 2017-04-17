# Monads

A monad is special type of functor and it helps us to solve the problem of having to use too many *map*s.

> Monad is a functor that has a *chain* method!

## join

```js
MayBe.prototype.join = function () {
    return this.isNothing() ? MayBe.of(null) : this.value;
}
```

## chain

```js
MayBe.prototype.chain = function (f) {
    return this.map(f).join();
}
```