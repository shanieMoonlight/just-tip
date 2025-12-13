import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { filter, map } from 'rxjs';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { EmployeesIoService } from '../../../data/io';
import { NotificationsModal } from '../../../ui/notifications/notifications/notifications.component';
import { WeekNumberRouteService } from '../../../utils/services/week-number-route/week-number-route-service';

@Component({
  selector: 'jt-weekly-summary',
  imports: [
    NotificationsModal,
    SbPortalInputComponent,
    JsonPipe
  ],
  templateUrl: './weekly-summary.html',
  styleUrl: './weekly-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WeekNumberRouteService],
})
export class JtEmployeeWeeklySummary {

  private _employeeIoService = inject(EmployeesIoService);
  private _actRoute = inject(ActivatedRoute);
  private _weekNumberRouteService = inject(WeekNumberRouteService);

  //----------------//

  private _id$ = this._actRoute.paramMap.pipe(
    map((params: ParamMap) => params.get(JtAppRouteDefs.DETAIL_ID_PARAM) ?? undefined),
    filter((id: string | undefined): id is string => !!id)
  )

  protected _weekNumber$ = this._weekNumberRouteService.weekNumberString$;

  protected _weekNumber = toSignal(this._weekNumber$);
  protected _title = computed(() => `Summary Week (${this._weekNumber()})`);


  //----------------//


  private _summaryState = MiniStateBuilder.CreateWithObservableInput(
    this._id$,
    (id: string) => this._employeeIoService.getEmployeeWeeklySummaryById(id))


  protected _summary = computed(() => this._summaryState.data());
  protected _successMsg = this._summaryState.successMsg;
  protected _errorMsg = this._summaryState.errorMsg;
  protected _loading = this._summaryState.loading;
}


