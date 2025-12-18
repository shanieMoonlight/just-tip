import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { filter, map } from 'rxjs';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { EmployeesIoService } from '../../../data/io';
import { NotificationsModal } from '../../../ui/notifications/notifications/notifications.component';

@Component({
  selector: 'jt-employee-detail',
  imports: [
    NotificationsModal,
    SbPortalInputComponent,
    JsonPipe
  ],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtEmployeeDetailPage {
  
  private _employeeIoService = inject(EmployeesIoService);
  private _actRoute = inject(ActivatedRoute);

  //----------------//
  
  _title = signal('Employee Detail');

  
  //----------------//

  private _id$ = this._actRoute.paramMap.pipe(
    map((params: ParamMap) => params.get(JtAppRouteDefs.DETAIL_ID_PARAM) ?? undefined),
    filter((id: string | undefined): id is string => !!id)
  )

  //----------------//


  private _employeeState = MiniStateBuilder.CreateWithObservableInput(
    this._id$,
    (id: string) => this._employeeIoService.getById(id))


  protected _employee = computed(() => this._employeeState.data());
  protected _successMsg = this._employeeState.successMsg;
  protected _errorMsg = this._employeeState.errorMsg;
  protected _loading = this._employeeState.loading;
}

