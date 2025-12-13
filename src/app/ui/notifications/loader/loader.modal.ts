import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { JustTipTheme } from '../../theme';

@Component({
  selector: 'jt-loader-modal',
  standalone: true,
  imports: [],
  templateUrl: './loader.modal.html',
  styleUrls: ['./loader.modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'theme()',
  },
})
export class LoaderModal {

  loadingMessage = input<string | undefined>('');
  isLoading = input<boolean>(false);
  theme = input<JustTipTheme | undefined>(undefined);

}
