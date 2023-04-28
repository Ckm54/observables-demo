import { BehaviorSubject, Observable, interval } from "rxjs";
import { map, startWith, takeWhile } from "rxjs";

// color sequence
const colors = ["green", "yellow", "red"] as const;
// union type of possible colors shown
type StoplightColor = (typeof colors)[number];

export class Stoplight {
  // instance variable for the color$ stream
  private color$: BehaviorSubject<StoplightColor>;

  // initialize active colot and number of iterations to prevent infinite loop while testing
  constructor(initialColor: StoplightColor, iterations: number = 0) {
    this.color$ = new BehaviorSubject<StoplightColor>(initialColor);

    let colorCounter = colors.indexOf(initialColor);
    let iterationsCounter = 1;
    interval(3000)
      .pipe(
        startWith(iterationsCounter),
        map(() => {
          this.color$.next(colors[colorCounter++ % colors.length]);
        }),
        takeWhile(() => iterationsCounter++ !== iterations)
      )
      .subscribe();
  }

  // returns a read-only stream of the active color
  public getColor$(): Observable<StoplightColor> {
    return this.color$.asObservable();
  }
}
