import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { JustTipIoSetup, RosterIoService } from '../../../data/io';
import { Router } from '@angular/router';
import { JtEditShiftPage } from './edit-shift';
import { SbToastService } from '@spider-baby/ui-toast';
import { JtAppRouteDefs } from '../../../app-route-defs';
import { signal } from '@angular/core';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable() ,
}

//###########################//

describe('EditShift', () => {
  let component: JtEditShiftPage;
  let fixture: ComponentFixture<JtEditShiftPage>;
  let mockRosterIo: any;
  let mockToaster: Partial<Record<keyof SbToastService, jest.Mock>>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRosterIo = {
      getByShiftId: jest.fn().mockReturnValue(of(null)),
      editShift: jest.fn().mockReturnValue(of(null)),
    };

    mockToaster = {
      success: jest.fn(),
    } as any;
    
    mockRouter = { navigateByUrl: jest.fn() } as unknown as Router;

    await TestBed.configureTestingModule({
      imports: [JtEditShiftPage],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        ...JustTipIoSetup.provideJustTipIo({
          baseUrl: 'http://localhost',
        }),
        { provide: RosterIoService, useValue: mockRosterIo },
        { provide: SbToastService, useValue: mockToaster },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JtEditShiftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  //----------------//

  it('loads shift when route param id is emitted and exposes shift', () => {
    const sample = { id: 's1', employee: { id: 'e1', name: 'Sam' } } as any;
    (mockRosterIo.getByShiftId as jest.Mock).mockReturnValueOnce(of(sample));

    paramMapSubject.next(convertToParamMap({ [JtAppRouteDefs.SHIFT_ID_PARAM]: 's1' }));
    fixture.detectChanges();

    const svc = TestBed.inject(RosterIoService) as any;
    expect(svc.getByShiftId).toHaveBeenCalledWith('s1');

    expect((component as any)._shift()).toEqual(sample);
    expect((component as any)._employee()?.id).toBe('e1');
  });
  
  //----------------//

  it('editShift triggers editShift, shows toast and navigates on success', async () => {
    const sample = { id: 's2', employee: { id: 'e2', name: 'Taylor' } } as any;
    (mockRosterIo.editShift as jest.Mock).mockReturnValueOnce(of(sample));

    // ensure the component's _shift accessor returns the sample (used by onSuccess)
    (component as any)._shift = signal(sample);
    // read success signal to force MiniState subscriptions
    (component as any)._successMsg();

    jest.useFakeTimers();
    try {
      // call the edit handler
      (component as any).editShift(sample);
      fixture.detectChanges();

      // fast-forward any scheduled timers so MiniState onSuccess runs
      jest.runAllTimers();
      // allow pending microtasks to complete
      await Promise.resolve();
    } finally {
      jest.useRealTimers();
    }

    expect(mockRosterIo.editShift).toHaveBeenCalledWith(sample.id, sample);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith(`/${JtAppRouteDefs.route('employee-shifts')}/${sample.employee.id}`);
    expect(mockToaster.success).toHaveBeenCalledWith('Shift Updated!');
  });
});
