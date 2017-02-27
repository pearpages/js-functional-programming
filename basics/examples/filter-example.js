var words = 'hello 123 world how 346 ya doing'.split(' ');

var re = '[a-zA-Z]';

console.log(words.filter(function(s) {
    // remove all words that are only numbers
    return s.match(re);
}));