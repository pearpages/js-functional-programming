export {forEach,forEachObject,unless,times,every,some,sortBy,tap,unary}

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

function unless (predicate,fn) {
    if(!predicate) {
        fn();
    }
}

function times (times, fn) {
    for (var i = 0; i<times; i++) {
        fn(i);
    }
}
