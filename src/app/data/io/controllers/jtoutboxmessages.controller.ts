

const CONTROLLER = 'JtOutboxMessages';


  type ACTIONS =
  | 'delete'
  | 'getAll'
  | 'get'


  //#################################################//


  export class JtOutboxMessagesController {
  
    public static readonly Controller = CONTROLLER;

  
    static action = (action: ACTIONS): string => action

  }
