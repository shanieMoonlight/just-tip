import { ChangeDetectionStrategy, Component, Input, output, signal } from '@angular/core';
import { JtUiIconButton } from '../../buttons/icon-button/icon-button';
import { JtUiTextButton } from '../../buttons/text-button/text-button.component';
import { JtUiDivider } from '../../divider/divider';
import { JtUiIcon } from '../../icon/icon';

@Component({
  selector: 'jt-error-modal',
  standalone: true,
  imports: [
    JtUiIconButton,
    JtUiTextButton,
    JtUiDivider,
    JtUiIcon
  ],
  templateUrl: './error.modal.html',
  styleUrls: ['./error.modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorModal {

  _errorMsg = signal<string | undefined>(undefined);
  @Input()
  set errorMsg(message: string | null | undefined) {
    this._errorMsg.set(message ?? undefined);
  }

  dismissed = output()


  protected dismissError(): void {
    this._errorMsg.set(undefined)
    this.dismissed.emit();
    console.log('dismissError', this._errorMsg())
  }

}//Cls
