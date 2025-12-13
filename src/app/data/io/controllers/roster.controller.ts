

const CONTROLLER = 'Roster';


  type ACTIONS =
  | 'current-week'
  | 'upcoming-week'


  //#################################################//


  export class RosterController {
  
    public static readonly Controller = CONTROLLER;

  
    static action = (action: ACTIONS): string => action

  }
