// Question 1 => CURRYING
/*
const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}
const curriedJoin = curry(join)
curriedJoin(1, 2, 3) // '1_2_3'
curriedJoin(1)(2, 3) // '1_2_3'
curriedJoin(1, 2)(3) // '1_2_3'
*/
function curry(fn) {
  // should return a function
  return function curried(...args) {
    // if args.length is equal to Function.prototype.args, just execute and return result.
    if(args.length === fn.length) {
        return fn(...args);    // if this context is to be preserve, fn.call(this, ...args);
    }
    // return a function which is executed with rest of the arguments
    return function(...missingArgs) {
        return curried(...args, ...missingArgs);
    }
  };
}

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

const curriedJoin = curry(join);
// Testing
// curriedJoin(1, 2, 3);
// curriedJoin(1)(2, 3);
// curriedJoin(1, 2)(3);

// Question 2 - POLYFILL - flat()
// Syntax: flat(depth = 1)

function flat(arr, depth = 1) {
    let newArr = [];
    
    for(let i=0; i<arr.length; i++) {
        if(!Array.isArray(arr[i]) || !depth) {
            newArr.push(arr[i]);
        } else {
            newArr = newArr.concat(flat(arr[i], depth - 1));
        }
    }
    return newArr;
}