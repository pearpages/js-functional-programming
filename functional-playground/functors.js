import * as mylib from '../lib/es6-functional';

console.log(mylib.Container.of(3));


let double = (x) => x * 2;

console.log(mylib.Container.of(3).map(double).map(double).map(double));

