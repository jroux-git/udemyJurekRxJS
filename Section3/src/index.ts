import { Observable } from 'rxjs';

const observable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next("Alice");
  subscriber.next("Ben");
  let counter = 0;

  // setTimeout(() => {
  //   subscriber.next("Charlie");
  //   //subscriber.complete();
  // }, 2000);

  //subscriber.complete();
  //subscriber.unsubscribe();
  // setTimeout(() => {
  //   subscriber.error(new Error("Oops!"));
  // }, 4000);

   const invervalId = setInterval(() => {
    console.log("Emitted", counter);
     subscriber.next((counter++).toString());
   }, 2000);

  // Teardown logic
  return () => {
    console.log('Teardown');
    clearInterval(invervalId);
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
const subscription = observable$.subscribe({
  next: value => console.log(value),
  error: err => console.error("Error: ", err.message),
  complete: () => console.log("complete")
});

console.log('After subscribe');

// Unsubscribe
setTimeout(() => {
  console.log("unsubscribing");
  subscription.unsubscribe();
}, 7000);