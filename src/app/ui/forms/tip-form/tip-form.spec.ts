import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JtTipForm } from './tip-form';

describe('TipForm', () => {
  let component: JtTipForm;
  let fixture: ComponentFixture<JtTipForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtTipForm],
    }).compileComponents();

    fixture = TestBed.createComponent(JtTipForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
