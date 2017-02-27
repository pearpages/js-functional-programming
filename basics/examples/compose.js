var compose = function (f,g) {
    return function (x) {
        return f(g(x));
    }
}

// But if we left it at that, we would lose track of the this keyword, among other problems.

Function.prototype.compose = function(prevFunc) {
    var nextFunc = this;
    return function() {
        return nextFunc.call(this,prevFunc.apply(this,arguments));
    }
}

function function1(a){return a + ' 1';}
function function2(b){return b + ' 2';}
function function3(c){return c + ' 3';}
var composition = function3.compose(function2).compose(function1);
console.log( composition('count') ); // returns 'count 1 2 3'

// Did you notice that the function3 parameter was applied first? This is very important. Functions are applied from right to left.