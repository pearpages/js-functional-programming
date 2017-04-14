# Functors

> **Functor** is a plain object (or type class in other languages) that implements the function map that, while running over each value in the object to produce a new object.

## Container

```js
const Container = function val() {
    this.value = val;
}

Container.of = function(value) {
    return new Container(value);
}

Container.prototype.map = function (fn) {
    return Container.of(fn(this.value));
}
```

**Example**

```js
console.log(Container.of(3));

let double = (x) => x * 2;

console.log(Container.of(3).map(double).map(double).map(double));
```

## MayBe

MayBe is a type of Functor that deals with *null* or *undefined* values.

```js
function MayBe(val) {
    this.value = val;
}
MayBe.of = function (val) {
    return new MayBe(val);
}

MayBe.prototype.isNothing = function () {
    return (this.value === null || this.value === undefined );
};
MayBe.prototype.map = function (fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
}
```

## Either

