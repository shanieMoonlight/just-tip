import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { EmployeesIoService } from '../../../data/io';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { JtShiftListPage } from './shift-list';
import { JustTipIoSetup } from '../../../data/io';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable() ,
}

//###########################//

describe('ShiftList', () => {
  let component: JtShiftListPage;
  let fixture: ComponentFixture<JtShiftListPage>;
  let mockIoService: any;

  beforeEach(async () => {
    mockIoService = {
      getById: jest.fn().mockReturnValue(of(null)),
      getUpcomingShifts: jest.fn().mockReturnValue(of([])),
      removeShift: jest.fn().mockReturnValue(of({ id: null })),
    };

    await TestBed.configureTestingModule({
      imports: [JtShiftListPage],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        ...JustTipIoSetup.provideJustTipIo({
          baseUrl: 'http://localhost',
        }),
        { provide: EmployeesIoService, useValue: mockIoService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JtShiftListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  //----------------//

  it('calls getById and getUpcomingShifts when route param id is emitted and exposes data', () => {
    const sampleEmployee = { id: 'e1', name: 'Alice' } as any;
    const shifts = [{ shiftId: 's1', startTime: new Date().toISOString(), employeeId: 'e1' } as any];
    (mockIoService.getById as jest.Mock).mockReturnValueOnce(of(sampleEmployee));
    (mockIoService.getUpcomingShifts as jest.Mock).mockReturnValueOnce(of(shifts));

    // emit employee id
    paramMapSubject.next(convertToParamMap({ [JtAppRouteDefs.EMPLOYEE_ID_PARAM]: 'e1' }));
    fixture.detectChanges();

    const svc = TestBed.inject(EmployeesIoService) as any;
    expect(svc.getById).toHaveBeenCalledWith('e1');
    expect(svc.getUpcomingShifts).toHaveBeenCalledWith('e1');

    expect((component as any)._employee()).toEqual(sampleEmployee);
    expect((component as any)._shifts()).toEqual(shifts);
  });

  
  //----------------//

  it('deleteShift calls removeShift and updates shifts list', () => {
    const shift = { id: 11, shiftId: 'del-1', employeeId: 'e1' } as any;
    // initial list contains the shift
    (mockIoService.getUpcomingShifts as jest.Mock).mockReturnValueOnce(of([shift]));
    (mockIoService.getById as jest.Mock).mockReturnValueOnce(of({ id: 'e1', name: 'Bob' }));
    (mockIoService.removeShift as jest.Mock).mockReturnValueOnce(of({ id: shift.shiftId }));

    paramMapSubject.next(convertToParamMap({ [JtAppRouteDefs.EMPLOYEE_ID_PARAM]: 'e1' }));
    fixture.detectChanges();

    // ensure initial state has the shift
    expect((component as any)._shifts()).toEqual([shift]);

    // request delete
    (component as any).deleteShift(shift);
    fixture.detectChanges();

    expect(mockIoService.removeShift).toHaveBeenCalledWith(shift.employeeId, shift.shiftId);
    // after deletion, shifts signal should not contain the removed shift
    expect((component as any)._shifts()).toEqual([]);
  });
});
