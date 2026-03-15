import { Injectable, signal, computed } from '@angular/core';
import { Device, DeviceStatus, Telemetry, deriveStatus } from '@digital-twin-platform-project/models';

@Injectable({ providedIn: 'root' })
export class DeviceStateService {
  private readonly _devices = signal<Map<string, Device>>(new Map());

  readonly devices        = computed(() => [...this._devices().values()]);
  readonly deviceMap      = this._devices.asReadonly();
  readonly alarmDevices   = computed(() => this.devices().filter(d => d.status === 'alarm'));
  readonly warningDevices = computed(() => this.devices().filter(d => d.status === 'warning'));
  readonly offlineDevices = computed(() => this.devices().filter(d => d.status === 'offline'));
  readonly onlineDevices  = computed(() => this.devices().filter(d => d.status === 'online'));

  readonly healthScore = computed(() => {
    const all = this.devices();
    if (!all.length) return 100;
    const healthy = all.filter(d => d.status === 'online' || d.status === 'maintenance').length;
    return Math.round((healthy / all.length) * 100);
  });

  setDevices(devices: Device[]): void {
    const map = new Map(devices.map(d => [d.id, d]));
    this._devices.set(map);
  }

  updateFromTelemetry(telemetry: Telemetry): void {
    this._devices.update(map => {
      const device = map.get(telemetry.deviceId);
      if (!device) return map;
      const newMap = new Map(map);
      const status = deriveStatus(
        telemetry.temperature,
        telemetry.vibration,
        telemetry.power,
        device.status
      );
      newMap.set(telemetry.deviceId, {
        ...device,
        temperature:  telemetry.temperature,
        vibration:    telemetry.vibration,
        power:        telemetry.power,
        lastSeen:     telemetry.timestamp,
        status,
      });
      return newMap;
    });
  }

  getDevice(id: string): Device | undefined {
    return this._devices().get(id);
  }

  setDeviceStatus(id: string, status: DeviceStatus): void {
    this._devices.update(map => {
      const device = map.get(id);
      if (!device) return map;
      const newMap = new Map(map);
      newMap.set(id, { ...device, status });
      return newMap;
    });
  }
}