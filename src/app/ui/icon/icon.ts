import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JustTipTheme } from '../theme';

@Component({
  selector: 'jt-ui-icon',
  standalone: true,
  imports: [],
  template: `
      <i class="material-icons">
        <ng-content/>
      </i>
  `,
  styleUrls: ['./icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'theme()',
    '[style.--icon-size-px]': 'iconSizePx() + "px"'
  },
})
export class JtUiIcon {

  theme = input<JustTipTheme | undefined>(undefined);
  iconSizePx = input<number>(24);

}
