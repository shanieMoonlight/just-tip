import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JtUiShiftForm } from './shift-form';

describe('ShiftForm', () => {
  let component: JtUiShiftForm;
  let fixture: ComponentFixture<JtUiShiftForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtUiShiftForm],
    }).compileComponents();

    fixture = TestBed.createComponent(JtUiShiftForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
