

const CONTROLLER = 'Tips';


  type ACTIONS =
  | 'add'
  | 'edit'
  | 'delete'
  | 'getAll'
  | 'get'
  | 'getTotalTipsCurrentWeek'
  | 'getAllTipsByWeek'
  | 'getTotalTipsByWeek'


  //#################################################//


  export class TipsController {
  
    public static readonly Controller = CONTROLLER;

  
    static action = (action: ACTIONS): string => action

  }
