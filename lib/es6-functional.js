const forEach = (array, fn) => {
    let i;
    for (i = 0; i < array.length; i++) {
        fn(array[i]);
    }
};

const forEachObject = (obj, fn) => {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            //calls the fn with key and value as its argument
            fn(property, obj[property])
        }
    }
};

const unless = (predicate,fn) => {
    if(!predicate) {
        fn();
    }
};

const times = (times, fn) => {
    for (var i = 0; i<times; i++) {
        fn(i);
    }
}

export {forEach,forEachObject,unless,times};