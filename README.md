# Functional Programming

Some languages that support Functional Programming and Object Programming at the same time:

- Python
- Ruby
- Julia
- Javascript

However in the case of Javascript, the functional features are somewhat hidden.

Essentially the language must implement *Lambda calculus*.

## Advantages

Functional programs are cleaner, simpler, and smaller. This simplifies debugging, testing, and maintenance.

- Cleaner Code
- Modularity
- Reusability
- Reduced Coupling
- Mathematically Correct

### Some keys 

- Separate inputs from environment
- Separate mutations from calculation

## About Javascript being Functional

It is true that Javascript is not a pure functional language. What's lacking is lazy evaluation and built-in immutable data. This is because mos interpreters are call-by-name and not call-by-need. Javascript also isn't very good with recursion due to the way it handles tail calls. However, all of these issues can be mitigated with a little bit of attention.

|Problem|Solution|
|:--|:--|
|Non-strict  evaluation|Lazy.js|
|Immutable data|Programming technique/discipline|
|Resursive tail elimination|Trampolining|

## Pure functions

Functions that don't change anything.

Gives always the same result for the same input. Doesn't have an inner state. Doesn't log anything or uses environmental functionalities and if it did, they would be pure functions as well.

Their purity makes them:

- testable
- portable
- memoizable
- parallelizable

## Higher Order Functions

> A high order function is a function that does at least one of the following: takes one or more functions as arguments (i.e., procedural parameters), returns a function as its result.

- map
- filter
- reject

```javascript
var triple = function(x) {
    return x * 3;
};

var waffle = triple;

waffle(30);
```

```javascript
var animals = [
    {name: 'Fluffykins', species: 'rabbit'},
    {name: 'Caro', species: 'dog'},
    {name: 'Hamilton', species: 'dog'},
    {name: 'Harold', species: 'fish'},
    {name: 'Ursula', species: 'cat'},
    {name: 'Jimmy', species: 'fish'}
];

var isDog = function(animal) {
    return animal.species === 'dog'
};
var dogs = animals.filter(isDog);
var otherAnimalsThanDogs = animals.reject(isDog);
```

## Map (Another high order function)

```javascript
// animals is the same array used before

var names = animals.map(functional(animal) {
    return animal.name + ' is a ' + animal.species;
});

// with arrow functions
var names = animals.map((animal) => animal.name + ' is a ' + animal.species);
```

## Reduce

```javascript
var orders = [
    {amount: 250},
    {amount: 400},
    {amount: 100},
    {amount: 325},
];

var totalAmount = orders.reduce(function(sum, order) {
    return sum + order.amount;
}, 0);
```

### A more complex example

```javascript
import fs from 'fs';

var output = fs.readFilesSync('data.txt','utf8')
    .trim()
    .split('\n')
    .map(line => line.split('\t')
    .reduce((customer,line) => {
        customers[line[0]] = customers[line[0]] || [];
        customers[line[0]].push({
            name: line[1],
            price: line[2],
            quantity: line[3]
        });
        return customer;
    }, {});
```

## Currying

### What Is Currying?

Briefly, currying is a way of constructing functions that allows partial application of a function’s arguments. What this means is that you can pass all of the arguments a function is expecting and get the result, or pass a subset of those arguments and get a function back that’s waiting for the rest of the arguments. It really is that simple.

```javascript
let dragon = (name, size, element) => 
    name + ' is a ' +
    size + ' dragon that breathes ' +
    element + '!';

console.log(dragon('fluffukins','tiny', 'lighting'));
```

```javascript
let dragon =
    name =>
        size =>
            element =>
                name + ' is a ' +
                size + ' dragon that breathes ' +
                element + '!';
                
console.log(dragon('fluffykins')('tyny')('lighting');
```

```javascript
import _ from 'lodash';

let dragon = (name, size, element) => 
    name + ' is a ' +
    size + ' dragon that breathes ' +
    element + '!';
    
dragon = _.curry(dragon);    

let fluffykinsDragon = dragon('fluffykins');
let tinyDragon = fuffykinsDragon('tiny');

console.log(tinyDragon('lighting'));
```

### Why is Currying useful?

```javascript
let dragons = [
   {name: 'fluffykins', element: 'lighting'}, 
   {name: 'noomi', element: 'lighting'}, 
   {name: 'karo', element: 'fire'}, 
   {name: 'doomer', element: 'timewarp'} 
];

let hasElement =
    (element, obj) => obj.element === element
    
let lightingDragons = 
    dragons.filter(x => hasElement('lighting', x))
    
console.log(lightingDragons);
```

```javascript
import _ from 'lodash'

let dragons = [
   {name: 'fluffykins', element: 'lighting'}, 
   {name: 'noomi', element: 'lighting'}, 
   {name: 'karo', element: 'fire'}, 
   {name: 'doomer', element: 'timewarp'} 
];

let hasElement = 
    _.curry((element.obj) => obj.element === element)

let lightingDragons =
    dragons.filter(hasElement('lighting'))
    
console.log(lightingDragons);
```

## Recursion

When a function it calls itself until it does.

```javascript
let countdown = (num) => {
    console.log(num);
    if (num > 0) {
       countdown(num - 1); 
    }
};
```

```javascript
let categories = [
    {id: 'animals', parent: null},
    {id: 'mammals', parent: 'animals'},
    {id: 'cats', parent: 'mammals'},
    {id: 'dogs', parent: 'mammals'},
    {id: 'chihuahua', parent: 'dogs'},
    {id: 'labrador', parent: 'dogs'},
    {id: 'persian', parent: 'cats'},
    {id: 'siamese', parent: 'cats'}
];

let makeTree = (categories,parent) => {
  let node = {};
  categories
    .filter(c => c.parent === parent)
    .forEach(c => node[c.id] = makeTree(categories,c.id));
  return node;
};

console.log(makeTree(categories,null));
```

## Self-invoking functions and closures

```javascript
var ValueAccumulator = function () {
    var values = [];
    var accumulate = function (obj) {
        if (obj)  {
            values.push(obj.value);
            return values;
        } else {
            return values;
        }
    }
    return accumulate;
};

var accumulator = ValueAccumulator();

accumulator(obj1);
accumulator(obj2);
console.log(accumulator());
```

## High-order functions

> They are functions that either take another function as the input or return a function as the output.

```javascript
var accumulator2 = ValueAccumulator();
var objects = [obj1, obj2, obj3];
objects.foreach(accumulator2); // it is calling the accumulator2 callback for each element
console.log(accumulator2());
```

## Pure Functions

Pure functions return a value computed using only the inputs passed to it. Outside variables and global states may not be used and there may be no side effects. In other words, it must not mutate the variables passed to it for input. Therefore, pure functions are only used for their returned value.

```javascript
var printSomewhere = function(str,height,width) {
    var elem = document.createElement('div');
    elem.textContent = str;
    elem.style.position = 'absolute';
    elem.style.top = height;
    elem.style.left = width;
    return elem;
}

document.body.appendChild(
    printSomewhere('hello world',
    (window.innerHeight/2)+10+'px',
    (window.innerWidth/2)+10+'px'
);
```

## Anonymous Functions

```javascript
function powersOf(x) {
    return function(y) {
        return Math.pow(x,y);
    }
}
```

## Method Chains

It's sometimes called the "Builder Pattern". 

```javascript
var arr = [1,2,3,4];
arr1 = arr.reverse();
arr2 = arr1.concat([5,6]);
arr3 = arr2.map(Math.sqrt); 

// they can be chained to
arr.reverse().concat([5,6]).map(Math.sqrt);
```

## Recursion 

```javascript
var getLeafs = function(node) {
    if (node.childNodes.length == 0){
        // base case
        return node.innerText;
    } else {
        // recursive case
        return node.childNodes.map(getLeafs);
    }
}
```

## Divide and Conquer

```javascript
function gcd(a,b) {
    if (b == 0) {
        // base case (conquer)
        return a;
    } else {
        // recursive case (divide)
        return gcd(b, a % b);
    }
}
```

## Lazy Evaluation

Lazy evaluation, also known as nonstrict evaluation, call-by-need and deffered execution, is an evaluation strategy that waits until the value is needed to compute the result of a function and is particularly useful for functional programming.

This strategy can result in a major increase in performance, especially when used with metohd chains an arrays, the favorite flow technique of the functional programmer.

```javascript
// wishful javascript pseudocode:
var infinateNums = range (1 to infinity);
var tenPrimes  = infinateNums.getPrimeNumbers().first(10);
```

> Javascript does not perform Lazy evaluation on its own.

## The functional programmer's toolkit

- map
- filter
- reduce

They take a function as input and return an output with zero side effects.

## Callbacks

A callback function is used for passing to other functions for them to use.

We cannot specify what arguments are passed to the callback functions. If we need different parameters we can wrap the callback function with an anonymous function.

### Array.prototype.map()

It simply applies the callback function on each item in the array.

```javascript
arr.map(myCallback);
arr.map(myCallback,this);

function myCallback(currentValue,index,myArray) {
    // ...
}
```

```javascript
var integers = [1, -0, 9, -8, 3];
// map returns a new array!
console.log(integers.map(Math.abs),integers);
```

### Array.prototype.filter()

The filter() function is used to take elements out of an array. The callback must return *true* (to include the item in the new array) or *false* (to drop it).

```javascript
arr.filter(myCallback);
arr.filter(myCallback,this);

function myCallback(currentValue,index) {
    // ...
}
```

```javascript
var myarray = [1,2,3,4];
console.log([-2,-1,0,1,2].filter(function(x){return x>0;}));
```

### Array.prototype.reduce()

Sometimes called *fold*, the *reduce()* function is used to accumulate all the values fo the array into one. The callback needs to return the logic to be performed to combine the objects.

Generic scenarios are:

|Case|Use|
|:--|:--|
|numbers|Usually added together to get a sum or multiplied together to get a product|
|strings|Usually the strings are appended together|

## Honorable mentions

- forEach
- concat
- reverse
- sort
- some

### Array.prototype.forEach

Essentially the **non-pure** version of map(). It itereates over an array and applies a *callback* function over each item.

### Array.prototype.concat

It lets us to join multiple arrays together. Leaves the old arrays untouched.

```javascript
console.log([1,2,3].concat(['a','b','c']);
```

```javascript
var arr1 = [1,2,3];
var arr2 = [4,5,6];
var arr3 = [7,8,9];
var x = arr1.concat(arr2, arr3);
var y = arr1.concat(arr2).concat(arr3));
var z = arr1.concat(arr2.concat(arr3)));
console.log(x);
console.log(y);
console.log(z);
```

### Array.prototype.reverse

```javascript

```

### Array.prototype.sort

### Array.prototype.some
