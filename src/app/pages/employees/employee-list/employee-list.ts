import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { EmployeesIoService } from '../../../data/io';
import { EmployeeDto } from '../../../data/models';
import { JtUiIconButton } from '../../../ui/buttons/icon-button/icon-button';
import { JtUiNoDataCard } from '../../../ui/cards/no-data-card/no-data-card';
import { NotificationsModal } from '../../../ui/notifications/notifications/notifications.component';
import { JtUiTooltipDirective } from '../../../ui/tooltip/tooltip.directive';

@Component({
  selector: 'jt-employee-list',
  imports: [
    NotificationsModal,
    SbPortalInputComponent,
    JtUiIconButton,
    RouterLink,
    JtUiTooltipDirective,
    JtUiNoDataCard
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtEmployeeListPage {

  private _employeeIoService = inject(EmployeesIoService);
  private _router = inject(Router);

  //----------------//


  protected _title = signal('Employee List');
  protected _shiftListRoute = computed(() => `/${JtAppRouteDefs.route('employee-shifts')}`);


  //----------------//


  private _employeesState = MiniStateBuilder
    .Create(() => this._employeeIoService.getAll())
    .trigger();//Trigger immediately


  protected _data = computed(() => this._employeesState.data() ?? new Array<EmployeeDto>());
  protected _successMsg = this._employeesState.successMsg;
  protected _errorMsg = this._employeesState.errorMsg;
  protected _loading = this._employeesState.loading;

  protected goToEmlployeeDetails(employeeId: string) {
    console.log('Navigating to employee details for ID:', employeeId);
    this._router.navigateByUrl(`/${JtAppRouteDefs.route('employee-weekly-summary')}/${employeeId}`);
  }

}

