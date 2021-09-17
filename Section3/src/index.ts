import { Observable } from 'rxjs';

const observable$ = new Observable<string>(subscriber => {
  console.log('Observable executed');
  subscriber.next("Alice");
  subscriber.next("Ben");

  setTimeout(() => {
    subscriber.next("Charlie");
    //subscriber.complete();
  }, 2000);

  //subscriber.complete();
  //subscriber.unsubscribe();
  // setTimeout(() => {
  //   subscriber.error(new Error("Oops!"));
  // }, 4000);

  // Teardown logic
  return () => {
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
  next: value => console.log(value),
  error: err => console.error("Error: ", err.message),
  complete: () => console.log("complete")
});

console.log('After subscribe');
