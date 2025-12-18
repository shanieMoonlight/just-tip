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
        path: `${JtAppRouteDefs.route('add-shift')}/:${JtAppRouteDefs.EMPLOYEE_ID_PARAM}`,
        loadComponent: () => import('./pages/shifts/add/add-shift').then((m) => m.JtAddShiftPage),
        pathMatch: 'full',        
    },
    {
        path: `${JtAppRouteDefs.route('edit-shift')}/:${JtAppRouteDefs.SHIFT_ID_PARAM}`,
        loadComponent: () => import('./pages/shifts/edit/edit-shift').then((m) => m.JtEditShiftPage),
        pathMatch: 'full',        
    },
    {
        path: `${JtAppRouteDefs.route('employee-shifts')}/:${JtAppRouteDefs.EMPLOYEE_ID_PARAM}`,
        loadComponent: () => import('./pages/shifts/list/shift-list').then((m) => m.JtShiftListPage),
        pathMatch: 'full',        
    },
    {
        path: '',
        redirectTo: JtAppRouteDefs.route('home'),
        pathMatch: 'full',
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found').then((m) => m.JtNotFoundPage),
        pathMatch: 'full',
    },
    //   {
    //     path: '',
    //     loadComponent: () => import('./pages/employee-builder').then((m) => m.JtSurveyBuilder),
    //     pathMatch: 'full',
    //   },
];
