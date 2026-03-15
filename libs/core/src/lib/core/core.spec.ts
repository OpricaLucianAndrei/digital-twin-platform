import { TestBed } from '@angular/core/testing';
import { DeviceStateService } from '../services/device-state.service';
import { AlarmService } from '../services/alarm.service';
import { SelectionService } from '../services/selection.service';
import { TimelineService } from '../services/timeline.service';

describe('DeviceStateService', () => {
  let service: DeviceStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceStateService);
  });

  it('inizializza con lista vuota', () => {
    expect(service.devices()).toEqual([]);
  });

  it('calcola health score 100 con lista vuota', () => {
    expect(service.healthScore()).toBe(100);
  });
});

describe('AlarmService', () => {
  let service: AlarmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlarmService);
  });

  it('inizializza con lista vuota', () => {
    expect(service.alarms()).toEqual([]);
    expect(service.criticalCount()).toBe(0);
  });
});

describe('SelectionService', () => {
  let service: SelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectionService);
  });

  it('inizializza senza selezione', () => {
    expect(service.selectedId()).toBeNull();
    expect(service.hasSelection()).toBe(false);
  });

  it('seleziona un device', () => {
    service.select('robot_arm_01');
    expect(service.selectedId()).toBe('robot_arm_01');
    expect(service.hasSelection()).toBe(true);
  });

  it('deseleziona', () => {
    service.select('robot_arm_01');
    service.deselect();
    expect(service.selectedId()).toBeNull();
  });
});

describe('TimelineService', () => {
  let service: TimelineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimelineService);
  });

  it('inizializza con replay disattivo', () => {
    expect(service.isReplaying()).toBe(false);
  });

  it('avvia e ferma il replay', () => {
    service.startReplay();
    expect(service.isReplaying()).toBe(true);
    service.stopReplay();
    expect(service.isReplaying()).toBe(false);
  });

  it('calcola il progress correttamente', () => {
    service.setHistoryRange({ from: 0, to: 100 });
    service.setReplayTime(50);
    expect(service.replayProgress()).toBe(50);
  });
});