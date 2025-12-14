import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShiftDateUtils {
  
  timeOfDayMs(d?: Date | null): number {
    if (!d) return NaN;
    return d.getUTCHours() * 3600000
      + d.getUTCMinutes() * 60000
      + d.getUTCSeconds() * 1000
      + d.getUTCMilliseconds();
  }

  //----------------//

  isStartAfterEnd(start: Date, end: Date): boolean {

    if (!start || !end)
      return false;

    const sMs = this.timeOfDayMs(start);
    let eMs = this.timeOfDayMs(end);

    if (isNaN(sMs) || isNaN(eMs))
      return false;

    // Special-case: treat midnight `00:00` as `24:00` (next day) so
    // a shift starting at 23:00 and ending at 00:00 is valid.
    if (eMs === 0 && sMs > 0)
      eMs += 24 * 3600000; // add 24 hours in ms


    return sMs >= eMs;
  }

  //----------------//

  floorToHour(d = new Date()): Date {
    const t = new Date(d);
    t.setMinutes(0, 0, 0);

    return t;
  }

  //----------------//


  addHour(d = new Date()): Date {
    const t = new Date(d);
    t.setHours(t.getHours() + 1, 0, 0);
    return t;
  }

  //----------------//

  floorToDay(d = new Date()): Date {
    const t = new Date(d);
    t.setHours(0, 0, 0);
    return t;
  }
}
