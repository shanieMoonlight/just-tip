import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { WeekNumberRouteService } from './week-number-route-service';

describe('WeekNumberRouteService', () => {
  let service: WeekNumberRouteService;
  let paramMapSubject: BehaviorSubject<ParamMap>;
  let mockActRoute: any;
  let mockRouter: any;

  beforeEach(() => {
    paramMapSubject = new BehaviorSubject(convertToParamMap({}));

    mockActRoute = {
      paramMap: paramMapSubject.asObservable(),
      snapshot: { paramMap: { has: jest.fn().mockReturnValue(false) } },
    } as any as ActivatedRoute;

    mockRouter = { navigate: jest.fn() } as unknown as Router;

    TestBed.configureTestingModule({
      providers: [
        WeekNumberRouteService,
        { provide: ActivatedRoute, useValue: mockActRoute },
        { provide: Router, useValue: mockRouter },
      ],
    });

    service = TestBed.inject(WeekNumberRouteService);
  });

  //----------------//
  
  it('defaults to 0 and "Current" when no param is present', () => {
    expect(service.weekNumber()).toBe(0);
    expect(service.weekNumberString()).toBe('Current');
  });

  //----------------//
  

  it('parses numeric week from route param and updates signals', () => {
    paramMapSubject.next(convertToParamMap({ [JtAppRouteDefs.WEEK_NUM_PARAM]: '3' }));
    expect(service.weekNumber()).toBe(3);
    expect(service.weekNumberString()).toBe('3');
  });

  //----------------//
  

  it('navigates to ["..", week] when snapshot has the param', () => {
    mockActRoute.snapshot.paramMap.has.mockReturnValue(true);
    service.setWeek(5);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['..', '5'], {
      relativeTo: mockActRoute,
      replaceUrl: true,
    });
  });

  it('navigates to [week] when snapshot does not have the param', () => {
    mockActRoute.snapshot.paramMap.has.mockReturnValue(false);
    service.setWeek('7');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['7'], {
      relativeTo: mockActRoute,
      replaceUrl: true,
    });
  });
});

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { JustTipIoSetup } from '../../../data/io';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable() ,
}

//###########################//


describe('WeekNumberRouteService', () => {
  let service: WeekNumberRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        ...JustTipIoSetup.provideJustTipIo({ baseUrl: 'http://localhost' }),
      ]
    });
    service = TestBed.inject(WeekNumberRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
