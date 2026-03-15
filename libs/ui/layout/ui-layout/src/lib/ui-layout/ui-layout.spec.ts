import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ShellLayoutComponent } from '../components/shell-layout/shell-layout.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

describe('ShellLayoutComponent', () => {
  let fixture: ComponentFixture<ShellLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellLayoutComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ShellLayoutComponent);
    fixture.componentRef.setInput('brandName', 'Digital Twin');
    fixture.componentRef.setInput('navItems', []);
    fixture.detectChanges();
  });

  it('dovrebbe essere creato', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('mostra il brand name', () => {
    expect(fixture.nativeElement.textContent).toContain('Digital Twin');
  });
});

describe('SidebarComponent', () => {
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(SidebarComponent);
    fixture.componentRef.setInput('sections', []);
    fixture.detectChanges();
  });

  it('dovrebbe essere creato', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('inizializza non collapsed', () => {
    expect(fixture.componentInstance.collapsed()).toBe(false);
  });
});