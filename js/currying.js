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