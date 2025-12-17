import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { MaintenanceIoService } from './data/io';
import { JtUiIconButton } from './ui/buttons/icon-button/icon-button';
import { JtNavbar } from './ui/nav/nav';
import { NotificationsModal } from './ui/notifications/notifications/notifications.component';
import { JtDarkModeToggle } from './ui/theming/dark-mode/dark-mode-toggle';
import { JtThemePicker } from './ui/theming/picker/theme-picker';
import { JtUiTooltipDirective } from './ui/tooltip/tooltip.directive';
import { JtTipEntryModal } from './ui/forms/tip-form/tip-entry-modal';

@Component({
  imports: [
    RouterModule,
    RouterOutlet,
    JtDarkModeToggle,
    JtNavbar,
    JtThemePicker,
    SbPortalInputComponent,    
    NotificationsModal,
    JtUiIconButton,
    JtTipEntryModal,
    JtUiTooltipDirective

  ],
  selector: 'jt-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

  protected _mntcIoService = inject(MaintenanceIoService)


  //----------------//


  protected refreshDb = () =>this._dbState.trigger();
  private _dbState = MiniStateBuilder
    .Create(() => this._mntcIoService.initializeDb())
    .setSuccessMsgFn(() => 'Database refreshed')

    
  protected _successMsg = this._dbState.successMsg;
  protected _errorMsg = this._dbState.errorMsg;
  protected _loading = this._dbState.loading;

}
