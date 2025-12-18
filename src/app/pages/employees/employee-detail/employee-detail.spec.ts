import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, of, Subject, throwError } from 'rxjs';
import { EmployeesIoService, JustTipIoSetup } from '../../../data/io';
import { JtEmployeeDetailPage } from './employee-detail';
import { JtAppRouteDefs } from '../../../app-route-defs';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable() ,
}

//###########################//

describe('JtEmployeeDetailPage', () => {
  let component: JtEmployeeDetailPage;
  let fixture: ComponentFixture<JtEmployeeDetailPage>;
  let mockIoService: Partial<Record<keyof EmployeesIoService, jest.Mock>> & { getById?: jest.Mock; edit?: jest.Mock };

  beforeEach(async () => {

    mockIoService = {
      getById: jest.fn().mockReturnValue(of(null)),
      edit: jest.fn().mockReturnValue(of(null)),
    };

    await TestBed.configureTestingModule({
      imports: [JtEmployeeDetailPage],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        ...JustTipIoSetup.provideJustTipIo({
          baseUrl: 'http://localhost',
        }),
        // override the real IO service with our jest mock so spies work
        { provide: EmployeesIoService, useValue: mockIoService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JtEmployeeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  
  it('calls getById when route param id is emitted and exposes employee', () => {
    const sample = { id: 'abc', title: 'My Survey' } as any;
    (mockIoService.getById as jest.Mock).mockReturnValueOnce(of(sample));

    // emit a paramMap with the expected id key
    paramMapSubject.next(convertToParamMap({ [JtAppRouteDefs.DETAIL_ID_PARAM]: 'abc' }));
    fixture.detectChanges();

    const svc = TestBed.inject(EmployeesIoService) as any;
    expect(svc.getById).toHaveBeenCalledWith('abc');

    // the component exposes _employee as a signal; read it from the instance
    const employee = (component as any)._employee();
    expect(employee).toEqual(sample);
  });
  
  it('set _errorMsg when getById returns an error', () => {
    // make the IO service emit an error for this call
    (mockIoService.getById as jest.Mock).mockReturnValueOnce(
      throwError(() => new Error('getById failed'))
    );

    // emit a paramMap with the expected id key
    paramMapSubject.next(convertToParamMap({ [JtAppRouteDefs.DETAIL_ID_PARAM]: 'abc' }));
    fixture.detectChanges();

    const svc = TestBed.inject(EmployeesIoService) as any;
    expect(svc.getById).toHaveBeenCalledWith('abc');

    // on error the employee signal should remain empty and an error message should be set
    const employee = (component as any)._employee();
    expect(employee).toBeNull();

    const err = (component as any)._errorMsg();
    expect(err).toBeTruthy();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
