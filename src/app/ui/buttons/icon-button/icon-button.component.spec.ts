import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { JtUiIconButton } from './icon-button';

describe('JtUiIconButton', () => {
  let fixture: ComponentFixture<JtUiIconButton>;
  let component: JtUiIconButton;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtUiIconButton],
    }).compileComponents();

    fixture = TestBed.createComponent(JtUiIconButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders icon content and default attributes', () => {
    // default iconName is undefined -> content empty
    const btnDe = fixture.debugElement.query(By.css('button.jt-icon-btn'));
    expect(btnDe).toBeTruthy();
    const iconEl = btnDe.query(By.css('jt-ui-icon i'))?.nativeElement as HTMLElement | null;
    // when no icon provided, content may be empty but element exists
    expect(iconEl).toBeTruthy();
    const btn: HTMLButtonElement = btnDe.nativeElement;
    expect(btn.getAttribute('type')).toBe('button');
    expect(btn.disabled).toBe(false);
    expect(btn.classList.contains('primary')).toBeFalsy();
    expect(btn.classList.contains('secondary')).toBeFalsy();
    expect(btn.classList.contains('tertiary')).toBeFalsy();
    expect(btn.classList.contains('error')).toBeFalsy();
  });

  it('applies inputs via componentRef.setInput and renders icon name', () => {
    fixture.componentRef.setInput('iconName', 'check');
    fixture.componentRef.setInput('theme', 'secondary');
    fixture.componentRef.setInput('disabled', true);
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();

    const btnDe = fixture.debugElement.query(By.css('button.jt-icon-btn'));
    const btn: HTMLButtonElement = btnDe.nativeElement;
    expect(btn.getAttribute('type')).toBe('submit');
    expect(btn.disabled).toBe(true);
    expect(btn.classList.contains('secondary')).toBeTruthy();

    const iconText = btnDe.query(By.css('jt-ui-icon i'))?.nativeElement.textContent?.trim();
    expect(iconText).toBe('check');
  });

  
});
