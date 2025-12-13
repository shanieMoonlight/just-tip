import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekNumber',
})
export class WeekNumberPipe implements PipeTransform {

  private static readonly CURRENT_WEEK_STR = 'Current';

  /**
   * Converts a week number to a string representation.
   * If the value is null, undefined, or not a valid number, it returns 'Current'.
   * If the number is greater than 0, it returns the number prefixed with a hyphen (e.g., '-2').
   * @param value week number as string or number
   * @returns 
   */
  transform(value: string | number): string {
    
    console.log('value', value);
    
    
    if (value === null || value === undefined) 
      return 'Current';

    
    let num: number | undefined;
    if (typeof value === 'number') {
      
      num = value;
   
    } else if (typeof value === 'string') {
   
      const s = value.trim();
      if (s === '') return WeekNumberPipe.CURRENT_WEEK_STR;
      const n = Number(s);
      if (!Number.isFinite(n)) 
        return WeekNumberPipe.CURRENT_WEEK_STR;
      num = n;

    } else {
      
      return WeekNumberPipe.CURRENT_WEEK_STR;

    }

    return num > 0 ? `-${num}` : WeekNumberPipe.CURRENT_WEEK_STR;
  }

}
