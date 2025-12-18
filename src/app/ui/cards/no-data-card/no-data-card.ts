import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JtUiIcon } from '../../icon/icon';

@Component({
  selector: 'jt-no-data-card',
  imports: [JtUiIcon],
  templateUrl: './no-data-card.html',
  styleUrl: './no-data-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtUiNoDataCard {}
