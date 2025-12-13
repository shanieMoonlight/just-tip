import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { RosterIoService } from '../../data/io';
import { NotificationsModal } from '../../ui/notifications/notifications/notifications.component';
import { WeekNumberRouteService } from '../../utils/services/week-number-route/week-number-route-service';

@Component({
  selector: 'jt-roster',
  imports: [
    NotificationsModal,
    SbPortalInputComponent,
    JsonPipe
  ],
  templateUrl: './roster.html',
  styleUrl: './roster.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WeekNumberRouteService],
})
export class JtRosterPage {

  private _rosterIoService = inject(RosterIoService);
  private _weekNumberRouteService = inject(WeekNumberRouteService);
  
  //----------------//
  
  protected _weekNumber$ = this._weekNumberRouteService.weekNumberString$;

  protected _weekNumber = toSignal(this._weekNumber$);
  protected _title = computed(() => `Roster Week (${this._weekNumber()})`);

  private _rosterState = MiniStateBuilder.Create(
    () => this._rosterIoService.currentWeek())
    .trigger();//Trigger immediately


  protected _roster = computed(() => this._rosterState.data());
  protected _successMsg = this._rosterState.successMsg;
  protected _errorMsg = this._rosterState.errorMsg;
  protected _loading = this._rosterState.loading;

}//Cls
