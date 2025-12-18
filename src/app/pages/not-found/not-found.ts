import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JtUiButton } from '../../ui/buttons/button/button.component';
import { JtUiIcon } from '../../ui/icon/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'jt-not-found',
  imports: [
    JtUiButton,
    JtUiIcon,
    RouterLink
  ],
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtNotFoundPage {}
