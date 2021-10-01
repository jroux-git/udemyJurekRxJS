import { filter, map, Observable, forkJoin, of, tap, fromEvent, debounceTime, catchError, EMPTY, Subscriber, concatMap, switchMap } from "rxjs";
import { ajax } from 'rxjs/ajax';

/**
 * filter operator
 */
// interface NewsItem {
//     category: 'Business' | 'Sports';
//     content: string;
// }

// const newsFeed$ = new Observable<NewsItem>(subscriber => {
//     setTimeout(() => {
//         subscriber.next({category: 'Business', content: 'A'})
//     }, 1000);

//     setTimeout(() => {
//         subscriber.next({category: 'Sports', content: 'B'})
//     }, 1000);

//     setTimeout(() => {
//         subscriber.next({category: 'Business', content: 'C'})
//     }, 1000);

//     setTimeout(() => {
//         subscriber.next({category: 'Sports', content: 'D'})
//     }, 1000);

//     setTimeout(() => {
//         subscriber.next({category: 'Business', content: 'E'})
//     }, 1000);
// });

// Using the filter operator as a piped operator inline
// newsFeed$.pipe(
//     filter(item => item.category === 'Sports')
// ).subscribe(
//     item => console.log(item)
// );

// As a variation of above you can create a new observable from the filter
// const sporstNewsFeed$ = newsFeed$.pipe(
//     filter(item => item.category === 'Sports')
// );

// sporstNewsFeed$.subscribe(
//     item => console.log(item)
// );

//---------------------------------------------------------------------------//

/**
 * map operator
 */

//  const mappedFirstName$ = ajax<any>('https://random-data-api.com/api/name/random_name').pipe(
//      map(responseObj => responseObj.response.first_name)
//  );

//  const mappedCity$ = ajax<any>('https://random-data-api.com/api/nation/random_nation').pipe(
//      map(responseObj => responseObj.response.capital)
//  );

//  const mappedDish$ = ajax<any>('https://random-data-api.com/api/food/random_food').pipe(
//      map(responseObj => responseObj.response.dish)
//  );

// // With forkJoin. They will run in the sequence provided in the args array
//  forkJoin([mappedFirstName$, mappedCity$, mappedDish$]).subscribe(
//     ([firstName, capital, dish]) => console.log(`${firstName} is from ${capital} and likes to eat ${dish}`)
//  );

//---------------------------------------------------------------------------//

/**
 * tap operator
 * Helps you look at the results of the operator preceding it and before it goes on to next
 * in order to investigate what is happening in the chain
 */
// of(1, 7, 3, 6, 2).pipe(
//     filter(value => value > 5),
//     tap(value => console.log('Spy: ', value)),
//     map(value => value * 2),
// ).subscribe(
//     value => console.log('Output: ', value)
// );

//---------------------------------------------------------------------------//

/**
 * debounceTime operator
 * Adds a time delay before execution is handed over to the next operator/subscriber etc
 */
// const sliderInput = document.getElementById("slider");

// fromEvent<InputEvent>(sliderInput, 'input')
// .pipe(
//     debounceTime(2000),
//     map(event => {
//         const inputElement = event.target as HTMLInputElement;
//         return inputElement.value;
//     })
// ).subscribe(value =>
//     console.log(value)
// );

//---------------------------------------------------------------------------//

/**
 * catchError operator
 * Suplies a fallback observable when an error occurs
 */

// const catchErrHttpRequest$ = new Observable(subscriber => {
//     setTimeout(() => {
//         subscriber.error(new Error('Timeout'));
//     }, 3000);
// });

// console.log('App started');

// catchErrHttpRequest$
// .pipe(
//     catchError(error => of('Fallback obeservable called'))
// )
// .subscribe(
//     value => console.log(value)
// );

//---------------------------------------------------------------------------//

/**
 * catchError with EMPTY operator
 * Usefull when you dont want to provide any error handling and just want to suppress the error
 */

//  const catchErrHttpRequestEmpty$ = new Observable(subscriber => {
//     setTimeout(() => {
//         subscriber.error(new Error('Timeout'));
//     }, 3000);
// });

// console.log('App started');

// catchErrHttpRequestEmpty$
// .pipe(
//     catchError(error => EMPTY)
// )
// .subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('completed because EMPTY calls complete on subscriber')
// });

//---------------------------------------------------------------------------//

/**
 * concatMap flattening operator
 * memory leak safe, completes after each execution
 * with static values for concat map
 * fix concurrency issues by always completing before continuing to next call. Queued in a sense
 */

// const flattening$ = new Observable(subscriber => {
//     setTimeout(() => {
//       subscriber.next('A')  
//     }, 2000);

//     setTimeout(() => {
//         subscriber.next('B')  
//       }, 5000);
// });

// flattening$
// .pipe(
//     concatMap(value => of(1, 2))
// ).subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('çomplete')
// });

/**
 * concatMap flattening operator
 * using the orignal observable's value in concatMap, passed down to the new observable
 * also implement continuation error handling that does not complete the subscription
 */
//  const txtEndpointInput: HTMLInputElement = document.querySelector('input#endpoint');
//  const btnExecuteEndpoint = document.getElementById('executeEndpoint');
 
// fromEvent(btnExecuteEndpoint, 'click')
// .pipe(
//     map(() => txtEndpointInput.value),
//     concatMap(value => 
//         ajax(`https://random-data-api.com/api/${value}/random_${value}`)
//         .pipe(
//             catchError(() => EMPTY)
//         )
//     ),
// ).subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('çomplete')
// });

//---------------------------------------------------------------------------//

/**
 * switchMap flattening operator
 * Does not wait for previous execution like concatMap. 
 * * memory leak safe, completes after each execution that was not cancelled
 * Unsubscribes immediately and then subscribes to next execution ("switches over" to new call)
 * Note: Check console, if you click many times fast, only the last one will be excuted, unlike concatMap
 * which will execute each click
 */

//  const txtEndpointInput: HTMLInputElement = document.querySelector('input#endpoint');
//  const btnExecuteEndpoint = document.getElementById('executeEndpoint');
 
// fromEvent(btnExecuteEndpoint, 'click')
// .pipe(
//     map(() => txtEndpointInput.value),
//     switchMap(value => 
//         ajax(`https://random-data-api.com/api/${value}/random_${value}`)
//         .pipe(
//             catchError(() => EMPTY)
//         )
//     ),
// ).subscribe({
//     next: value => console.log(value),
//     complete: () => console.log('çomplete')
// });

//---------------------------------------------------------------------------//

/**
 * mergeMap operator
 * memory leaks possible
 * order of execution responses not guanrateed, subscriptions happen concurrently
 */