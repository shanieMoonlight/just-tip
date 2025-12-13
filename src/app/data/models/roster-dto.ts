import { DayRosterDto } from './day-roster-dto';

export interface RosterDto {
  rangeStart?: string;
  rangeEnd?: string;
  days?: DayRosterDto[];
}
