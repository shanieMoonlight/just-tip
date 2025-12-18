import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoDataCard } from './no-data-card';

describe('NoDataCard', () => {
  let component: NoDataCard;
  let fixture: ComponentFixture<NoDataCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDataCard],
    }).compileComponents();

    fixture = TestBed.createComponent(NoDataCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
