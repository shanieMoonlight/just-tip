import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JtHome } from './home';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

//###########################//

const mockActRoute = {
  queryParamMap: of({ get: () => null })
}

//###########################//

describe('Home', () => {
  let component: JtHome;
  let fixture: ComponentFixture<JtHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtHome],
      providers: [
        { provide: ActivatedRoute, useValue: mockActRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JtHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
