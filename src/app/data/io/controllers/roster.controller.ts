

const CONTROLLER = 'Roster';


  type ACTIONS =
  | 'getCurrentWeek'
  | 'getUpcomingWeek'
  | 'getByWeek'


  //#################################################//


  export class RosterController {
  
    public static readonly Controller = CONTROLLER;

  
    static action = (action: ACTIONS): string => action

  }
