import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { JtNavbar } from './nav';

describe('JtNavbar', () => {
  let fixture: ComponentFixture<JtNavbar>;
  let component: JtNavbar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JtNavbar, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(JtNavbar);
    component = fixture.componentInstance;
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders default title and logo', () => {
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img.logo'))?.nativeElement as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.getAttribute('alt')).toBe('logo');

    const titleEl = fixture.debugElement.query(By.css('.center .title'))?.nativeElement as HTMLElement;
    expect(titleEl).toBeTruthy();
    expect(titleEl.querySelector('sb-portal-outlet[name="title"]')).toBeTruthy();
  });

  
  it('renders default left and right portals', () => {
    fixture.detectChanges();

    const leftEl = fixture.debugElement.query(By.css('.left-portal'))?.nativeElement as HTMLElement;
    expect(leftEl).toBeTruthy();
    expect(leftEl.querySelector('sb-portal-outlet[name="nav-left"]')).toBeTruthy();

    
    const rightEl = fixture.debugElement.query(By.css('.right-portal'))?.nativeElement as HTMLElement;
    expect(rightEl).toBeTruthy();
    expect(rightEl.querySelector('sb-portal-outlet[name="nav-right"]')).toBeTruthy();    
  });

  it('accepts `logo` inputs', () => {
    const testLogo = '/assets/test-logo.png';
    fixture.componentRef.setInput('logo', testLogo);
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img.logo'))?.nativeElement as HTMLImageElement;
    expect(img.src).toContain(testLogo);

  });
});
