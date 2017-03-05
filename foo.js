function boo(x) {
    return function () {
        return x;
    }
}

function foo() {
    return 42;
}

function bar() {
    return 10;
}

function add(x,y) {
    return x + y;
}

function add2(fn1,fn2) {
    return add(fn1(),fn2());
}

function addn() {
    var arr = [].slice.call(arguments);
    var acc = 0;
    return arr.reduce(function (acc,current) {
        return add2(boo(acc),boo(current));
    });
}

console.log(add2(foo,bar));
console.log(add2(boo(23),boo(45)));
console.log(addn(1,2,3,5 ));