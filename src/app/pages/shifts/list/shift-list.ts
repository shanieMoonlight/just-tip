import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { MiniStateCombined } from '@spider-baby/mini-state/utils';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { filter, map, merge, scan, Subject } from 'rxjs';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { EmployeesIoService } from '../../../data/io';
import { ShiftRosterItemDto } from '../../../data/models';
import { JtUiIconButton } from '../../../ui/buttons/icon-button/icon-button';
import { NotificationsModal } from '../../../ui/notifications/notifications/notifications.component';
import { JtUiTooltipDirective } from '../../../ui/tooltip/tooltip.directive';

@Component({
  selector: 'jt-shift-list',
  imports: [
    NotificationsModal,
    SbPortalInputComponent,
    DatePipe,
    JtUiIconButton,
    RouterLink,
    JtUiTooltipDirective
  ],
  templateUrl: './shift-list.html',
  styleUrl: './shift-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtShiftListPage {

  private _employeeIoService = inject(EmployeesIoService);
  private _actRoute = inject(ActivatedRoute);

  //----------------//
  
  protected _editShiftRoute = computed(() => `/${JtAppRouteDefs.route('edit-shift')}`)
  protected _addShiftRoute = computed(()  => `/${JtAppRouteDefs.route('add-shift')}`)

  private _employeeId$ = this._actRoute.paramMap.pipe(
    map((params: ParamMap) => params.get(JtAppRouteDefs.EMPLOYEE_ID_PARAM) ?? undefined),
    filter((id: string | undefined): id is string => !!id)
  )

  _employeeId = toSignal(this._employeeId$);


  //----------------//

  private _employeeState = MiniStateBuilder.CreateWithObservableInput(
    this._employeeId$,
    (id: string) => this._employeeIoService.getById(id))

  private _shiftsState = MiniStateBuilder.CreateWithObservableInput(
    this._employeeId$,
    (id: string) => this._employeeIoService.getUpcomingShifts(id))


  private _shift$ = new Subject<ShiftRosterItemDto>();
  protected deleteShift = (shift: ShiftRosterItemDto) => this._shift$.next(shift);
  private _deleteShiftState = MiniStateBuilder.CreateWithObservableInput(
    this._shift$,
    (shift) => this._employeeIoService.removeShift(shift.employeeId, shift.shiftId))
    .setSuccessMsgFn(() => `Shift deleted successfully!`)


  private _notificationStates = MiniStateCombined.Combine(
    this._employeeState,
    this._shiftsState,
    this._deleteShiftState
  )
  
  protected _employee = this._employeeState.data;
  protected _title = computed(() => `Shifts - ${this._employee()?.name}`);
  protected _successMsg = this._notificationStates.successMsg;
  protected _errorMsg = this._notificationStates.errorMsg;
  protected _loading = this._notificationStates.loading;


   _shifts$ = merge(
    this._shiftsState.data$.pipe(map(all => ({ type: 'base' as const, payload: all }))),
    this._deleteShiftState.data$.pipe(map(item => ({ type: 'delete' as const, id: item.id })))
  ).pipe(
    scan((state: ShiftRosterItemDto[], action) => {  // Actions come in, shift array goes out! 
                                        // The state (shift array) is accumulated/persisted here, so we are always working with the latest data      
      if (!action) return state;
      
      switch (action.type) {
        case 'base':
          // authoritative reset
          return [...action.payload]
        case 'delete':
          return state.filter(a => String(a.shiftId) !== String(action.id));
        default:
          return state;
      }
    }, [] as ShiftRosterItemDto[])
  );

  
  protected _shifts = toSignal(this._shifts$)

}


