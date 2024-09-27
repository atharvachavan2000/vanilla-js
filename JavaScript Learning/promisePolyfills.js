// Pre-requisite data
// const p1 = new Promise((resolve, reject) => {
//   if (Math.random() < 0.5) {
//     resolve("Promise 1 Succesful");
//   } else {
//     reject("Promise 1 Rejected");
//   }
// });

// const p2 = new Promise((resolve, reject) => {
//   if (Math.random() < 0.5) {
//     resolve("Promise 2 Succesful");
//   } else {
//     reject("Promise 2 Rejected");
//   }
// });

// const p3 = new Promise((resolve, reject) => {
//   if (Math.random() < 0.5) {
//     resolve("Promise 3 Succesful");
//   } else {
//     reject("Promise 3 Rejected");
//   }
// });

const myP1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      resolve("MyPromise 1 Successful");
    } else {
      reject("MyPromise 1 Rejected");
    }
  }, 2000);
});

const myP2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      resolve("MyPromise 2 Successful");
    } else {
      reject("MyPromise 2 Rejected");
    }
  }, 1989);
});

const myP3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      resolve("MyPromise 3 Successful");
    } else {
      reject("MyPromise 3 Rejected");
    }
  }, 1992);
});

// Promise Polyfill
function MyPromise(executer) {
  let state = "pending";
  let result, onResolve, onReject;

  function resolve(value) {
    if (state !== "pending") return;
    result = value;
    state = "fulfilled";

    if (typeof onResolve === "function") {
      onResolve(value);
    }
  }

  function reject(value) {
    if (state !== "pending") return;
    result = value;
    state = "rejected";

    if (typeof onReject === "function") {
      onReject(value);
    }
  }

  this.then = function (callback) {
    onResolve = callback;
    if (state === "fulfilled") {
      onResolve(result);
    }
    return this;
  };

  this.catch = function (callback) {
    onReject = callback;
    if (state === "rejected") {
      onReject(result);
    }
    return this;
  };

  try {
    executer(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

// Promise.resolve Polyfill
MyPromise.resolve = (val) => {
  return new MyPromise(function executer(resolve, _reject) {
    resolve(val);
  });
};

// Promise.reject Polyfill
MyPromise.reject = (val) => {
  return new MyPromise(function executer(_resolve, reject) {
    reject(val);
  });
};

// Promise.all Polyfill - Return when all 'resolved'
MyPromise.myAll = (promises) => {
  return new MyPromise((resolve, reject) => {
    const results = [];

    if (!promises.length) {
      return resolve(results);
    }

    let pending = promises.length;

    promises.forEach((promise, idx) => {
      promise
        .then((res) => {
          results[idx] = res;
          pending--;

          if (pending === 0) {
            return resolve(results);
          }
        })
        .catch((err) => {
          return reject(err);
        });
    });
  });
};

// Promise.allSettled Polyfill - Return when all 'settled'
MyPromise.myAllSettled = (promises) => {
  return new MyPromise((resolve, reject) => {
    const results = [];

    if (!promises.length) {
      return resolve(results);
    }

    let pending = promises.length;

    promises.forEach((promise, idx) => {
      promise
        .then((res) => {
          results[idx] = {
            status: "fulfilled",
            result: res,
          };
          pending--;

          if (pending === 0) {
            return resolve(results);
          }
        })
        .catch((err) => {
          results[idx] = {
            status: "rejected",
            result: err,
          };
          pending--;

          if (pending === 0) {
            return resolve(results);
          }
        });
    });
  });
};

// Promise.myRace Polyfill - Return first 'settled' promise - resolve | reject
MyPromise.myRace = (promises) => {
  return new Promise((resolve, _reject) => {
    promises.forEach((promise) => {
      promise.then(resolve).catch(reject);
    });
  });
};

// Promise.any Polyfill - Return first 'fulfilled' promise || aggregate 'errors'
MyPromise.myAny = (promises) => {
  const results = [];
  return new MyPromise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve).catch((err) => {
        results.push(err);
        if (results.length === promises.length) {
          reject(results);
        }
      });
    });
  });
};

// Tester
MyPromise.myAny([myP1, myP2, myP3])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
