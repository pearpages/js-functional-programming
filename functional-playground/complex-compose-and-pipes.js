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

// ComposeN

let splitIntoSpaces = (str) => str.split(" ");
let count = (array) => array.length;
let oddOrEven = (ip) => ip % 2 == 0 ? "even" : "odd";
const oddOrEvenCountWords = mylib.composeN(oddOrEven,count,splitIntoSpaces);

let phrase = "hello your reading about composition";
console.log(oddOrEvenCountWords(phrase));

// Using Pipe
const oddOrEvenWords = mylib.pipe(splitIntoSpaces,count,oddOrEven);
console.log(oddOrEvenWords(phrase));
