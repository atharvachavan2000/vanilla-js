// Debounce => Call "delay" time after last activity.
const myDebounce = (callback, delay) => {
  let timer;

  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

// Throttle => Call once per "delay" time
const myThrottle = (callback, delay) => {
  let last = 0;

  return function (...args) {
    let now = new Date().getTime();
    if (now - last < delay) return;
    last = now;
    return callback(...args);
  };
};

// Map
Array.prototype.myMap = function (callback) {
  let i;
  let newArr = [];
  for (i = 0; i < this.length; i++) {
    newArr.push(callback(this[i], i, this));
  }
  return newArr;
};

// Filter
Array.prototype.myFilter = function (callback) {
  let i;
  let newArr = [];
  for (i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) newArr.push(this[i]);
  }
  return newArr;
};

// Reduce
Array.prototype.myReduce = function (callback, initialValue) {
  let acc = initialValue;
  for (i = 0; i < this.length; i++) {
    acc = acc === undefined ? this[i] : callback(acc, this[i], i, this);
  }
  return acc;
};

// Call
Function.prototype.myCall = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + " It's not callable");
  }
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

// Apply
Function.prototype.myApply = function (context = {}, args = []) {
  if (typeof this !== "function") {
    throw new Error(this + " It's not callable");
  }
  if (!Array.isArray(args)) {
    throw new TypeError("CreateListFromArrayLike call on non-object");
  }
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};

// Bind
Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + " It's not callable");
  }

  context.fn = this;
  return function (...newArgs) {
    return context.fn(...args, ...newArgs);
  };
};

// Once
function myOnce(callback) {
  if (typeof callback !== "function") {
    throw new Error('Invalid Arguement Type: expected "function"');
  }
  let invoked = false;
  let result;

  return function (...args) {
    if (invoked) return result;
    invoked = true;
    result = callback(...args);
    return result;
  };
}
