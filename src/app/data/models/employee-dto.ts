import { ShiftDto } from './shift-dto';

export interface EmployeeDto {
  id?: string;
  name?: string;
  description?: string;
  shifts?: ShiftDto[];
}
