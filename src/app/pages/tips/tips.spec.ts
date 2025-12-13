import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JtTipsPage } from './tips';

describe('Tips', () => {
  let component: JtTipsPage;
  let fixture: ComponentFixture<JtTipsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtTipsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(JtTipsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
