import { Observable } from 'rxjs';

// Initiate Observable
const observable$ = new Observable<string>(subscriber => {
    console.log('Observable executed');
    subscriber.next('Alice');
    
    // Use setTimeout to similate network traffic and to see unsubscribe in action
    setTimeout(() => {
        subscriber.next('Ben');
    }, 2000);

    setTimeout(() => {
        subscriber.next('Charlie');
    }, 4000);
});

// Create an observer to handle the callbacks from the Observable
const observer = {
    next: value => console.log("Subscription 1: ", value)
};

// Subscribe to it
// Subscription 1
console.log("Starting Subscription 1");
const subscription1 = observable$.subscribe(observer);

// Subscription 2. Do in timeout just to observe the sequence happening in console
setTimeout(() => {
    console.log("Starting Subscription 2");
    observable$.subscribe(value => console.log("Subscription 2", value));
}, 1000);

// Unsubscribe after a few seconds. Charlie should not show in console
setTimeout(() => {
    console.log("Unsubscribing");
    subscription1.unsubscribe();
}, 3000);