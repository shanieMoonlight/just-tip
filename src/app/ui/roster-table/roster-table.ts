import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';
import { RosterDto, ShiftRosterItemDto } from '../../data/models';
import { JtUiIcon } from '../icon/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'jt-ui-roster-table',
  imports: [
    JtUiIcon,
    DatePipe
  ],
  templateUrl: './roster-table.html',
  styleUrl: './roster-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JtUiRosterTable {


  roster = input.required<RosterDto>({});
  selectedShiftItem = output<ShiftRosterItemDto>({});

  rosterDays = computed(() => this.roster()?.days ?? []);

  employees = computed(() => {
    const days = this.rosterDays();
    const map = new Map<string, { employeeId?: string; employeeName?: string }>();
    for (const d of days) {
      for (const s of d.shifts ?? []) {
        const key = s.employeeId ?? s.employeeName ?? JSON.stringify(s);
        if (!map.has(key)) {
          map.set(key, { employeeId: s.employeeId, employeeName: s.employeeName });
        }
      }
    }
    return Array.from(map.values());
  });

  // helper method used by the template to get shifts for an employee on a specific date
  //Could prpbably be optimized further, by presetting but ok for now
  getShifts(employeeId?: string, date?: string): ShiftRosterItemDto[] {
    const days = this.rosterDays();
    const day = (days ?? []).find(d => d.date === date);
    if (!day)
      return [] as ShiftRosterItemDto[];
    return (day.shifts ?? []).filter(s => (s.employeeId ?? s.employeeName) === (employeeId ?? s.employeeName ?? ''));
  }

  edit = (shift: ShiftRosterItemDto) =>
    this.selectedShiftItem.emit(shift);
}
