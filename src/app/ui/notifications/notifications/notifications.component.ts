import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ErrorModal } from '../error/error.modal';
import { LoaderModal } from '../loader/loader.modal';
import { SuccessModal } from '../success/success.modal';

@Component({
  selector: 'jt-notifications-modal',
  standalone: true,
  imports: [
    ErrorModal,
    SuccessModal,
    ErrorModal,
    LoaderModal
  ],
  template: ` 
    <jt-error-modal 
        [errorMsg]="errorMsg()"/>

    <jt-success-modal 
        [successMsg]="successMsg()"/>

    <jt-loader-modal [isLoading]="isLoading()" 
        [loadingMessage]="loadingMessage()"/>    
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsModal {

  successMsg = input<string | undefined>(undefined);
  errorMsg = input<string | undefined>(undefined);
  loadingMessage = input<string | undefined>(undefined);
  isLoading = input<boolean>(false);
}
