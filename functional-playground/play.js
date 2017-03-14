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