import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JtShiftListPage } from './shift-list';

describe('ShiftList', () => {
  let component: JtShiftListPage;
  let fixture: ComponentFixture<JtShiftListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtShiftListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(JtShiftListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
