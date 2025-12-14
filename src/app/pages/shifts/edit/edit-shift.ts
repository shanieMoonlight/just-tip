import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { MiniStateCombined } from '@spider-baby/mini-state/utils';
import { SbToastService } from '@spider-baby/ui-toast';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { filter, map, of, tap } from 'rxjs';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { RosterIoService } from '../../../data/io';
import { ShiftDto } from '../../../data/models';
import { JtUiShiftForm } from '../../../ui/forms/shift-form/shift-form';
import { NotificationsModal } from '../../../ui/notifications/notifications/notifications.component';

@Component({
  selector: 'jt-edit-shift',
  imports: [
    NotificationsModal,
    SbPortalInputComponent,
    JsonPipe,
    JtUiShiftForm
  ],
  templateUrl: './edit-shift.html',
  styleUrl: './edit-shift.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtEditShiftPage {

  private _rosterIoService = inject(RosterIoService);
  private _actRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _toaster = inject(SbToastService);

  //----------------//

  private _shiftId$ = this._actRoute.paramMap.pipe(
    tap(params => console.log('Shift ID Params:', params)),
    map((params: ParamMap) => params.get(JtAppRouteDefs.SHIFT_ID_PARAM) ?? undefined),
    filter((id: string | undefined): id is string => !!id)
  )

  protected _shiftId = toSignal(this._shiftId$);

  //----------------//
    
  private _shiftState = MiniStateBuilder.CreateWithObservableInput(
    this._shiftId$,
    (id: string) => this._rosterIoService.getByShiftId(id))


  protected editShift = (shift: ShiftDto) => this._editShiftState.trigger(shift);
  private _editShiftState = MiniStateBuilder
    .CreateWithInput((shift: ShiftDto) => this._rosterIoService.editShift(shift.id, shift))
    // .CreateWithInput((shift: ShiftDto) => of(0))
    .setOnSuccessFn(() => {
      this._toaster.success(`Shift Updated!`);
      this._router.navigateByUrl(`/${JtAppRouteDefs.route('employee-shifts')}/${this._shift()?.employee.id}`)
    })

  private _notificationStates = MiniStateCombined.Combine(
    this._shiftState,
    this._editShiftState
  )

  protected _shift = this._shiftState.data;
  protected _employee = computed(() => this._shift()?.employee);
  protected _title = computed(() => `Edit Shift - ${this._employee()?.name}`);
  protected _successMsg = this._notificationStates.successMsg;
  protected _errorMsg = this._notificationStates.errorMsg;
  protected _loading = this._notificationStates.loading;

}
