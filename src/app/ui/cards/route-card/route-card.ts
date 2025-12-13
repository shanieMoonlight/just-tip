import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JtUiIcon } from '../../icon/icon';
import { JustTipTheme } from '../../theme';


@Component({
  selector: 'jt-ui-route-card',
  imports: [
    RouterLink,
    JtUiIcon
  ],
  templateUrl: './route-card.html',
  styleUrl: './route-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'theme()'
  },
})
export class JtUiRouteCard {

  theme = input<JustTipTheme | undefined>('primary');
  title = input.required<string>();
  route = input.required<string>();
  icon = input.required<string>();

}//Cls
