import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JtAppRouteDefs } from '../../app-route-defs';
import { JtUiRouteCard } from '../../ui/cards/route-card/route-card';
import { SbPortalInputComponent } from '@spider-baby/utils-portal';
import { JtTipForm } from '../../ui/forms/tip-form/tip-form';
import { JtTipEntry } from '../../smart-ui/tip-entry/tip-entry';
import { JtTipEntryModal } from '../../ui/forms/tip-form/tip-entry-modal';

//######################################//

interface RouteCardConfig {
  title: string;
  route: string;
  icon: string;
}

const ROUTE_CARDS: RouteCardConfig[] = [
  {
    title: 'Employee List',
    route: `/${JtAppRouteDefs.route('employees')}`,
    icon: 'diversity_3'
  },
  {
    title: 'Roster',
    route: `/${JtAppRouteDefs.route('roster')}`,
    icon: 'calendar_month'
  },
  {
    title: 'Tips Overview',
    route: `/${JtAppRouteDefs.route('tips')}`,
    icon: 'paid'
  }
];

//######################################//

@Component({
  selector: 'jt-home',
  imports: [
    JtUiRouteCard,
    SbPortalInputComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JtHome {

  _title = signal('Just Tip');



  protected _routeCards = ROUTE_CARDS;
}
