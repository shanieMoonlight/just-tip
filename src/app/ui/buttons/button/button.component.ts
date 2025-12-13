import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JustTipTheme } from '../../theme';

@Component({
  selector: 'jt-ui-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      class="jt-btn"
      [ngClass]="color()">
      <ng-content/>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtUiButtonComponent {

  disabled = input<boolean>(false);

  color = input<JustTipTheme>('primary')
  type = input<'button' | 'submit' | 'reset'>('button');


}
