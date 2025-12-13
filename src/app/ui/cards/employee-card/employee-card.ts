import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { EmployeeDto } from '../../../data/models';
import { JustTipTheme } from '../../theme';

@Component({
  selector: 'jt-ui-employee-card',
  imports: [
    RouterLink
  ],
  templateUrl: './employee-card.html',
  styleUrls: ['./employee-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'theme()'
  },
})
export class JtUiEmployeeCard {

  theme = input<JustTipTheme | undefined>('primary');
  employee = input.required<EmployeeDto>();

  protected employeeDetailRoute = computed(() =>
    `/${JtAppRouteDefs.route('employee-detail')}/${this.employee().id}`
  );



}//Cls
