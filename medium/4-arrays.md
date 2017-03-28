# Arrays

## Projection

>  Applying a function to a value and creating a new value is called a projection.

## Array Functions

+ map
+ filter
+ concatAll or flatten
+ reduce

## zip Function

The task of the zip function is to merge two given arrays. As with our example, we need to merge both apressBooks and reviewDetails into a single array, so that we have all necessary data under a single tree.

```js
const zip = (leftArr,rightArr,fn) => {
        let index, results = [];

    for(index = 0;index < Math.min(leftArr.length, rightArr.length);index++)
        results.push(fn(leftArr[index],rightArr[index]));
    return results;
}
```