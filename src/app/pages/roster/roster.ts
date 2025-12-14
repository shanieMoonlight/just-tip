import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { RosterIoService } from '../../data/io';
import { JtUiIconButton } from '../../ui/buttons/icon-button/icon-button';
import { NotificationsModal } from '../../ui/notifications/notifications/notifications.component';
import { JtUiRosterTable } from '../../ui/roster-table/roster-table';
import { JtUiTooltipDirective } from '../../ui/tooltip/tooltip.directive';
import { WeekNumberRouteService } from '../../utils/services/week-number-route/week-number-route-service';
import { ShiftRosterItemDto } from '../../data/models';
import { Router } from '@angular/router';
import { JtAppRouteDefs } from '../../app-route-defs';

@Component({
  selector: 'jt-roster',
  imports: [
    NotificationsModal,
    SbPortalInputComponent,
    JtUiIconButton,
    JtUiTooltipDirective,
    JsonPipe,
    JtUiRosterTable
  ],
  templateUrl: './roster.html',
  styleUrl: './roster.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WeekNumberRouteService],
})
export class JtRosterPage {

  private _rosterIoService = inject(RosterIoService);
  private _router = inject(Router);
  private _weekNumberRouteService = inject(WeekNumberRouteService);

  //----------------//

  private _weekNumber$ = this._weekNumberRouteService.weekNumber$;
  protected _weekNumber = this._weekNumberRouteService.weekNumber;
  protected _weekNumberString = this._weekNumberRouteService.weekNumberString

  protected _title = computed(() => `Roster Week (${this._weekNumber() > 0 ? '+' : ''}${this._weekNumberString()})`);

  // private _rosterState = MiniStateBuilder.Create(
  //   () => this._rosterIoService.currentWeek())
  //   .trigger();//Trigger immediately

  private _rosterState = MiniStateBuilder.CreateWithObservableInput(
    this._weekNumber$,
    (weekNumber: number) => this._rosterIoService.getByWeek(weekNumber))


  protected _roster = computed(() => this._rosterState.data());
  // protected _roster = signal(rosterSample);
  protected _successMsg = this._rosterState.successMsg;
  protected _errorMsg = this._rosterState.errorMsg;
  protected _loading = this._rosterState.loading;




  protected previousWeek = () =>
    this._weekNumberRouteService.setWeek(this._weekNumber() - 1);


  protected nextWeek = () =>
    this._weekNumberRouteService.setWeek(this._weekNumber() + 1);

  protected onShiftSelected(shift: ShiftRosterItemDto) {
    console.log('Shift selected in roster table:', shift, shift.startTime < new Date());
    if (new Date(shift.startTime) < new Date())
      return
    this._router.navigate([`/${JtAppRouteDefs.route('edit-shift')}/${shift.shiftId}`]);
  }

}//Cls
