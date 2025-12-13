import { Route } from '@angular/router';
import { JtAppRouteDefs } from './app-route-defs';

export const appRoutes: Route[] = [
    {
        path: JtAppRouteDefs.route('home'),
        loadComponent: () => import('./pages/home/home').then((m) => m.JtHome),
        pathMatch: 'full',
    },
    {
        path: `${JtAppRouteDefs.route('roster')}/:${JtAppRouteDefs.WEEK_NUM_PARAM}`,
        loadComponent: () => import('./pages/roster/roster').then((m) => m.JtRosterPage),
        pathMatch: 'full',
    },
    {
        path: JtAppRouteDefs.route('roster'),
        loadComponent: () => import('./pages/roster/roster').then((m) => m.JtRosterPage),
        pathMatch: 'full',
    },
    {
        path: JtAppRouteDefs.route('employees'),
        loadComponent: () => import('./pages/employees/employee-list/employee-list').then((m) => m.JtEmployeeListPage),
        pathMatch: 'full',
    },
    {
        path: `${JtAppRouteDefs.route('employee-detail')}/:${JtAppRouteDefs.DETAIL_ID_PARAM}`,
        loadComponent: () => import('./pages/employees/employee-detail/employee-detail').then((m) => m.JtEmployeeDetailPage),
        pathMatch: 'full',        
    },
    {
        path: `${JtAppRouteDefs.route('employee-detail')}`,
        loadComponent: () => import('./pages/employees/employee-detail/employee-detail').then((m) => m.JtEmployeeDetailPage),
        pathMatch: 'full',
    },
    {
        path: `${JtAppRouteDefs.route('employee-weekly-summary')}/:${JtAppRouteDefs.DETAIL_ID_PARAM}/:${JtAppRouteDefs.WEEK_NUM_PARAM}`,
        loadComponent: () => import('./pages/employees/weekly-summary/weekly-summary').then((m) => m.JtEmployeeWeeklySummary),
        pathMatch: 'full',        
    },
    {
        path: `${JtAppRouteDefs.route('employee-weekly-summary')}/:${JtAppRouteDefs.DETAIL_ID_PARAM}`,
        loadComponent: () => import('./pages/employees/weekly-summary/weekly-summary').then((m) => m.JtEmployeeWeeklySummary),
        pathMatch: 'full',        
    },
    {
        path: `${JtAppRouteDefs.route('employee-weekly-summary')}`,
        loadComponent: () => import('./pages/employees/weekly-summary/weekly-summary').then((m) => m.JtEmployeeWeeklySummary),
        pathMatch: 'full',
    },
    {
        path: `${JtAppRouteDefs.route('tips')}/:${JtAppRouteDefs.WEEK_NUM_PARAM}`,
        loadComponent: () => import('./pages/tips/tips').then((m) => m.JtTipsPage),
        pathMatch: 'full',
    },
    {
        path: `${JtAppRouteDefs.route('tips')}`,
        loadComponent: () => import('./pages/tips/tips').then((m) => m.JtTipsPage),
        pathMatch: 'full',
    },
    {
        path: '',
        redirectTo: JtAppRouteDefs.route('home'),
        pathMatch: 'full',
    },
    //   {
    //     path: '',
    //     loadComponent: () => import('./pages/employee-builder').then((m) => m.JtSurveyBuilder),
    //     pathMatch: 'full',
    //   },
];
