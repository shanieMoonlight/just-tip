import { EmployeesController } from './employees.controller';
import { JtOutboxMessagesController } from './jtoutboxmessages.controller';
import { MaintenanceController } from './maintenance.controller';
import { RosterController } from './roster.controller';
import { TipsController } from './tips.controller';

export class ServerRoutes {
  
  static readonly BASE_URL = 'https://localhost:1234';
  
  //controllers
    static readonly Employees = EmployeesController;
  static readonly JtOutboxMessages = JtOutboxMessagesController;
  static readonly Maintenance = MaintenanceController;
  static readonly Roster = RosterController;
  static readonly Tips = TipsController;
}