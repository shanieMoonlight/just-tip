import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JtUiIconButton } from '../../buttons/icon-button/icon-button';
import { JtUiIcon } from '../../icon/icon';
import { JtTipEntry } from '../../../smart-ui/tip-entry/tip-entry';
import { JtUiTooltipDirective } from '../../tooltip/tooltip.directive';

@Component({
  selector: 'jt-tip-entry-modal',
  imports: [
    JtUiIconButton,
    JtUiIcon,
    JtTipEntry,
    JtUiTooltipDirective
  ],
  templateUrl: './tip-entry-modal.html',
  styleUrl: './tip-entry-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtTipEntryModal {
  

  protected _showModal = signal<boolean>(false);


  protected openModal(): void {
    this._showModal.set(true)
    console.log('openModal', this._showModal())
  }

  protected closeModal(): void {
    this._showModal.set(false)
    console.log('dismissError', this._showModal())
  }

}//Cls
