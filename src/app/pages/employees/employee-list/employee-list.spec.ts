import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { JustTipIoSetup, EmployeesIoService } from '../../../data/io';
import { JtEmployeeListPage } from './employee-list';
import { Router } from '@angular/router';
import { JtAppRouteDefs } from '../../../app-route-defs';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable() ,
}

//###########################//

describe('EmployeeList', () => {
  let component: JtEmployeeListPage;
  let fixture: ComponentFixture<JtEmployeeListPage>;
  let mockIo: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockIo = { getAll: jest.fn().mockReturnValue(of([])) };
    mockRouter = { navigateByUrl: jest.fn() } as unknown as Router;

    await TestBed.configureTestingModule({
      imports: [JtEmployeeListPage],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        ...JustTipIoSetup.provideJustTipIo({
          baseUrl: 'http://localhost',
        }),
        { provide: EmployeesIoService, useValue: mockIo },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JtEmployeeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has default title and shiftList route', () => {
    expect((component as any)._title()).toBe('Employee List');
    expect((component as any)._shiftListRoute()).toBe(`/${JtAppRouteDefs.route('employee-shifts')}`);
  });

  it('calls getAll and exposes employees', () => {
    const list = [{ id: 'a', name: 'A' }, { id: 'b', name: 'B' }];
    (mockIo.getAll as jest.Mock).mockReturnValueOnce(of(list));

    // recreate component to pick up new mock return
    fixture = TestBed.createComponent(JtEmployeeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(mockIo.getAll).toHaveBeenCalled();
    expect((component as any)._data()).toEqual(list);
  });

  it('navigates to employee details', () => {
    (component as any).goToEmlployeeDetails('emp-1');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`/${JtAppRouteDefs.route('employee-weekly-summary')}/emp-1`);
  });
});
