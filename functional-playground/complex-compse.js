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