import { Injectable, signal, computed, inject } from '@angular/core';
import { Device } from '@digital-twin-platform-project/models';
import { DeviceStateService } from './device-state.service';

@Injectable({ providedIn: 'root' })
export class SelectionService {
  private readonly deviceState = inject(DeviceStateService);
  private readonly _selectedId = signal<string | null>(null);

  readonly selectedId     = this._selectedId.asReadonly();
  readonly selectedDevice = computed((): Device | null => {
    const id = this._selectedId();
    if (!id) return null;
    return this.deviceState.getDevice(id) ?? null;
  });
  readonly hasSelection = computed(() => this._selectedId() !== null);

  select(deviceId: string): void {
    this._selectedId.set(deviceId);
  }

  deselect(): void {
    this._selectedId.set(null);
  }

  toggle(deviceId: string): void {
    if (this._selectedId() === deviceId) {
      this.deselect();
    } else {
      this.select(deviceId);
    }
  }
}