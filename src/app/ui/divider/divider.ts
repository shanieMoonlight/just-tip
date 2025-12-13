import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JustTipTheme } from '../theme';

@Component({
  selector: 'jt-ui-divider',
  imports: [],
  template: ``,
  styleUrl: './divider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'theme()'
  },
})
export class JtUiDivider {
  
  theme = input<JustTipTheme | undefined>(undefined);
}
