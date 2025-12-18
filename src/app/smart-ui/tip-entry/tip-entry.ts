import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { TipsIoService } from '../../data/io';
import { CreateTipDto } from '../../data/models';
import { JtTipForm } from '../../ui/forms/tip-form/tip-form';
import { NotificationsModal } from '../../ui/notifications/notifications/notifications.component';

@Component({
  selector: 'jt-tip-entry',
  imports: [
    JtTipForm,
    NotificationsModal
  ],
  templateUrl: './tip-entry.html',
  styleUrl: './tip-entry.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtTipEntry {

  protected _tipIoService = inject(TipsIoService)

  //----------------//


  protected enterTip = (tip: CreateTipDto) =>this._tipState.trigger(tip);
  private _tipState = MiniStateBuilder
    .CreateWithInput((tip: CreateTipDto) => this._tipIoService.add(tip))
    .setSuccessMsgFn(() => 'Tip entered successfully')

    
  protected _successMsg = this._tipState.successMsg;
  protected _errorMsg = this._tipState.errorMsg;
  protected _loading = this._tipState.loading;

}
