Function.prototype.curry = function (numArgs) {
    var func = this;
    numArgs = numArgs || func.length;
    // recursively acquire the arguments
    function subCurry(prev) {
        return function (arg) {
            var args = prev.concat(arg);
            if (args.length < numArgs) {
                // recursive case: we still need more args
                return subCurry(args);
            }
            else {
                // base case: apply the function
                return func.apply(this, args);
            }
        };
    }
    return subCurry([]);
};

function rgb2hex(r, g, b) {
    // nums2hex is previously defined in this chapter
    return '#' + nums2hex(r) + nums2hex(g) + nums2hex(b);
}
var hexColors = rgb2hex.curry();
console.log(hexColors(11)) // returns a curried function
console.log(hexColors(11, 12, 123)) // returns a curried function
console.log(hexColors(11)(12)(123)) // returns #0b0c7b
console.log(hexColors(210)(12)(0)) // returns #d20c00

var reds = function(g,b){return hexColors(255)(g)(b)};
var greens = function(r,b){return hexColors(r)(255)(b)};
var blues = function(r,g){return hexColors(r)(g)(255)};
console.log(reds(11, 12)) // returns #ff0b0c
console.log(greens(11, 12)) // returns #0bff0c
console.log(blues(11, 12)) // returns #0b0cff

var hexs = nums2hex.curry(2);
console.log(hexs(11)(12)); // returns 0b0c
console.log(hexs(11)); // returns function
console.log(hexs(110)(12)(0)); // incorrect