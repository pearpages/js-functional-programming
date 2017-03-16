export {forEach,forEachObject,unless,times,every,some}

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
