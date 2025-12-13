import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { JtUiButtonComponent } from './button.component';

describe('JtUiButtonComponent', () => {
  let fixture: ComponentFixture<JtUiButtonComponent>;
  let component: JtUiButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtUiButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JtUiButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders defaults: type=button, not disabled, primary color class present', () => {
    const btnDe = fixture.debugElement.query(By.css('button.jt-btn'));
    expect(btnDe).toBeTruthy();
    const btn: HTMLButtonElement = btnDe.nativeElement;

    expect(btn.getAttribute('type')).toBe('button');
    expect(btn.disabled).toBe(false);
    expect(btn.classList.contains('primary')).toBeTruthy();
  });

  it('applies inputs when set via componentRef.setInput', () => {
    fixture.componentRef.setInput('color', 'secondary');
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.debugElement.query(By.css('button.jt-btn')).nativeElement;
    expect(btn.getAttribute('type')).toBe('submit');
    expect(btn.disabled).toBe(true);
    expect(btn.classList.contains('secondary')).toBeTruthy();
  });
});
