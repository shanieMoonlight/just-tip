import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { JtTipsPage } from './tips';
import { JustTipIoSetup, TipsIoService } from '../../data/io';
import { WeekNumberRouteService } from '../../utils/services/week-number-route/week-number-route-service';
//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable() ,
}

//###########################//


describe('Tips', () => {
  let component: JtTipsPage;
  let fixture: ComponentFixture<JtTipsPage>;
  let mockTipsIo: any;
  let weekNumberSubject: BehaviorSubject<number>;
  let mockWeekSvc: any;

  beforeEach(async () => {
    mockTipsIo = {
      getTipsTotalByWeek: jest.fn().mockReturnValue(of(123)),
      getAllTipsByWeek: jest.fn().mockReturnValue(of([{ id: 't1', amount: 10 }]))
    } as unknown as TipsIoService;

    weekNumberSubject = new BehaviorSubject<number>(0);
    mockWeekSvc = {
      weekNumber$: weekNumberSubject.asObservable(),
      weekNumber: jest.fn(() => 0),
      weekNumberString: jest.fn(() => 'Current'),
      setWeek: jest.fn(),
    } as any as WeekNumberRouteService;

    await TestBed.configureTestingModule({
      imports: [JtTipsPage],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        { provide: TipsIoService, useValue: mockTipsIo },
        ...JustTipIoSetup.provideJustTipIo({
          baseUrl: 'http://localhost',
        }),
      ]
    }).compileComponents();

    // override the component provider so it uses our mock week service
    TestBed.overrideComponent(JtTipsPage as any, {
      set: { providers: [{ provide: WeekNumberRouteService, useValue: mockWeekSvc }] }
    });

    fixture = TestBed.createComponent(JtTipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  //----------------//

  it('computes title from weekNumberString', () => {
    (mockWeekSvc.weekNumberString as jest.Mock).mockReturnValue('Current');
    expect((component as any)._title()).toBe('Tips Week: (Current)');
  });
  
  //----------------//

  it('calls IO services when weekNumber$ emits and exposes data', () => {
    const total = 555;
    const tips = [{ id: 'a', amount: 5 }];
    (mockTipsIo.getTipsTotalByWeek as jest.Mock).mockReturnValueOnce(of(total));
    (mockTipsIo.getAllTipsByWeek as jest.Mock).mockReturnValueOnce(of(tips));

    weekNumberSubject.next(3);
    fixture.detectChanges();

    expect(mockTipsIo.getTipsTotalByWeek).toHaveBeenCalledWith(3);
    expect(mockTipsIo.getAllTipsByWeek).toHaveBeenCalledWith(3);
    expect((component as any)._totalTips()).toBe(total);
    expect((component as any)._tips()).toEqual(tips);
  });
  
  //----------------//

  it('previousWeek and nextWeek call setWeek accordingly', () => {
    (mockWeekSvc.weekNumber as jest.Mock).mockReturnValue(4);
    component.previousWeek();
    expect(mockWeekSvc.setWeek).toHaveBeenCalledWith(3);

    component.nextWeek();
    expect(mockWeekSvc.setWeek).toHaveBeenCalledWith(5);
  });
});
