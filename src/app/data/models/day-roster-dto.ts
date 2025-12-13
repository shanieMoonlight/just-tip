import { ShiftRosterItemDto } from './shift-roster-item-dto';

export interface DayRosterDto {
  date?: string;
  shifts?: ShiftRosterItemDto[];
}
