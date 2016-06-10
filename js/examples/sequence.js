Function.prototype.sequence = function (prevFunc) {
    var nextFunc = this;
    return function() {
        return prevFunc.call(this,nextFunc.apply(this,arguments));
    }
}

var sequences = function1.sequence(function2).sequence(function3);
console.log(sequences('count')); // returns 'count 1 2 3';