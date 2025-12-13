import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JustTipTheme } from '../../theme';

@Component({
  selector: 'jt-ui-text-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      class="jt-text-button"
      [ngClass]="theme()">
      <ng-content/>
    </button>
  `,
  styleUrls: ['./text-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtUiTextButton {

  disabled = input<boolean>(false);

  theme = input<JustTipTheme>('primary');
  type = input<'button' | 'submit' | 'reset'>('button');

}
