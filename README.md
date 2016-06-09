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

