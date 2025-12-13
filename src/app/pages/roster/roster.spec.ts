import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JtRosterPage } from './roster';

describe('Roster', () => {
  let component: JtRosterPage;
  let fixture: ComponentFixture<JtRosterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtRosterPage],
    }).compileComponents();

    fixture = TestBed.createComponent(JtRosterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
