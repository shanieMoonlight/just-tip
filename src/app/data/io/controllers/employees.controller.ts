

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


  //#################################################//


  export class EmployeesController {
  
    public static readonly Controller = CONTROLLER;

  
    static action = (action: ACTIONS): string => action

  }
