import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JtEmployeeListPage } from './employee-list';

describe('EmployeeList', () => {
  let component: JtEmployeeListPage;
  let fixture: ComponentFixture<JtEmployeeListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtEmployeeListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(JtEmployeeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
