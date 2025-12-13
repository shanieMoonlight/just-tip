import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JtUiDivider } from './divider';
import { hostHasThemeClass } from '../../../testing/theme-assert';

describe('JtUiDivider', () => {
  let fixture: ComponentFixture<JtUiDivider>;
  let component: JtUiDivider;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtUiDivider],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(JtUiDivider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not have theme class by default', () => {
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
    expect(hostHasThemeClass(fixture, 'primary')).toBeTruthy();
    expect(hostHasThemeClass(fixture, 'secondary')).toBeTruthy();
  });
});

describe('Divider', () => {
  let component: JtUiDivider;
  let fixture: ComponentFixture<JtUiDivider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtUiDivider]
    }).compileComponents();

    fixture = TestBed.createComponent(JtUiDivider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
