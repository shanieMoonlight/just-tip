

const CONTROLLER = 'Maintenance';


  type ACTIONS =
  | 'initializeDb'


  //#################################################//


  export class MaintenanceController {
  
    public static readonly Controller = CONTROLLER;

  
    static action = (action: ACTIONS): string => action

  }
