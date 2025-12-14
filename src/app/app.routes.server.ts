import { RenderMode, ServerRoute } from '@angular/ssr';
import { JtAppRouteDefs } from './app-route-defs';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: `${JtAppRouteDefs.route('employee-weekly-summary')}/:${JtAppRouteDefs.DETAIL_ID_PARAM}`,
    renderMode: RenderMode.Client
  },
  {
    path: `${JtAppRouteDefs.route('employee-detail')}/:${JtAppRouteDefs.DETAIL_ID_PARAM}`,
    renderMode: RenderMode.Client
  },
  {
    path: `${JtAppRouteDefs.route('tips')}/:${JtAppRouteDefs.WEEK_NUM_PARAM}`,
    renderMode: RenderMode.Client
  },
  {
    path: `${JtAppRouteDefs.route('roster')}/:${JtAppRouteDefs.WEEK_NUM_PARAM}`,
    renderMode: RenderMode.Client
  },
];
