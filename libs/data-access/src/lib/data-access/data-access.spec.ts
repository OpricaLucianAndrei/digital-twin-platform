import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DeviceRepository } from '../repositories/device.repository';
import { AlarmRepository } from '../repositories/alarm.repository';
import { TelemetryRepository } from '../repositories/telemetry.repository';

describe('Repositories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
  });

  it('DeviceRepository dovrebbe essere creato', () => {
    expect(TestBed.inject(DeviceRepository)).toBeTruthy();
  });

  it('AlarmRepository dovrebbe essere creato', () => {
    expect(TestBed.inject(AlarmRepository)).toBeTruthy();
  });

  it('TelemetryRepository dovrebbe essere creato', () => {
    expect(TestBed.inject(TelemetryRepository)).toBeTruthy();
  });
});