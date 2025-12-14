import { TestBed } from '@angular/core/testing';

import { WeekNumberRouteService } from './week-number-route-service';
import { ParamMap, convertToParamMap, ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
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
