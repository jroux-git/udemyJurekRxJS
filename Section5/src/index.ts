import { Observable, of, from, fromEvent, Subscriber, timer, forkJoin, combineLatest } from "rxjs"; 
import { ajax } from 'rxjs/ajax';

/**
 * Of function
 * takes in values an emit them to subscribers and then complete
 */
// of('Alice', 'Ben', 'Charlie').subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('Complete!')
// })

/**
 * Mimick 'of' function to understand how it works
 */
// const names$ = new Observable<string>(subscriber => {
//     subscriber.next('Alice');
//     subscriber.next('Ben');
//     subscriber.next('Charlie');
//     subscriber.complete();
// })

// names$.subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('Complete!')
// });

/**
 * Mimick the 'of' creation function
 */
// function MyOwnOf(...args:string[]): Observable<string> {
//     return new Observable<string>(subscriber => {
//         for (let i=0;i< args.length;i++) {
//             subscriber.next(args[i]);
//         }
//         subscriber.complete();
//     });
// }

// MyOwnOf('Alice', 'Ben', 'Charlie').subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('Complete!')
// })

//---------------------------------------------------------------------------//

/**
 * from function
 * Convert other types into an observable, i.e. convert array into an observable
 * Same as of, but instead of multiple single arguments, you provide and array
 */

/**
 * From with array
 */

// from(['Alice','Ben','Charlie']).subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('Complete!')
// });

/**
 * From with Promise
 */
// const somePromise = new Promise((resolve, reject) => {
//     resolve('resolved');
//     //reject('rejected');
// });

// from(somePromise).subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('Complete!'),
//     error: err => console.error('Error!', err)
    
// });

//---------------------------------------------------------------------------//

/**
 * fromEvent
 * Used to create an observable from events such as DOM events, jquery events, nodejs event emitter
 * Usefull to emit events such as when a button is clicked
 * Need to unsubscrive to stop receiving notifications
 */
const btnFromEvent = document.querySelector('button#btnFromEvent');

// const subscription1 = fromEvent<MouseEvent>(btnFromEvent, 'click').subscribe(event => 
//         console.log(event.type, event.x, event.y)
// );

// unsubscribing
// setTimeout(() => {
//     console.log("unsubscribing");
//     subscription1.unsubscribe();
// }, 5000);

/**
 * Mimick the 'fromEvent' creation function
 */

// const triggerClick$ = new Observable<MouseEvent>(subscriber => {
//     const clickHandler = (event:MouseEvent) => {
//         console.log("Event callback executed");
//         subscriber.next(event);
//     };

//     btnFromEvent.addEventListener('click', clickHandler);

//     Teardown logic
//     return () => {
//         btnFromEvent.removeEventListener('click', clickHandler);
//     };
// });

// const subscription2 = triggerClick$.subscribe(
//     event => console.log(event.type, event.x, event.y)
// );

// // unsubscribing
// setTimeout(() => {
//     console.log("unsubscribing");
//     subscription2.unsubscribe();
// }, 5000);

//---------------------------------------------------------------------------//

/**
 * timer
 * Create an observable that waits some time, executes and then complete, like setTimeout
 */
// console.log('Started before timer');
// const timer1Subscription = timer(2000).subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('completed')
// });

// // Check unsubscribing
// setTimeout(() => {
//     timer1Subscription.unsubscribe();
// }, 1000);

/**
 * Mimick timer
 */

// const timer2$ = new Observable<number>(subscriber => {
//     const setTimeoutHandler = setTimeout(() => {
//         console.log("Observable timeout running");
//         subscriber.next(0);
//         subscriber.complete();
//     }, 2000);

//     // Teardown logic
//     return () => {
//         clearTimeout(setTimeoutHandler);
//     };
// });

//  console.log('Started before timer');
//  const timer2Subscription = timer2$.subscribe({
//      next: value => console.log(value),
//      complete: () => console.log('completed')
//  });

// setTimeout(() => {
//     timer2Subscription.unsubscribe();
//     console.log("Unsubscribe done");
// }, 1000);

//---------------------------------------------------------------------------//

/**
 * interval
 * Create an observable that waits some time, executes and then complete, like setInterval
 * same as timer
 */

//---------------------------------------------------------------------------//

/**
 * forkJoin
 * Accepts other observables
 * Once subscribed, it would create subscriptions to all underlaying observables.
 * It will wait until all of them complete and emit a set of all their values.
 * Useful in a situation where you call multiple http endpoints and need to wait
 * for all responses before you take action
 */

//  const ajaxA$ = ajax<any>('https://random-data-api.com/api/name/random_name')
//  const ajaxB$ = ajax<any>('https://random-data-api.com/api/nation/random_nation')
//  const ajaxC$ = ajax<any>('https://random-data-api.com/api/food/random_food')

// // Without forkJoin: just getting the responses individually. But they do not run in order, they could be out of sequence
// // const subscriptionFromAjaxA = ajaxA$.subscribe(responseObj => console.log(responseObj.response.first_name));
// // const subscriptionFromAjaxB = ajaxB$.subscribe(responseObj => console.log(responseObj.response.capital));
// // const subscriptionFromAjaxC = ajaxC$.subscribe(responseObj => console.log(responseObj.response.dish));

// // With forkJoin. They will run in the sequence provided in the args array
//  forkJoin([ajaxA$, ajaxB$, ajaxC$]).subscribe(
//     ([aResponse, bResponse, cResponse]) => console.log(`${aResponse.response.first_name} is from ${bResponse.response.capital} and likes to eat ${cResponse.response.dish}`)
//  );

 
/**
 * forkJoin with error
 * Simulating http calls with setTimout in the example
 */
// const ajaxA$ = new Observable(subscriber => {
//     setTimeout(() => {
//         subscriber.next('A');
//         subscriber.complete();
//     }, 3000);

//     return () => {
//         console.log('A teardown');
//     };
// });

// const ajaxB$ = new Observable(subscriber => {
//     setTimeout(() => {
//         subscriber.error('B has error!');
//     }, 5000);

//     return () => {
//         console.log('B teardown');
//     };
// });

// forkJoin([ajaxA$, ajaxB$]).subscribe({
//     next: response => console.log(response),
//     complete: () => console.log('Completed'),
//     error: err => console.error(err)
// });

//---------------------------------------------------------------------------//

/**
 * combineLatest
 * Similar pattern as forkJoin but emits values more often
 */

 const tempInput = document.getElementById('temperature-input');
 const conversionDropdown = document.getElementById('conversion-dropdown');
 const resultText = document.getElementById('result-text');

const tempInputEvent$ = fromEvent<Event>(tempInput, 'input');
const conversionEvent$ = fromEvent<Event>(conversionDropdown, 'input');

combineLatest([tempInputEvent$, conversionEvent$]).subscribe(
    ([tempInputEvent, conversionInputEvent]: [Event, Event]) => {
        const temperature: number = Number((tempInputEvent.target as HTMLInputElement).value);
        const conversion:string = (conversionInputEvent.target as HTMLInputElement).value;
        
        let result: number;

        if (conversion == 'CtoF') {
            result = (temperature * 5/9) + 32 ;
        } else if (conversion == 'FtoC') {
            result = (temperature - 32) * 5/9;
        }

        resultText.innerHTML = `The converted value = ${result.toFixed(2)}`;
        console.log(temperature, conversion);
    }
);