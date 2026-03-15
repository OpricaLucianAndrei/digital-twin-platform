import { DeviceSchema, deriveStatus, DEVICE_THRESHOLDS } from './device.model';
import { TelemetrySchema } from './telemetry.model';
import { AlarmSchema } from './alarm.model';
import { FacilitySchema } from './facility.model';

describe('DeviceSchema', () => {
  it('accetta un device valido', () => {
    const device = DeviceSchema.parse({
      id:           'robot_arm_01',
      name:         'Robot Arm 1',
      type:         'robot_arm',
      status:       'online',
      zoneId:       'zone_a',
      facilityId:   'facility_01',
      temperature:  65,
      vibration:    2.5,
      power:        450,
      lastSeen:     Date.now(),
      svgElementId: '#robot_arm_01',
    });
    expect(device.id).toBe('robot_arm_01');
  });

  it('rifiuta id con formato errato', () => {
    expect(() => DeviceSchema.parse({ id: 'invalid' })).toThrow();
  });
});

describe('deriveStatus', () => {
  it('restituisce online con valori normali', () => {
    expect(deriveStatus(60, 2.0, 400)).toBe('online');
  });

  it('restituisce warning con temperatura alta', () => {
    expect(deriveStatus(DEVICE_THRESHOLDS.temperature.warning + 1, 2.0, 400)).toBe('warning');
  });

  it('restituisce alarm con temperatura critica', () => {
    expect(deriveStatus(DEVICE_THRESHOLDS.temperature.alarm + 1, 2.0, 400)).toBe('alarm');
  });

  it('preserva stato offline', () => {
    expect(deriveStatus(95, 9.0, 950, 'offline')).toBe('offline');
  });
});

describe('TelemetrySchema', () => {
  it('accetta telemetria valida', () => {
    const t = TelemetrySchema.parse({
      deviceId:    'robot_arm_01',
      temperature: 65,
      vibration:   2.5,
      power:       450,
      timestamp:   Date.now(),
      source:      'mqtt',
    });
    expect(t.source).toBe('mqtt');
  });
});

describe('AlarmSchema', () => {
  it('accetta un allarme valido', () => {
    const alarm = AlarmSchema.parse({
      id:             crypto.randomUUID(),
      deviceId:       'robot_arm_01',
      facilityId:     'facility_01',
      level:          'alarm',
      metric:         'temperature',
      value:          92,
      threshold:      90,
      message:        'Temperatura critica',
      timestamp:      Date.now(),
      resolvedAt:     null,
      acknowledged:   false,
      acknowledgedBy: null,
      acknowledgedAt: null,
    });
    expect(alarm.level).toBe('alarm');
  });
});

describe('FacilitySchema', () => {
  it('accetta una facility valida', () => {
    const facility = FacilitySchema.parse({
      id:       'facility_01',
      name:     'Stabilimento Nord',
      location: 'Milano, IT',
      timezone: 'Europe/Rome',
      svgUrl:   null,
      zones:    [],
    });
    expect(facility.name).toBe('Stabilimento Nord');
  });
});