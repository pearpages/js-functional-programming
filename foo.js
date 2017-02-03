function doubleIt(v) { return v * 2; }

function transform(arr, fn) {
    var list = [];
    for (var i=0; i < arr.length; i++) {
        list[i] = fn(arr[i]);
    }
    return list;
}

var x = transform([1,2,3,4,5],doubleIt);
console.log(x);