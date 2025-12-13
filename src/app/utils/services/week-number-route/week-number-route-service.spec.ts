import { TestBed } from '@angular/core/testing';

import { WeekNumberRouteService } from './week-number-route-service';

describe('WeekNumberRouteService', () => {
  let service: WeekNumberRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekNumberRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
