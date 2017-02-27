Function.prototype.partialApplyRight = function () {
    var func = this;
    args = Array.prototype.slice.call(arguments);
    return function () {
        return func.apply(
            this,
            [].slice.call(arguments, 0)
                .concat(args));
    };
};

var shadesOfBlue = nums2hex.partialApplyRight(255);
console.log(shadesOfBlue(123, 0)); // '7b00ff'
console.log(shadesOfBlue(100, 200)); // '64c8ff'

var someShadesOfGreen = nums2hex.partialApplyRight(255, 0);
console.log(shadesOfGreen(123)); // '7bff00'
console.log(shadesOfGreen(100)); // '64ff00'