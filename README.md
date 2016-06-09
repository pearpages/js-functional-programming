- Separate inputs from environment
- Separate mutations from calculation

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