# Functional Programming

- Pure Functions
- Composition
- Immutability
- Closure
- Recursion
- Map
- Filter
- Reduce

## How to run the code

```bash
babel-node <file>
```

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

## Clousre

> **Closure** is when a function *remembers* the variables around it even when that function is executed elsewhere.

```js
function sumX (x) {
    return function(y) {
        return x + y
    };
}

var add10 = sumX(10);

add10(3); // 13
add(14); // 24
```

```js
function foo (x, y) {
    return function () {
        return x + y;
    }
}

var x = foo(5,3);

x(); // 8
x(); // 8
```

## Recursion

* base case
* tco. tail calls optimization

> To be a proper *tail call* the last thing that has to occur is the call. e.g. ```return whatever(--x)```)

* arguments are what you pass in
* parameters what you receive in

```js
function sumRecur() {
    var args = [].slice.call(arguments);
    if (args.length <= 2) {
        return args[0] + args[1];
    }
    return (
        args[0] +
        sumRecur.apply(null,args.slice(1))
    );
}

console.log(sumRecur(1,2,3,4,5)); // 15
```

With ES6

```js
function sumRecur(...args) {
    if (args.length <= 2) {
        return args[0] + args[1];
    }
    return (
        args[0] +
        sumRecur(...args.slice(1))
    );
}

console.log(sumRecur(3,4,5)); // 12
```

```js
function mult() {
    var args = [].slice.call(arguments);
    if (args.length == 2) {
        return args[0] * args[1];
    } else {
        return args[0] * mult.apply(null,args.slice(1));
    }
}

console.log(mult(3,4,2));
```

## List transformation (MAP)

```js
function doubleIt(v) { return v * 2; }

function transform(arr, fn) {
    // the immutable way here is to create a new array
    var list = [];
    for (var i=0; i < arr.length; i++) {
        list[i] = fn(arr[i]);
    }
    return list;
}

transform([1,2,3,4,5],doubleIt);

// with js method

[1,2,3,4,5].map(doubleIt);

// which is not very functional way because doesn't let you do the composition in an orthodox way
```

## Exclusion (Filter)

```js
function isOdd(v) { return v % 2 == 1; }

[1,2,3,4,5].filter(isOdd);
```

## List Composition (Reduce)

```js
function mult(x,y) {return x * y; }

function compose(arr,fn,intitial) {
    var total = initial;
    for(var i=0; i < arr.length; i++) {
        total = fun(total,arr[i]);
    }
    return total;
}

compose([1,2,3,4,5],mult,1);
```

```js
function mult() {
    var args = [].slice.call(arguments);
    var acc = 1;
    return args.reduce(function (acc,current) {
        return acc * current;
    });
}

console.log(mult(1,3,5));
```

## Iterate (forEach)

```js
[1,2,3,5].foreach(function (v) { console.log(v)});
```