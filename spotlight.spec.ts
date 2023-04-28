import { TestScheduler } from "rxjs/testing";
import { Stoplight } from "./stoplight";

describe("Stoplight", () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it("Should cycle btwn green, yellow, red", () => {
    scheduler.run((helpers) => {
      const { expectObservable } = helpers;
      const stoplight = new Stoplight("green", 4);

      // specify expected color given each subscription in virtual time
      // NB: Emitting a value advances timeframe by 1 frame so subtract 1ms for each time progression
      const [expected1, sub1, expected2, sub2] = [
        "g 2999ms y 2999ms r 2999ms g",
        "^---------------------------",
        "3500ms   y 2499ms r 2999ms g",
        "3500ms   ^------------------",
      ];

      expectObservable(stoplight.getColor$(), sub1).toBe(expected1, {
        g: "green",
        y: "yellow",
        r: "red",
      });

      expectObservable(stoplight.getColor$(), sub2).toBe(expected2, {
        g: "green",
        y: "yellow",
        r: "red",
      });
    });
  });
});
