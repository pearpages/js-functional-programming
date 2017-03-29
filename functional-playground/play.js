import * as mylib from '../lib/es6-functional';

var array = [1, 2, 3];
mylib.forEach(array, (data) => console.log(data));

let object = { a: 1, b: 2 }
mylib.forEachObject(object, (k, v) => console.log(k + ":" + v));

mylib.forEach([1, 2, 3, 4, 5, 6, 7], (number) => {
    mylib.unless((number % 2), () => {
        console.log(number, " is even")
    })
});

mylib.times(100, function (n) {
    mylib.unless(n % 2, function () {
        console.log(n, "is even");
    });
});

console.log(mylib.every([NaN, NaN, NaN], isNaN));

console.log(mylib.some([NaN, NaN, 4], isNaN));

var people = [
    { firstname: "aaFirstName", lastname: "cclastName" },
    { firstname: "ccFirstName", lastname: "aalastName" },
    { firstname: "bbFirstName", lastname: "bblastName" }
];

console.log(people.sort(mylib.sortBy("firstname")));

mylib.forEach([1, 2, 3], function (e) {
    mylib.tap(e)(() => console.log(e));
});

// using unary we ignore the rest of the parameters, we only take the first one
console.log(['1', '2', '3'].map(mylib.unary(parseInt)));

let func = mylib.once(() => console.log('hello world!'));
func(); // 'hello world!'
func(); // undefined

let factorial = function (n) {
    if (n === 0) {
        return 1;
    }

    return n * factorial(n - 1);
};

console.log(factorial(3));
console.log(factorial(20));

let fastFactorial = mylib.memoized(factorial);
console.log(fastFactorial(5));
console.log(fastFactorial(20));

let sum = (x,y,z) => x + y + z;
let newSum = mylib.curry(sum);
console.log(newSum(1)(2)(3));

let delayTenMs = mylib.partial(setTimeout,undefined,10);
delayTenMs(() => console.log("Hello World"));

let parseRound = mylib.compose(Math.round, parseFloat);
console.log(parseRound("3.56"));