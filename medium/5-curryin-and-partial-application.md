# Currying and Partial Application

## Basic Concepts

### Unary Function

A function is called unary if it takes a single function argument.

```js
function identity (x) {
    return x;
}
```

### Binary Function

A function is called binary if it takes two arguments.

```js
function add(x,y) {
    return x + y;
}
```

### variadic Functions

#### ES5

```js
function variadic(a) {
    console.log(a);
    console.log(arguments);
}

variadic(1,2,3);
// a => 1
// arguments => [1,2,3]
```

#### ES6

```js
function (a,...variadic) {
    console.log(a);
    console.log(variadic);
}

variadic(1,2,3);
// 1
// [2,3]
```

---

## Currying

> Currying is a process of converting a function with n number of arguments into a nested unary function.

```js
function curry(fn) {
    if(typeof fn!== 'function') {
        throw Error('No function provided');
    }

    return function curriedFn(...args) {
        if(args.length < fn.length) {
            return function () {
                return curriedFn.apply(null, args.concat([].slice.call(arguments)));
            }
        }
        return fn.apply(null, args);
    }
}
```

---

## Partial Application

```js
function partial(fn, ...partialArgs) {
    let args = partialArgs;
    return function (...fullArguments) {
        let arg = 0;
        for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
            if (args[i] === undefined) {
                args[i] = fullArguments[arg++];
            }
        }
        return fn.apply(null, args);
    };
}
```