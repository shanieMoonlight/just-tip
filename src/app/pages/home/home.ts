import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JtAppRouteDefs } from '../../app-route-defs';
import { JtUiRouteCard } from '../../ui/cards/route-card/route-card';

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
    JtUiRouteCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JtHome {




  protected _routeCards = ROUTE_CARDS;
}
