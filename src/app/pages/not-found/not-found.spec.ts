import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JtNotFoundPage } from './not-found';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ParamMap, convertToParamMap, ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { JustTipIoSetup } from '../../data/io';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable() ,
}

//###########################//

describe('JtNotFoundPage', () => {
  let component: JtNotFoundPage;
  let fixture: ComponentFixture<JtNotFoundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtNotFoundPage],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: mockActRoute },
        ...JustTipIoSetup.provideJustTipIo({
          baseUrl: 'http://localhost',
        }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JtNotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
