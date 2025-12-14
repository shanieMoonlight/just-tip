import { TestBed } from '@angular/core/testing';

import { ShiftDateUtils } from './shift-date-utils';

describe('ShiftDateUtils', () => {
  let service: ShiftDateUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftDateUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
