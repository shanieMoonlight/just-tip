import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { Identifier } from '../../../data/io/data-service/identifier';

@Injectable({
  providedIn: 'root',
})
export class WeekNumberRouteService {

  private _actRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  //----------------//

  weekNumber$ = this._actRoute.paramMap.pipe(
    map((params: ParamMap) => params.get(JtAppRouteDefs.WEEK_NUM_PARAM) ?? undefined),
    // tap(week => console.log('Week Number from Route:', week)),
    map(w => !w ? 0 : Number(w))
  )
  weekNumberString$ = this.weekNumber$.pipe(
    map((week: Identifier) => `${!week ? 'Current' : week}`)
  )

  weekNumberString = toSignal(this.weekNumberString$);
  weekNumber = toSignal(this.weekNumber$);

  
  //----------------//


  setWeek(week: number | string) {

    const weekStr = String(week);
    const hasParam = this._actRoute.snapshot.paramMap.has(JtAppRouteDefs.WEEK_NUM_PARAM);

    // If the current route already has the week path param, replace it
    // by navigating to ['..', week]. If there is no param (e.g. '/tips'),
    // append the segment instead.
    const commands = hasParam ? ['..', weekStr] : [weekStr];

    this._router.navigate(commands, {
      relativeTo: this._actRoute,
      replaceUrl: true,
    });
  }
  

}//Cls
