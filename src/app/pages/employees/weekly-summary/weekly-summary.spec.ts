import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JustTipIoSetup } from '../../../data/io';
import { JtEmployeeWeeklySummary } from './weekly-summary';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Subject, BehaviorSubject, of } from 'rxjs';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable() ,
}

//###########################//

describe('JtEmployeeWeeklySummary', () => {
  let component: JtEmployeeWeeklySummary;
  let fixture: ComponentFixture<JtEmployeeWeeklySummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtEmployeeWeeklySummary],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        ...JustTipIoSetup.provideJustTipIo({
          baseUrl: 'http://localhost',
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JtEmployeeWeeklySummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
