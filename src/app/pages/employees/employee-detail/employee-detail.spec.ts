import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JtEmployeeDetailPage } from './employee-detail';

describe('JtEmployeeDetailPage', () => {
  let component: JtEmployeeDetailPage;
  let fixture: ComponentFixture<JtEmployeeDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtEmployeeDetailPage],
    }).compileComponents();

    fixture = TestBed.createComponent(JtEmployeeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
