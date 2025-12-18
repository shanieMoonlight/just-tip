import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { JtRosterPage } from './roster';
import { RosterIoService } from '../../data/io';
import { WeekNumberRouteService } from '../../utils/services/week-number-route/week-number-route-service';
import { JtAppRouteDefs } from '../../app-route-defs';

describe('JtRosterPage', () => {
  let fixture: ComponentFixture<JtRosterPage>;
  let component: JtRosterPage;

  let mockRosterIo: any;
  let mockRouter: any;
  let mockWeekSvc: any;

  beforeEach(async () => {
    mockRosterIo = { getByWeek: jest.fn().mockReturnValue(of([])) };
    mockRouter = { navigate: jest.fn() };

    // weekNumber$ is used by the MiniStateBuilder; provide a simple observable and
    // signal-like functions for weekNumber/weekNumberString used by the component.
    const weekNumber$ = new BehaviorSubject<number>(0);
    mockWeekSvc = {
      weekNumber$: weekNumber$.asObservable(),
      weekNumber: jest.fn(() => 0),
      weekNumberString: jest.fn(() => 'Current'),
      setWeek: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [JtRosterPage],
      providers: [
        { provide: RosterIoService, useValue: mockRosterIo },
        { provide: Router, useValue: mockRouter },
      ],
    });

    // override the component-level provider so the instance uses our mock
    TestBed.overrideComponent(JtRosterPage as any, {
      set: { providers: [{ provide: WeekNumberRouteService, useValue: mockWeekSvc }] },
    });

    await TestBed.compileComponents();

    fixture = TestBed.createComponent(JtRosterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('computes title for current week', () => {
    (mockWeekSvc.weekNumber as jest.Mock).mockReturnValue(0);
    (mockWeekSvc.weekNumberString as jest.Mock).mockReturnValue('Current');
    expect((component as any)._title()).toBe('Roster Week (Current)');
  });

  it('computes title with plus for positive week', () => {
    (mockWeekSvc.weekNumber as jest.Mock).mockReturnValue(3);
    (mockWeekSvc.weekNumberString as jest.Mock).mockReturnValue('3');
    expect((component as any)._title()).toBe('Roster Week (+3)');
  });

  it('previousWeek calls setWeek with minus one', () => {
    (mockWeekSvc.weekNumber as jest.Mock).mockReturnValue(4);
    component.previousWeek();
    expect(mockWeekSvc.setWeek).toHaveBeenCalledWith(3);
  });

  it('nextWeek calls setWeek with plus one', () => {
    (mockWeekSvc.weekNumber as jest.Mock).mockReturnValue(4);
    component.nextWeek();
    expect(mockWeekSvc.setWeek).toHaveBeenCalledWith(5);
  });

  it('does not navigate for past shift', () => {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const shift = { shiftId: 's1', startTime: yesterday } as any;
    component.onShiftSelected(shift);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('navigates to edit when shift is in future', () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    const shift = { shiftId: 'shift-123', startTime: tomorrow } as any;
    component.onShiftSelected(shift);
    expect(mockRouter.navigate).toHaveBeenCalledWith([
      `/${JtAppRouteDefs.route('edit-shift')}/${shift.shiftId}`,
    ]);
  });
});