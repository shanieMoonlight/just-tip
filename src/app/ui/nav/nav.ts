import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppImages } from '../../config/images';
import { RouterLink } from '@angular/router';

//######################################//

const DEFAULT_LOGO = AppImages.logo;

//######################################//

@Component({
  selector: 'jt-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrls: ['./nav.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtNavbar {

  /** Path to logo image */
  logo = input<string>(DEFAULT_LOGO);

  /** Center title */
  title = input<string>('JustTip Test');
}
