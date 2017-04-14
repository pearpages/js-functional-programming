const Container = function (val) {
    this.value = val;
}

Container.of = function (value) {
    return new Container(value);
}

Container.prototype.map = function (fn) {
    return Container.of(fn(this.value));
}

console.log(Container.of(3));


let double = (x) => x * 2;

console.log(Container.of(3).map(double).map(double).map(double));