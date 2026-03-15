import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Alarm, AlarmSchema } from '@digital-twin-platform-project/models';

export interface AlarmQueryParams {
  facilityId?: string;
  deviceId?:   string;
  level?:      Alarm['level'];
  from?:       number;
  to?:         number;
  resolved?:   boolean;
  limit?:      number;
}

@Injectable({ providedIn: 'root' })
export class AlarmRepository {
  private readonly http = inject(HttpClient);
  private readonly base = '/api';

  getAlarms(params: AlarmQueryParams = {}): Observable<Alarm[]> {
    let httpParams = new HttpParams();
    if (params.facilityId) httpParams = httpParams.set('facilityId', params.facilityId);
    if (params.deviceId)   httpParams = httpParams.set('deviceId', params.deviceId);
    if (params.level)      httpParams = httpParams.set('level', params.level);
    if (params.from)       httpParams = httpParams.set('from', params.from);
    if (params.to)         httpParams = httpParams.set('to', params.to);
    if (params.resolved !== undefined) httpParams = httpParams.set('resolved', params.resolved);
    if (params.limit)      httpParams = httpParams.set('limit', params.limit);

    return this.http.get<unknown[]>(`${this.base}/alarms`, { params: httpParams }).pipe(
      map(data => data.map(a => AlarmSchema.parse(a)))
    );
  }

  acknowledgeAlarm(alarmId: string, acknowledgedBy: string): Observable<Alarm> {
    return this.http.patch<unknown>(`${this.base}/alarms/${alarmId}/acknowledge`, { acknowledgedBy }).pipe(
      map(a => AlarmSchema.parse(a))
    );
  }

  resolveAlarm(alarmId: string): Observable<Alarm> {
    return this.http.patch<unknown>(`${this.base}/alarms/${alarmId}/resolve`, {}).pipe(
      map(a => AlarmSchema.parse(a))
    );
  }
}