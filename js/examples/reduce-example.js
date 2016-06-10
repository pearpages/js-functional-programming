// get the sum of all the values
var values = [1,34,12,45];
var sum = values.reduce(function (previous,current) {return previous + current},0);
console.log('sum: '+sum);

// get the maximum value
var values = [1,34,12,45];
var max = values.reduce(function (previous,current) {return Math.max(previous,current)});
console.log('max: '+max);