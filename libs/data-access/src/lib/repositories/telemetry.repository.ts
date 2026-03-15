import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Telemetry, TelemetrySchema, TelemetryHistory, TelemetryHistorySchema } from '@digital-twin-platform-project/models';

export interface TelemetryQueryParams {
  deviceId: string;
  from:     number;
  to:       number;
  limit?:   number;
}

@Injectable({ providedIn: 'root' })
export class TelemetryRepository {
  private readonly http = inject(HttpClient);
  private readonly base = '/api';

  getHistory(params: TelemetryQueryParams): Observable<TelemetryHistory> {
    let httpParams = new HttpParams()
      .set('from', params.from)
      .set('to', params.to);
    if (params.limit) httpParams = httpParams.set('limit', params.limit);

    return this.http.get<unknown>(
      `${this.base}/devices/${params.deviceId}/telemetry`,
      { params: httpParams }
    ).pipe(
      map(data => TelemetryHistorySchema.parse(data))
    );
  }

  getLatest(deviceId: string): Observable<Telemetry> {
    return this.http.get<unknown>(`${this.base}/devices/${deviceId}/telemetry/latest`).pipe(
      map(data => TelemetrySchema.parse(data))
    );
  }
}