import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { filter, map } from 'rxjs';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { EmployeesIoService } from '../../../data/io';
import { NotificationsModal } from '../../../ui/notifications/notifications/notifications.component';
import { ShiftDto } from '../../../data/models';
import { MiniStateCombined } from '@spider-baby/mini-state/utils';
import { JtUiShiftForm } from '../../../ui/forms/shift-form/shift-form';
import { SbToastService } from '@spider-baby/ui-toast';


@Component({
  selector: 'jt-add-shift',
  imports: [
    NotificationsModal,
    SbPortalInputComponent,
    JsonPipe,
    JtUiShiftForm
  ],
  templateUrl: './add-shift.html',
  styleUrl: './add-shift.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtAddShiftPage {

  private _employeeIoService = inject(EmployeesIoService);
  private _actRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _toaster = inject(SbToastService);

  //----------------//

  private _employeeId$ = this._actRoute.paramMap.pipe(
    map((params: ParamMap) => params.get(JtAppRouteDefs.EMPLOYEE_ID_PARAM) ?? undefined),
    filter((id: string | undefined): id is string => !!id)
  )

  protected _employeeId = toSignal(this._employeeId$);

  //----------------//

  private _employeeState = MiniStateBuilder.CreateWithObservableInput(
    this._employeeId$,
    (id: string) => this._employeeIoService.getById(id))


  protected addShift = (shift: ShiftDto) => this._addShiftState.trigger(shift);
  private _addShiftState = MiniStateBuilder
    .CreateWithInput((shift: ShiftDto) => this._employeeIoService.addShift(shift))
    .setOnSuccessFn(() => {
      this._toaster.success(`Shift added Successfully!`);
      this._router.navigateByUrl(`/${JtAppRouteDefs.route('employee-shifts')}/${this._employeeId()}`)
    })

  private _notificationStates = MiniStateCombined.Combine(
    this._employeeState,
    this._addShiftState
  )

  protected _employee = this._employeeState.data;
  protected _title = computed(() => `Add Shift - ${this._employee()?.name}`);
  protected _successMsg = this._notificationStates.successMsg;
  protected _errorMsg = this._notificationStates.errorMsg;
  protected _loading = this._notificationStates.loading;

}
