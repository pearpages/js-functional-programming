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
- every
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

Reverses an array, but **it mutates** the original one. It is a *non-pure function**.

```javascript
var invert = function(arr) {
    return arr.map(function(x, i, a) {
        return a[a.length - (i+1)];
    });
};
var q = invert([1,2,3,4]);
console.log( q );
```

### Array.prototype.sort

Also **non-pure** function, for sorting.

### Array.prototype.every and Array.prototype.some

These functions are both **pure** and **high-order**.

*every()* return *true* if the *callback* function returns *true* for every element in the array, and the *some()* function returns *true* if some elements in the array are *true*.

## Functional librares for Javascript

How to use any library that enhances JavaScript's functional programming method.

Each library promotes its own style of functional programming. From a rigid, mathbased style to a relaxed, informal style, each library is different but they all share one common feature: they all have abstract JavaScript functional capabilities to increase code re-use, readability, and robustness.

### Libraries

- underscore.js
- Fantasy Land
- Bilby.js
- Lazy.js
- Bacon.js
- Functional
- wu.js
- sloth.js
- stream.js
- Lo-Dash.js
- Sugar
- from.js
- JSLINQ
- Boiler.js
- Folktale
- jQuery

#### Underscore.js

Underscore is actually the reimplementation of Ruby's *Enumerable* module, which explains why CoffeScript was also influenced by Ruby.

- map
- find
- invoke 
- pluck
- sortBy
- groupBy

And it proves a way of chaining methods together.

### Fantsasy Land

Fantasy Land is a collection of functional base libraries and a formal specification for how to implement "algebraic structures" in JavaScript. More specifically, Fantasy Land specifies the interoperability of common algebraic structures, or algebras for short: monads, monoids, setoids, functors, chains, and more. Their names may sound scary, but they're just a set of values, a set of operators, and some laws it must obey. In other words, they're just objects.

- monads
- monoids
- setoids
- functors
- chains
- ...

#### Bilby.js

**bibly.js** library is compliant with Fantasy Land specifications.

it provides:

- Immutable multi-methods for ad-hoc polymorphism
- Functional data structures
- Operator overloading for functional syntax
- Automated specification testing (ScalaCheck, QuickCheck)

#### Lazy.js

Lazy is a utility library more along the lines of the underscore.js library but with a lazy evaluation strategy. Because of this, Lazy makes the impossible possible by functionally computing results of series that won't be available with immediate interpretation. It also boasts a significant performance boost.

#### Bacon.js

Bacon.js is itself a library for functional reactive programming. Functional reactive programming just means that functional design patterns are used to represent values that are reactive and always changing, like the position of the mouse on the screen, or the price of a company's stock.

---

## Implementing Functional Programming Techniques in Javascript

### Partial function application and currying

Many languages support optional arguments, but not in Javascript. Javascript uses a diferent pattern entirely that allows for any number of arguments to be passed to a function. Function can be applied in a part or in whole.

#### Partial Application

It is the process of binding values to one or more arguments of a function that returns another function that accepts the remaining, unbound arguments.

#### Currying

It is the process of transforming a function with many arguments into a function with one argument that returns another function that takes more arguments as needed.

## Apply, call, and the this keyword

In pure functional languages, functions are not invoked; they're applied.

### this

Javascript works the same way and even provides utilities for manually calling and applying functions. And it's all about the *this* keyword, which, of course, is the object that the function is member of.

### call()

The *call()* function lets you define the *this* keyword as the first argument.

```javascript
// normal way
['Hello', 'world'].join(' ');

// using call
Array.prototype.join.call(['Hello', 'world'], ' '));
```

```javascript
(function() {this.length}).call([1,2,3]);
```

### apply()

The fundament difference is that, while the *call()* function accepts a list of arguments, the *apply()* function accepts an array of arguments.

### bind()

The *bind()* function allows you to apply a method to one object with the *this* keyword assigned to another. Internally, it's the same as the call() function, but it's chained to the method and returns a new bounded function.

```javascript
function Drum() {
    this.noise = 'boom';
    this.duration = 1000;
    this.goBoom = function() {console.log(this.noise};
}

var drum = new Drum();
setInterval(drum.goBoom.bind(drum), drum.duration);
```

## Function Factories

Closures are the constructs that makes it possible to create a useful Javascript programming pattern known as function factories. They allow us to *manually bind* arguments to functions.

```javascript
function bindFirstArg(func, a) {
    return function (b) {
        return func(a,b);
    }
}

var powersOfTwo = bindFirstArg(Math.pow, 2);
console.log(powersOfTwo(3)); // 8
console.log(powersOfTwo(5)); // 32
```

## Partial Application

> Partial application ins the process of binding values to one or more arguments of a function that returns a partially-applied function that accepts the remaining, unbound arguments.

There are two distinc ways to do this:

- As a stand-alone function
- As a polyfill

Polyfills are used to augment prototypes with new functions and will allow us to call our new functions as methods of the function that we want to partially apply.

### Partial application from the left

```javascript
Function.prototype.partialApply = function () {
    var func = this;
    args = Array.prototype.slice.call(arguments);
    return function () {
        return func.apply(this, args.concat(
            Array.prototype.slice.call(arguments)
        ));
    };
};
```

```javascript
function nums2hex() {
    function componentToHex(component) {
        var hex = component.toString(16);
        // make sure the return value is 2 digits, i.e. 0c or 12
        if (hex.length == 1) {
            return "0" + hex;
        }
        else {
            return hex;
        }
    }
    return Array.prototype.map.call(arguments,
        componentToHex).join('');
}
// the function works on any number of inputs
console.log(nums2hex()); // ''
console.log(nums2hex(100, 200)); // '64c8'
console.log(nums2hex(100, 200, 255, 0, 123)); // '64c8ff007b'

// but we can use the partial function to partially apply
// arguments, such as the OUI of a mac address
var myOUI = 123;
var getMacAddress = nums2hex.partialApply(myOUI);
console.log(getMacAddress()); // '7b'
console.log(getMacAddress(100, 200, 2, 123, 66, 0, 1));
// '7b64c8027b420001'

// or we can convert rgb values of red only to hexadecimal
var shadesOfRed = nums2hex.partialApply(255);
console.log(shadesOfRed(123, 0)); // 'ff7b00'
console.log(shadesOfRed(100, 200)); // 'ff64c8'
```

This example shows that we can partially apply arguments to a generic function and get a new function in return. This first example is left-to-right, which means that we can only partially apply the first, left-most arguments.

## Partial appliation from the Right

The biggest flaw in this method is that the way in which the arguments are passed, as in how many and in what order, can be ambiguous.

```javascript
Function.prototype.partialApplyRight = function () {
    var func = this;
    args = Array.prototype.slice.call(arguments);
    return function () {
        return func.apply(
            this,
            [].slice.call(arguments, 0)
                .concat(args));
    };
};

var shadesOfBlue = nums2hex.partialApplyRight(255);
console.log(shadesOfBlue(123, 0)); // '7b00ff'
console.log(shadesOfBlue(100, 200)); // '64c8ff'

var someShadesOfGreen = nums2hex.partialApplyRight(255, 0);
console.log(shadesOfGreen(123)); // '7bff00'
console.log(shadesOfGreen(100)); // '64ff00'
```

## Currying

> Currying is the process of transforming a function with many arguments into a function with one argument that returns another function that takes more arguments as needed.

Formally, a function with N arguments can be transformed into a function chain of N functions, each with only one argument.

### What is the difference between partial application and currying?

It is that is that currying allows for much better control of how arguments are passed to the function.

currying does not work well with functions that accept variable numbers of arguments. For something like that, partial application is preferred.

```javascript
Function.prototype.curry = function (numArgs) {
    var func = this;
    numArgs = numArgs || func.length;
    // recursively acquire the arguments
    function subCurry(prev) {
        return function (arg) {
            var args = prev.concat(arg);
            if (args.length < numArgs) {
                // recursive case: we still need more args
                return subCurry(args);
            }
            else {
                // base case: apply the function
                return func.apply(this, args);
            }
        };
    }
    return subCurry([]);
};
```

```javascript

function rgb2hex(r, g, b) {
    // nums2hex is previously defined in this chapter
    return '#' + nums2hex(r) + nums2hex(g) + nums2hex(b);
}
var hexColors = rgb2hex.curry();
console.log(hexColors(11)) // returns a curried function
console.log(hexColors(11, 12, 123)) // returns a curried function
console.log(hexColors(11)(12)(123)) // returns #0b0c7b
console.log(hexColors(210)(12)(0)) // returns #d20c00

var reds = function(g,b){return hexColors(255)(g)(b)};
var greens = function(r,b){return hexColors(r)(255)(b)};
var blues = function(r,g){return hexColors(r)(g)(255)};
console.log(reds(11, 12)) // returns #ff0b0c
console.log(greens(11, 12)) // returns #0bff0c
console.log(blues(11, 12)) // returns #0b0cff

var hexs = nums2hex.curry(2);
console.log(hexs(11)(12)); // returns 0b0c
console.log(hexs(11)); // returns function
console.log(hexs(110)(12)(0)); // incorrect
```

## Function Composition

In functional programming, we want everything to be a function. We especially want unary functions if possible.

### Unary

> **Unary** functions are functions that take only a single input. Functions with multiple inputs are **polyadic**, but we usually say *binary* for functions that accept two inputs and **ternary** for three inputs. Some functions don't accept a specific nubmer of inputs; we call those **variadic**.

### Compose

Composing functions allow us to build complex functions from many simple, generic functions.

Compositions are read from right to left. Sequences from left to right.

```javascript
var compose = function (f,g) {
    return function (x) {
        return f(g(x));
    }
}
```

But if we left it at that, we would lose track of the this keyword, among other problems.

```javascript
Function.prototype.compose = function(prevFunc) {
    var nextFunc = this;
    return function() {
        return nextFunc.call(this,prevFunc.apply(this,arguments));
    }
}

function function1(a){return a + ' 1';}
function function2(b){return b + ' 2';}
function function3(c){return c + ' 3';}
var composition = function3.compose(function2).compose(function1);
console.log( composition('count') ); // returns 'count 1 2 3'
```

Did you notice that the function3 parameter was applied first? This is very important. Functions are applied from right to left.

### Sequence - compose in reverse

Because many people like to read things from left to the right, it might make sense to apply the functions in that order too. We call it sequence.

```javascript
Function.prototype.sequence = function (prevFunc) {
    var nextFunc = this;
    return function() {
        return prevFunc.call(this,nextFunc.apply(this,arguments));
    }
}

var sequences = function1.sequence(function2).sequence(function3);
console.log(sequences('count')); // returns 'count 1 2 3';
```

## Composition vs chains

> The kind of conciseness that makes code easier to maintain is that which effectively reduces the specified instructions (for example, by using a simpler algorithm that accomplishes the same result with fewer and/or simpler steps), or when we simply replace code with a message, for instance, invoking a third-party library with a well-documented API.

Composition and sequences are preferible to chains.

### Programming with compose

The most important aspect of compose is that, aside from the first function that is applied, it works best with **pure**, **unary** functions: functions that take only one argument.

```javascript
// 65
```

## Mostly functional programming

> Keep most logic in pure functions and interface with imperative code.

```javascript
// 68
```

## Handling Events

```javascript
// 70
```

## Functional reactive programming

```javascript
// 71
```

## Reactivity

```javascript
// 72
```

---

