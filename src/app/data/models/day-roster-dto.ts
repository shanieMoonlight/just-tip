import { ShiftRosterItemDto } from './shift-roster-item-dto';

export interface DayRosterDto {
  date?: Date;
  shifts?: ShiftRosterItemDto[];
}
