function* gen() {
    return 'first generator';
}

let generatorResult = gen();

console.log(generatorResult.next());
// => { value: 'first generator', done: true }

console.log(generatorResult.next());
// => { value: undefined, done: true }

function* generatorSequence() {
    yield 'first';
    yield 'second';
    yield 'third';
}

let sequence = generatorSequence();

console.log(sequence.next().value); // 'first'
console.log(sequence.next().value); // 'second'
console.log(sequence.next().value); // 'third'
console.log(sequence.next().value); // undefined

// for loop for generators

for (let value of generatorSequence()) {
    console.log("for of value of generatorSequence is", value)
}

// passing data to generators

function* sayFullName() {
    var firstName = yield;
    var secondName = yield;
    console.log(firstName + ' ' + secondName);
}

let fullName = sayFullName();

fullName.next(); // pause for asking value
fullName.next('pere');
fullName.next('pages');

// using generators for Async Calls, first see it without

function getDataOne (cb) {
    setTimeout( () => cb('dummy data one'), 1000);
}

function getDataTwo (cb) {
    setTimeout( () => cb('dummy data two'), 1000);
}

getDataOne( (data) => console.log('data received',data));
getDataTwo ( (data) => console.log('data received',data));

// with generators

function* main() {
    let dataOne = yield getFDataOne();
    let dataTwo = yield getFDataTwo();
    console.log('data one', dataOne);
    console.log('data two', dataTwo);
}

var gene = main();
gene.next();

function getFDataOne () {
    setTimeout( () => gene.next('dummy data one'), 1000);
}

function getFDataTwo () {
    setTimeout( () => gene.next('dummy data two'), 1000);
}