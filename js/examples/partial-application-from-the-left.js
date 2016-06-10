Function.prototype.partialApply = function () {
    var func = this;
    args = Array.prototype.slice.call(arguments);
    return function () {
        return func.apply(this, args.concat(
            Array.prototype.slice.call(arguments)
        ));
    };
};