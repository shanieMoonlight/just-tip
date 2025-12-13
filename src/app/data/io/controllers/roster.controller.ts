

const CONTROLLER = 'Roster';


  type ACTIONS =
  | 'currentWeek'
  | 'upcomingWeek'


  //#################################################//


  export class RosterController {
  
    public static readonly Controller = CONTROLLER;

  
    static action = (action: ACTIONS): string => action

  }
