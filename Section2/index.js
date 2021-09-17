"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
// Initiate Observable
var observable$ = new rxjs_1.Observable(function (subscriber) {
    console.log('Observable executed');
    subscriber.next('Alice');
    subscriber.next('Ben');
    subscriber.next('Charlie');
});
// Create an observer to handle the callbacks from the Observable
var observer = {
    next: function (value) { return console.log(value); }
};
// Subscribe to it
observable$.subscribe(observer);
