import { Injectable, signal } from '@angular/core';

export interface SvgDeviceEntry {
  deviceId:  string;
  element:   SVGElement;
  zoneId:    string;
}

@Injectable({ providedIn: 'root' })
export class SvgDeviceRegistryService {
  private readonly _registry = new Map<string, SvgDeviceEntry>();
  private readonly _size = signal(0);

  readonly size = this._size.asReadonly();

  register(deviceId: string, element: SVGElement, zoneId: string): void {
    this._registry.set(deviceId, { deviceId, element, zoneId });
    this._size.set(this._registry.size);
  }

  unregister(deviceId: string): void {
    this._registry.delete(deviceId);
    this._size.set(this._registry.size);
  }

  get(deviceId: string): SvgDeviceEntry | undefined {
    return this._registry.get(deviceId);
  }

  getElement(deviceId: string): SVGElement | undefined {
    return this._registry.get(deviceId)?.element;
  }

  getByZone(zoneId: string): SvgDeviceEntry[] {
    return [...this._registry.values()].filter(e => e.zoneId === zoneId);
  }

  getAll(): SvgDeviceEntry[] {
    return [...this._registry.values()];
  }

  has(deviceId: string): boolean {
    return this._registry.has(deviceId);
  }

  clear(): void {
    this._registry.clear();
    this._size.set(0);
  }
}