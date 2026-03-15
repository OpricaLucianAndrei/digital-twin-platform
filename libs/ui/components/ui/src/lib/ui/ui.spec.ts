import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { StatusBadgeComponent } from '../components/status-badge/status-badge.component';
import { MetricCardComponent } from '../components/metric-card/metric-card.component';
import { AlarmBadgeComponent } from '../components/alarm-badge/alarm-badge.component';

describe('StatusBadgeComponent', () => {
  let fixture: ComponentFixture<StatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadgeComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(StatusBadgeComponent);
    fixture.componentRef.setInput('status', 'online');
    fixture.detectChanges();
  });

  it('dovrebbe essere creato', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('mostra il label corretto per online', () => {
    expect(fixture.nativeElement.textContent).toContain('Online');
  });
});

describe('MetricCardComponent', () => {
  let fixture: ComponentFixture<MetricCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(MetricCardComponent);
    fixture.componentRef.setInput('label', 'Temperature');
    fixture.componentRef.setInput('value', 65);
    fixture.detectChanges();
  });

  it('dovrebbe essere creato', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('mostra il valore corretto', () => {
    expect(fixture.nativeElement.textContent).toContain('65');
  });
});

describe('AlarmBadgeComponent', () => {
  let fixture: ComponentFixture<AlarmBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlarmBadgeComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AlarmBadgeComponent);
    fixture.componentRef.setInput('level', 'alarm');
    fixture.detectChanges();
  });

  it('dovrebbe essere creato', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('mostra il label corretto per alarm', () => {
    expect(fixture.nativeElement.textContent).toContain('Alarm');
  });
});