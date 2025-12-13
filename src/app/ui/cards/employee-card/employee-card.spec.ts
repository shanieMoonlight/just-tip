import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { JtUiEmployeeCard } from './employee-card';
import { hostHasThemeClass } from '../../../../testing/theme-assert';

describe('JtUiEmployeeCard', () => {
  let fixture: ComponentFixture<JtUiEmployeeCard>;
  let component: JtUiEmployeeCard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtUiEmployeeCard, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(JtUiEmployeeCard);
    component = fixture.componentInstance;
  });

  it('renders employee details and computed route', () => {
    const employee = {
      id: '42',
      name: 'Test Employee',
      description: 'A sample description',
    };

    // set inputs like Angular would
    fixture.componentRef.setInput('employee', employee);
    fixture.componentRef.setInput('theme', 'primary');
    fixture.detectChanges();

    const anchor = fixture.debugElement.query(By.css('a.employee-card'));
    expect(anchor).toBeTruthy();

    const el: HTMLElement = anchor.nativeElement;
    expect(el.getAttribute('data-testid')).toBe('route-card-42');
    expect(el.getAttribute('aria-label')).toBe('View Test Employee');

    const title = anchor.query(By.css('.card-title')).nativeElement as HTMLElement;
    const desc = anchor.query(By.css('.card-desc')).nativeElement as HTMLElement;

    expect(title.textContent?.trim()).toBe('Test Employee');
    expect(desc.textContent?.trim()).toBe('A sample description');

    // computed route should include the employee id
    const route = (component as any).employeeDetailRoute();
    expect(route).toContain('/');
    expect(route).toContain('42');
  });

  
  it('does not have theme class by default', () => {
        const employee = {
      id: '42',
      name: 'Test Employee',
      description: 'A sample description',
    };

    // set inputs like Angular would
    fixture.componentRef.setInput('employee', employee);
    // default theme is undefined
    const classes = fixture.debugElement.classes;
    // ensure a common theme class is not 
    fixture.componentRef.setInput('theme', undefined);
    expect(classes['primary']).toBeFalsy();
    expect(classes['secondary']).toBeFalsy();
    expect(classes['tertiary']).toBeFalsy();
    expect(classes['error']).toBeFalsy();
    // expect(Object.keys(classes).length).toBe(0);
  });

  it('host element receives class matching `theme` input', () => {
        const employee = {
      id: '42',
      name: 'Test Employee',
      description: 'A sample description',
    };

    // set inputs like Angular would and assert via helper
    fixture.componentRef.setInput('employee', employee);
    expect(hostHasThemeClass(fixture, 'primary')).toBeTruthy();
    expect(hostHasThemeClass(fixture, 'secondary')).toBeTruthy();
  });

});
