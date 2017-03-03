function mult() {
    var args = [].slice.call(arguments);
    var acc = 1;
    return args.reduce(function (acc,current) {
        return acc * current;
    });
}

console.log(mult(1,3,5));