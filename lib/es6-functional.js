export {forEach,pipe,composeN,filter,map,reduce,forEachObject,unless,times,every,some,sortBy,tap,unary,once,memoized,partial,curry,compose,Container,MayBe}

function compose (a,b) {
    return function (c) {
        return a(b(c));
    }
}

function curry(fn) {
    if(typeof fn!== 'function') {
        throw Error('No function provided');
    }

    return function curriedFn(...args) {
        if(args.length < fn.length) {
            return function () {
                return curriedFn.apply(null, args.concat([].slice.call(arguments)));
            }
        }
        return fn.apply(null, args);
    }
}

function partial(fn, ...partialArgs) {
    let args = partialArgs;
    return function (...fullArguments) {
        let arg = 0;
        for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
            if (args[i] === undefined) {
                args[i] = fullArguments[arg++];
            }
        }
        return fn.apply(null, args);
    };
}

function memoized (fn) {
    const lookupTable = {};

    return function (arg) {
        return lookupTable[arg] || (lookupTable[arg] = fn(arg));
    }
}

// this is an example of closure
function once (fn) {
    let done = false;
    return function () {
        return done ? undefined: ( (done = true), fn.apply(this,arguments));
    }
}

function unary (fn) {
    return fn.length === 1 ? fn : (arg) => fn(arg);
}

function tap(value) {
    return function (fn) {
        if (typeof(fn) === 'function' && fn(value)) {
         fn(value)
        }
    }
}

function sortBy (property) {
    return (a,b) => {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result;
    }
}

function some(arr,fn) {
    let result = false;
    for(const value of arr) {
       result = result || fn(value);
       if(result === true) {
           return result;
       }
    }
    return result;
}

function every (arr, fn) {
    let result = true;
    // ES6 iterator
    for(const value of arr) {
        result = result && fn(value);
        if( result === false) {
            return result;
        }
    }
    return result;
}

function forEach(array, fn) {
    let i;
    for (i = 0; i < array.length; i++) {
        fn(array[i]);
    }
}

function forEachObject (obj, fn) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            //calls the fn with key and value as its argument
            fn(property, obj[property])
        }
    }
}

function map (array,fn) {
    let results = [];
    for (const value of array) {
        results.push(fn(value));
    }
    return results;
}

function filter (array,fn) {
    let results = [];
    for (const value of array) {
        ( fn(value)) ? results.push(value): undefined;
    }
    return results;
}

function unless (predicate,fn) {
    if(!predicate) {
        fn();
    }
}

function reduce (array,fn,value) {
    let accumulator = value;
    for (const value of array) {
        accumulator = fn(accumulator,value);
    }
    return [accumulator];
}

function composeN (...fns) {
    return function (value) {
        return reduce(fns.reverse(),(acc,fn) => fn(acc), value);
    }
}

function pipe(...fns) {
    return function (value) {
        return reduce(fns, (acc,fn) => fn(acc), value);
    }
}

function times (times, fn) {
    for (var i = 0; i<times; i++) {
        fn(i);
    }
}

function Container(val) {
    this.value = val;
}

Container.of = function(value) {
    return new Container(value);
}

Container.prototype.map = function (fn) {
    return Container.of(fn(this.value));
}

function MayBe(val) {
    this.value = val;
}
MayBe.of = function (val) {
    return new MayBe(val);
}

MayBe.prototype.isNothing = function () {
    return (this.value === null || this.value === undefined );
};
MayBe.prototype.map = function (fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.value));
}

function Nothing (val) {
    this.value = fal;
}

Nothing.of = function(val) {
    return new Nothing(val);
}

Nothing.prototype.map = function(f) {
    return this;
}

// Some is just like Container
function Some(val) {
    this.value = val;
}

Some.of = function (val) {
    return new Some(val);
}

Some.prototype.map = function(fn) {
    return Some.of(fn(this.value));
}