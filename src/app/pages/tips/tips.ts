import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MiniStateBuilder } from '@spider-baby/mini-state';
import { MiniStateCombined } from '@spider-baby/mini-state/utils';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { TipsIoService } from '../../data/io';
import { JtUiIconButton } from '../../ui/buttons/icon-button/icon-button';
import { NotificationsModal } from '../../ui/notifications/notifications/notifications.component';
import { JtUiTooltipDirective } from '../../ui/tooltip/tooltip.directive';
import { WeekNumberRouteService } from '../../utils/services/week-number-route/week-number-route-service';
import { JtUiNoDataCard } from '../../ui/cards/no-data-card/no-data-card';

@Component({
  selector: 'jt-tips',
  imports: [
    NotificationsModal,
    SbPortalInputComponent,
    JtUiTooltipDirective,
    JtUiIconButton,
    DatePipe,
    CurrencyPipe,
    JtUiNoDataCard
  ],
  templateUrl: './tips.html',
  styleUrl: './tips.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WeekNumberRouteService],
})
export class JtTipsPage {


  private _tipIoService = inject(TipsIoService);
  private _weekNumberRouteService = inject(WeekNumberRouteService);

  //----------------//


  private _weekNumber$ = this._weekNumberRouteService.weekNumber$;
  protected _weekNumber = this._weekNumberRouteService.weekNumber;

  protected _weekNumberString = this._weekNumberRouteService.weekNumberString

  protected _title = computed(() => `Tips Week: (${this._weekNumberString()})`);


  private _totalTipsState = MiniStateBuilder.CreateWithObservableInput(
    this._weekNumber$,
    (weekNumber: number) => this._tipIoService.getTipsTotalByWeek(weekNumber))

  private _tipsState = MiniStateBuilder.CreateWithObservableInput(
    this._weekNumber$,
    (weekNumber: number) => this._tipIoService.getAllTipsByWeek(weekNumber))


  private _notificationStates = MiniStateCombined.Combine(
    this._totalTipsState,
    this._tipsState
  )


  protected _totalTips = computed(() => this._totalTipsState.data());
  protected _tips = computed(() => this._tipsState.data());
  protected _successMsg = this._notificationStates.successMsg;
  protected _errorMsg = this._notificationStates.errorMsg;
  protected _loading = this._notificationStates.loading;



  previousWeek = () =>
    this._weekNumberRouteService.setWeek(this._weekNumber() - 1);


  nextWeek = () => 
    this._weekNumberRouteService.setWeek(this._weekNumber() + 1);

}
