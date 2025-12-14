import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JustTipTheme } from '../../theme';
import { EmployeeWeeklySummaryDto } from '../../../data/models/employee-weekly-summary-dto';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { JtUiIcon } from "../../icon/icon";
import { JtUiTooltipDirective } from '../../tooltip/tooltip.directive';


@Component({
    selector: 'jt-ui-employee-weekly-summary-card',
    imports: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    JtUiIcon
],
    templateUrl: './employee-weekly-summary-card.html',
    styleUrl: './employee-weekly-summary-card.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class]': 'theme()'
    },
})
export class JtUiEmployeeWeeklySummaryCard {

    theme = input<JustTipTheme | undefined>('primary');
    employee = input.required<EmployeeWeeklySummaryDto>();

}//Cls
