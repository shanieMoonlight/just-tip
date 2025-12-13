import { ChangeDetectionStrategy, Component, input, Input, output, signal } from '@angular/core';
import { JtUiIconButton } from '../../buttons/icon-button/icon-button';
import { JtUiTextButton } from '../../buttons/text-button/text-button.component';
import { JtUiDivider } from '../../divider/divider';
import { JtUiIcon } from '../../icon/icon';

@Component({
  selector: 'jt-success-modal',
  standalone: true,
  imports: [
    JtUiIconButton,
    JtUiTextButton,
    JtUiDivider,
    JtUiIcon
  ],
  templateUrl: './success.modal.html',
  styleUrls: ['./success.modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessModal {

  _successMsg = signal<string | undefined>(undefined);
  @Input()
  set successMsg(message: string | null | undefined) {
    this._successMsg.set(message ?? undefined);
  }

  title = input<string>('Success');

  dismissed = output();

  protected dismissSuccess() {
    this._successMsg.set(undefined);
    this.dismissed.emit();
  }

}
