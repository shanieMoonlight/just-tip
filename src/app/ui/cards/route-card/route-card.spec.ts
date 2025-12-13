import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { JtUiRouteCard } from './route-card';

//###########################//

const paramMapSubject: Subject<ParamMap> = new BehaviorSubject<ParamMap>(convertToParamMap({}));
const mockActRoute = {
  queryParamMap: of({ get: () => null }),
  paramMap: paramMapSubject.asObservable(),
}


//###########################//

describe('JtUiRouteCard', () => {
  let component: JtUiRouteCard;
  let fixture: ComponentFixture<JtUiRouteCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtUiRouteCard],
      providers: [
        { provide: ActivatedRoute, useValue: mockActRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JtUiRouteCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Test Title');
    fixture.componentRef.setInput('route', '/test-route');
    fixture.componentRef.setInput('icon', 'face');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
