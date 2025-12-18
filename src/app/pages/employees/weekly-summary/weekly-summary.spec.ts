import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustTipIoSetup, EmployeesIoService } from '../../../data/io';
import { JtEmployeeWeeklySummary } from './weekly-summary';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { WeekNumberRouteService } from '../../../utils/services/week-number-route/week-number-route-service';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { EmployeeWeeklySummaryDto } from '../../../data/models/employee-weekly-summary-dto';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable(),
}

//###########################//

describe('JtEmployeeWeeklySummary', () => {
  let component: JtEmployeeWeeklySummary;
  let fixture: ComponentFixture<JtEmployeeWeeklySummary>;

  let mockIo: any;
  let weekNumberSubject: BehaviorSubject<number>;
  let mockWeekSvc: any;

  beforeEach(async () => {
    mockIo = {
      getEmployeeWeeklySummaryById: jest.fn().mockReturnValue(of(null)),
    } as unknown as EmployeesIoService;

    weekNumberSubject = new BehaviorSubject<number>(0);
    mockWeekSvc = {
      weekNumber$: weekNumberSubject.asObservable(),
      weekNumber: jest.fn(() => 0),
      weekNumberString: jest.fn(() => 'Current'),
      setWeek: jest.fn(),
    } as any as WeekNumberRouteService;

    await TestBed.configureTestingModule({
      imports: [JtEmployeeWeeklySummary],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        { provide: EmployeesIoService, useValue: mockIo },
        ...JustTipIoSetup.provideJustTipIo({
          baseUrl: 'http://localhost',
        }),
      ]
    }).compileComponents();

    TestBed.overrideComponent(JtEmployeeWeeklySummary as any, {
      set: { providers: [{ provide: WeekNumberRouteService, useValue: mockWeekSvc }] }
    });

    fixture = TestBed.createComponent(JtEmployeeWeeklySummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //----------------//

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //----------------//

  it('computes title from weekNumberString', () => {
    (mockWeekSvc.weekNumberString as jest.Mock).mockReturnValue('Current');
    expect((component as any)._title()).toBe('Summary Week (Current)');
  });

  //----------------//

  it('calls getEmployeeWeeklySummaryById when id and week change and exposes summary', async () => {
    const sample = {
      employeeId: 'e1',
      total: 100,
      hoursWorked: 5,
      tipShare: 10,
      rangeStartDate: '2024-01-01',
      rangeEndDate: '2024-01-07',
    } as EmployeeWeeklySummaryDto;
    // ensure timers are controlled before MiniState schedules macrotasks
    jest.useFakeTimers();
    try {
      // spy implementation logs and returns the sample observable
      (mockIo.getEmployeeWeeklySummaryById as jest.Mock).mockImplementation((id: string, week: number) => {
        console.log('getEmployeeWeeklySummaryById spy', id, week);
        return of(sample);
      });

      // emit id param and week
      paramMapSubject.next(convertToParamMap({ [JtAppRouteDefs.DETAIL_ID_PARAM]: 'e1' }));
      weekNumberSubject.next(5);
      fixture.detectChanges();

      // run any timers scheduled by MiniState internals and drain microtasks
      jest.runAllTimers();
      await Promise.resolve();
    } finally {
      jest.useRealTimers();
    }

    expect(mockIo.getEmployeeWeeklySummaryById).toHaveBeenCalledWith('e1', 5);
    expect(component._summary()).toEqual(sample);
  });

  //----------------//

  it('addShiftRoute contains the current id and previous/next call setWeek', () => {
    (component as any)._id = () => 'emp-9';
    expect((component as any)._addShiftRoute()).toBe(`/${JtAppRouteDefs.route('add-shift')}/emp-9`);

    (mockWeekSvc.weekNumber as jest.Mock).mockReturnValue(2);
    component.previousWeek();
    expect(mockWeekSvc.setWeek).toHaveBeenCalledWith(1);

    component.nextWeek();
    expect(mockWeekSvc.setWeek).toHaveBeenCalledWith(3);
  });
});
