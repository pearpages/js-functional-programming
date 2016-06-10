function nums2hex() {
    function componentToHex(component) {
        var hex = component.toString(16);
        // make sure the return value is 2 digits, i.e. 0c or 12
        if (hex.length == 1) {
            return "0" + hex;
        }
        else {
            return hex;
        }
    }
    return Array.prototype.map.call(arguments,
        componentToHex).join('');
}
// the function works on any number of inputs
console.log(nums2hex()); // ''
console.log(nums2hex(100, 200)); // '64c8'
console.log(nums2hex(100, 200, 255, 0, 123)); // '64c8ff007b'

// but we can use the partial function to partially apply
// arguments, such as the OUI of a mac address
var myOUI = 123;
var getMacAddress = nums2hex.partialApply(myOUI);
console.log(getMacAddress()); // '7b'
console.log(getMacAddress(100, 200, 2, 123, 66, 0, 1));
// '7b64c8027b420001'

// or we can convert rgb values of red only to hexadecimal
var shadesOfRed = nums2hex.partialApply(255);
console.log(shadesOfRed(123, 0)); // 'ff7b00'
console.log(shadesOfRed(100, 200)); // 'ff64c8'

// This example shows that we can partially apply arguments to a generic function and get a new function in return. This first example is left-to-right, which means that we can only partially apply the first, left-most arguments.