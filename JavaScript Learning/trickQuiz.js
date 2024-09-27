/* PROMISES */
// Microtasks are created by setTimeout(), Promise.then().
// Even though promise might be already resolved or setTimeout have 0 ms delay, micro tasks will be created

// Only the first resolve or reject will have effect inside a promise
// .then(console.log) === .then(res => console.log(res));
// .then() must contain function only, else nothing happens
// If nothing is returned from a promise, i.e. void, next block get's undefined

// .finally doesn't receive any arguements, nor does it return anything to next chained promises.
// next chained promises will take value from the last then / catch block

/* THIS Pointer - Arrow Function */
// This is a JavaScript Quiz from BFE.dev

const obj = {
  dev: "bfe",
  a: function () {
    // obj.a() => bfe
    return this.dev;
  },
  b() {
    // obj.b() => bfe
    return this.dev;
  },
  c: () => {
    return this.dev; // obj.c() => undefined
  },
  d: function () {
    // obj.d() => bfe  => Arrow function is created inside d, so it gets "this" of d
    // IIFE
    return (() => {
      return this.dev;
    })();
  },
  e: function () {
    // obj.e() => bfe
    return this.b();
  },
  f: function () {
    // obj.f()() => undefined => as reference of b is returned, this reference looses access to b
    return this.b;
  },
  g: function () {
    // obj.g() => undefined  => this.c is trapped within arrow
    return this.c();
  },
  h: function () {
    // obj.h()() => undefined => this.c is trapped within arrow
    return this.c;
  },
  i: function () {
    // obj.i()() => bfe => since arrow function is created inside i, it has function's this
    return () => {
      return this.dev;
    };
  },
};

/* Increment Operator */
let a = 1;
const b = ++a; // => 2 => a becomes 2
const c = a++; // => 2 => a becomes 3 after assigning
console.log(a);
console.log(b);
console.log(c);

/* Coercion  */
Boolean('') // => "" false, anything else => true
console.log("3" + 1) // '+' operator will convert all others to string
console.log('3' - 1) // '-', '*' => toNumber, operator will convert string to integer & trim white spaces
Number(null), Number(false) // 0
Number(undefined) // NaN

// JSON does not have undefined => converted to null
null == 0 // false
// but 
null >= 0 // true => Number(null) = 0
null <= 0 // true

// If one operand is Boolean => it's converted to 0/1 => other is also converted to Number and then compared
undefined // NaN => so can't be compared with anything
0 == false // true
'' == false // true
[] == false // true
undefined == false // false
null == false // false
'1' == true // true
1n == true // true
' 1  ' == true // true

Number([something]) => something // if parseInt, else NaN