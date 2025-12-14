import { EmployeeDto } from "./employee-dto";

export interface ShiftDto {
  id?: string;
  startTimeUtc?: Date;
  endTimeUtc?: Date;
  date?: Date;
  employeeId?: string;
}
export interface ShiftWithEmployeeDto {
  id?: string;
  startTimeUtc?: Date;
  endTimeUtc?: Date;
  date?: Date;
  employeeId?: string;
  employee?: EmployeeDto;
}

export interface ShiftRemovedResult {
  id: string;
}