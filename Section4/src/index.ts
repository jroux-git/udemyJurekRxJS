import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const ajax$ = ajax<any>('https://random-data-api.com/api/name/random_name')
/**
 * Cold observable: Produces a new result everytime because the subscriptions run independently from each other
 */
// ajax$.subscribe((data:any) => {
//     console.log(`First: ${data.response.first_name}`);
// });

// ajax$.subscribe((data:any) => {
//     console.log(`Second: ${data.response.first_name}`);
// });

// ajax$.subscribe((data:any) => {
//     console.log(`Third: ${data.response.first_name}`);
// });

/**
* Hot observable: All subscriptions share the same source. Thus each subscription is not 
* created new and independently, but rather subscribes to ane existing source
 */
// const hotButton = document.querySelector('button#hotButton');

// const hotButtonClick$ = new Observable<MouseEvent>((subscriber:any) => {
//     hotButton.addEventListener('click', (event:MouseEvent) => {
//             subscriber.next(event);
//     });
// });

// hotButtonClick$.subscribe((event:MouseEvent) => {
//     console.log(`Event1: ${event.type} ${event.x} ${event.y}`);
// });

// setTimeout(() =>{
//     console.log('Timeout done');
//     hotButtonClick$.subscribe((event:MouseEvent) => {
//         console.log(`Event2: ${event.type} ${event.x} ${event.y}`);
//     });
// }, 5000);

/**
 * Hot and Cold: side-by-side
 */


