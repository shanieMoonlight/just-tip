import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { EmployeesIoService } from '../../../data/io';
import { NotificationsModal } from '../../../ui/notifications/notifications/notifications.component';
import { JsonPipe } from '@angular/common';
import { EmployeeDto } from '../../../data/models';

@Component({
  selector: 'jt-employee-list',
  imports: [
    NotificationsModal,
    SbPortalInputComponent,
    JsonPipe
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtEmployeeListPage {
  
  private _employeeIoService = inject(EmployeesIoService);

  //----------------//


  _title = signal('Employee List');


  //----------------//


  private _employeesState = MiniStateBuilder
    .Create(() => this._employeeIoService.getAll())
    .trigger();//Trigger immediately


  protected _data = computed(() => this._employeesState.data() ?? new Array<EmployeeDto>());
  protected _successMsg = this._employeesState.successMsg;
  protected _errorMsg = this._employeesState.errorMsg;
  protected _loading = this._employeesState.loading;
}

