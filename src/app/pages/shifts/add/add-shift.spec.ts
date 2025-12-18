import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { JustTipIoSetup, EmployeesIoService } from '../../../data/io';
import { JtAddShiftPage } from './add-shift';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { SbToastService } from '@spider-baby/ui-toast';
import { Router } from '@angular/router';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { signal } from '@angular/core';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable() ,
}

//###########################//


describe('AddShift', () => {
  let component: JtAddShiftPage;
  let fixture: ComponentFixture<JtAddShiftPage>;
  let mockIo: any;
  let mockToaster: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockIo = {
      getById: jest.fn().mockReturnValue(of(null)),
      addShift: jest.fn().mockReturnValue(of(null)),
    };

    mockToaster = { success: jest.fn() };
    mockRouter = { navigateByUrl: jest.fn() } as unknown as Router;

    await TestBed.configureTestingModule({
      imports: [JtAddShiftPage],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        ...JustTipIoSetup.provideJustTipIo({
          baseUrl: 'http://localhost',
        }),
        { provide: EmployeesIoService, useValue: mockIo },
        { provide: SbToastService, useValue: mockToaster },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JtAddShiftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads employee when route param id is emitted and exposes employee', () => {
    const sample = { id: 'e1', name: 'Ena' } as any;
    (mockIo.getById as jest.Mock).mockReturnValueOnce(of(sample));

    paramMapSubject.next(convertToParamMap({ [JtAppRouteDefs.EMPLOYEE_ID_PARAM]: 'e1' }));
    fixture.detectChanges();

    const svc = TestBed.inject(EmployeesIoService) as any;
    expect(svc.getById).toHaveBeenCalledWith('e1');
    expect((component as any)._employee()).toEqual(sample);
  });

  it('addShift triggers addShift, shows toast and navigates on success', async () => {
    const shift = { id: 'sh1', employeeId: 'e2' } as any;
    (mockIo.addShift as jest.Mock).mockReturnValueOnce(of(shift));

    // ensure component _employeeId returns expected id used by onSuccess
    (component)._employeeId = signal('e2');
    (component)._successMsg();

    jest.useFakeTimers();
    try {
      (component as any).addShift(shift);
      fixture.detectChanges();

      // fast-forward any scheduled timers so MiniState onSuccess runs
      jest.runAllTimers();
      // allow pending microtasks to complete
      await Promise.resolve();
    } finally {
      jest.useRealTimers();
    }

    expect(mockIo.addShift).toHaveBeenCalledWith(shift);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`/${JtAppRouteDefs.route('employee-shifts')}/e2`);
    expect(mockToaster.success).toHaveBeenCalledWith('Shift added Successfully!');
  });
});
