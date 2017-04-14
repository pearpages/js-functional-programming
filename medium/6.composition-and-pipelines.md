`# Composition and Pipelines

## Functional Composition

An important point to note over here is that, the functions a() or b() aren’t executed/run until we call our final function.

```js
function compose (a,b) {
    return function (c) {
        return a(b(c));
    }
}
```

### Using *curry* and *partial* for variatic functions

We can use curry to do the same thing. It’s just a matter of choice.

```js
import * as mylib from '../lib/es6-functional';

let apressBooks = [
    {
        "id": 111,
        "title": "C# 6.0",
        "author": "ANDREW TROELSEN",
        "rating": [4.7],
        "reviews": [{ good: 4, excellent: 12 }]
    },
    {
        "id": 222,
        "title": "Efficient Learning Machines",
        "author": "Rahul Khanna",
        "rating": [4.5],
        "reviews": []
    },
    {
        "id": 333,
        "title": "Pro AngularJS",
        "author": "Adam Freeman",
        "rating": [4.0],
        "reviews": []
    },
    {
        "id": 444,
        "title": "Pro ASP.NET",
        "author": "Adam Freeman",
        "rating": [4.2],
        "reviews": [{ good: 14, excellent: 12 }]
    }
];

// filter functions
let filterOutStandingBooks = (book) => book.rating[0] === 5;
let filterGoodBooks = (book) => book.rating[0] > 4.5;
let filterBadBooks = (book) => book.rating[0] < 3.5;

// projection functions
let projectTitleAndAuthor = (book) => { return {title: book.title,author:book.author} };
let projectAuthor = (book) => { return {author:book.author}  };
let projectTitle = (book) => { return {title: book.title} };

// partials and compose
let queryGoodBooks = mylib.partial(mylib.filter,undefined,filterGoodBooks);
let mapTitleAndAuthor = mylib.partial(mylib.map,undefined,projectTitleAndAuthor);
let mapTitle = mylib.partial(mylib.map,undefined,projectTitle);

let titleAndAuthorForGoodBooks = mylib.compose(mapTitleAndAuthor,queryGoodBooks);
let titleForGoodBooks = mylib.compose(mapTitle,queryGoodBooks);

console.log(titleAndAuthorForGoodBooks(apressBooks));
console.log(titleForGoodBooks(apressBooks));
```

## Compose many function

```js
function composeN (...fns) {
    return function (value) {
        return mylib.reduce(fns.reverse(),(acc,fn) => fn(acc), value);
    }
}
```

## Pipelines / Sequence

pipe and compose do the same thing, but in different data flow!

```js
function pipe(...fns) {
    return function (value) {
        return reduce(fns, (acc,fn) => fn(acc), value);
    }
}
```

## Odds on Composition

### Composition is associative

The functional composition is always associative:

```js
compose(f, compose(g, h)) == compose(compose(f, g), h);
```

### Debugging Using tap Function

Having the following code:

```js
composeN(oddOrEvent,count,splitIntoSpaces)("Test string");
```

what if count function throws an error? How will you know what value does count function receive as its argument?

Then we can use an *identity* function with a console.log.

```js
function identity (x) {
    console.log(x);
    return x;
}
```

```js
composeN(oddOrEvent,count,identity,splitIntoSpaces)("Test string");
```