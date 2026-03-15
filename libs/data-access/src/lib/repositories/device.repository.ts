import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Device, DeviceSchema, Facility, FacilitySchema } from '@digital-twin-platform-project/models';

@Injectable({ providedIn: 'root' })
export class DeviceRepository {
  private readonly http = inject(HttpClient);
  private readonly base = '/api';

  getFacilities(): Observable<Facility[]> {
    return this.http.get<unknown[]>(`${this.base}/facilities`).pipe(
      map(data => data.map(f => FacilitySchema.parse(f)))
    );
  }

  getDevices(facilityId: string): Observable<Device[]> {
    return this.http.get<unknown[]>(`${this.base}/facilities/${facilityId}/devices`).pipe(
      map(data => data.map(d => DeviceSchema.parse(d)))
    );
  }

  getDevice(deviceId: string): Observable<Device> {
    return this.http.get<unknown>(`${this.base}/devices/${deviceId}`).pipe(
      map(d => DeviceSchema.parse(d))
    );
  }

  updateDeviceStatus(deviceId: string, status: Device['status']): Observable<Device> {
    return this.http.patch<unknown>(`${this.base}/devices/${deviceId}/status`, { status }).pipe(
      map(d => DeviceSchema.parse(d))
    );
  }
}