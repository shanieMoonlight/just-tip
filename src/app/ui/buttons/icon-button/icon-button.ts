import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JustTipTheme } from '../../theme';
import { JtUiIcon } from '../../icon/icon';

@Component({
  selector: 'jt-ui-icon-button',
  standalone: true,
  imports: [
    NgClass,
    JtUiIcon
  ],
  template: `
    <button
      #btn
      [type]="type()"
      [disabled]="disabled()"
      class="jt-icon-btn"
      [ngClass]="theme()">
      <jt-ui-icon [theme]="theme()"> {{iconName() }}</jt-ui-icon>
    </button>
  `,
  styleUrls: ['./icon-button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtUiIconButton {

  disabled = input<boolean>(false);
  theme = input<JustTipTheme | undefined>(undefined);
  type = input<'button' | 'submit' | 'reset'>('button');
  iconName = input<string>();

}
