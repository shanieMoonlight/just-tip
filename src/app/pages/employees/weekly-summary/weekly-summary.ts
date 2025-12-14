import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { combineLatest, filter, map, startWith } from 'rxjs';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { EmployeesIoService } from '../../../data/io';
import { NotificationsModal } from '../../../ui/notifications/notifications/notifications.component';
import { WeekNumberRouteService } from '../../../utils/services/week-number-route/week-number-route-service';
import { JtUiIconButton } from '../../../ui/buttons/icon-button/icon-button';
import { JtUiEmployeeWeeklySummaryCard } from '../../../ui/cards/employee-weekly-summary-card/employee-weekly-summary-card';
import { JtUiTooltipDirective } from '../../../ui/tooltip/tooltip.directive';

@Component({
  selector: 'jt-weekly-summary',
  imports: [
    NotificationsModal,
    SbPortalInputComponent,
    JtUiIconButton,
    JtUiEmployeeWeeklySummaryCard,
    JtUiTooltipDirective,
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


  private _weekNumber$ = this._weekNumberRouteService.weekNumber$
    .pipe(startWith(0));
  protected _weekNumber = this._weekNumberRouteService.weekNumber;
  protected _weekNumberString = this._weekNumberRouteService.weekNumberString;


  private _id$ = this._actRoute.paramMap.pipe(
    map((params: ParamMap) => params.get(JtAppRouteDefs.DETAIL_ID_PARAM) ?? undefined),
    filter((id: string | undefined): id is string => !!id)
  )

  protected _title = computed(() => `Summary Week (${this._weekNumberString()})`);


  //----------------//

  private _idAndWeek$ = combineLatest([this._id$, this._weekNumber$]).pipe(
    map(([id, weekNumber]) => ({ id, weekNumber }))
  );

  _idAndWeek = toSignal(this._idAndWeek$);

  private _summaryState = MiniStateBuilder.CreateWithObservableInput(
    this._idAndWeek$,
    (idAndWeek) => this._employeeIoService.getEmployeeWeeklySummaryById(idAndWeek.id, idAndWeek.weekNumber))


  protected _summary = this._summaryState.data;
  protected _successMsg = this._summaryState.successMsg;
  protected _errorMsg = this._summaryState.errorMsg;
  protected _loading = this._summaryState.loading;

  //----------------//

  previousWeek = () =>
    this._weekNumberRouteService.setWeek(this._weekNumber() - 1);


  nextWeek = () =>
    this._weekNumberRouteService.setWeek(this._weekNumber() + 1);
}


