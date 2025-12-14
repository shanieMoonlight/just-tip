

const CONTROLLER = 'Employees';


  type ACTIONS =
  | 'add'
  | 'edit'
  | 'delete'
  | 'getAll'
  | 'get'
  | 'getAllByName'
  | 'addShift'
  | 'removeShift'
  | 'getEmployeeWeeklySummary'
  | 'getEmployeeWeeklySummaryByWeek'
  | 'getUpcomingShifts'


  //#################################################//


  export class EmployeesController {
  
    public static readonly Controller = CONTROLLER;

  
    static action = (action: ACTIONS): string => action

  }
