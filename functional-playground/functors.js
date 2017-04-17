import * as mylib from '../lib/es6-functional';

console.log(mylib.Container.of(3));


let double = (x) => x * 2;

console.log(mylib.Container.of(3).map(double).map(double).map(double));

console.log(mylib.MayBe.of("George").map( () => undefined).map( (x) => 'Mr. '+x));

// join example

let joinExample = mylib.MayBe.of(mylib.MayBe.of(5));
console.log(joinExample.join());