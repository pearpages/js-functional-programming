# Functional Programming

- Pure Functions
- Composition
- Immutability
- Closure
- Recursion
- Map
- Filter
- Reduce

## Pure Functions

> We do not create side effects.

One way of achieving it is wrapping the functionality which has state with another function, using scope.

```js
function bar(x, y) {

    var z;

    foo(x);
    return [y,z];

    function foo(x) {
        y++;
        z = x * y;
    }
}

console.log(bar(20,5)); // [6,120]
console.log(bar(25,6)); // [7,175]
```

## Composition

```js
function sum(x,y) {
    return x + y;
}

function mult(x,y) {
    return x * y;
}

console.log(sum (5 , mult (3,4)));  // 17
```

```js
function compose(fn1,fn2) {
    return function comp() {
        var args = [].slice.call(arguments);
        return fn2( fn1 (args.shift(), args.shift()), args.shift() );
    }
}

var multAndSum = compose(mult,sum);
multAndSum(3,4,5);
```

## Immutability

```js
const w = Object.freeze([4,5,6]);
```