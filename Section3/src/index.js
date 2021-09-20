"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var observable$ = new rxjs_1.Observable(function (subscriber) {
    console.log('Observable executed');
    subscriber.next("Alice");
    subscriber.next("Ben");
    var counter = 0;
    // setTimeout(() => {
    //   subscriber.next("Charlie");
    //   //subscriber.complete();
    // }, 2000);
    //subscriber.complete();
    //subscriber.unsubscribe();
    // setTimeout(() => {
    //   subscriber.error(new Error("Oops!"));
    // }, 4000);
    var invervalId = setInterval(function () {
        console.log("Emiited", counter);
        subscriber.next((counter++).toString());
    }, 2000);
    // Teardown logic
    return function () {
        console.log('Teardown');
    };
});
console.log('Before subscribe');
// 3 different versions doing the same thing
// 1
// const observer = {
//   next: (value: string) => console.log(value)
// }
//observable$.subscribe(observer);
// 2
// observable$.subscribe({
//   next: value => console.log(value)
// });
// 3
observable$.subscribe({
    next: function (value) { return console.log(value); },
    error: function (err) { return console.error("Error: ", err.message); },
    complete: function () { return console.log("complete"); }
});
console.log('After subscribe');
