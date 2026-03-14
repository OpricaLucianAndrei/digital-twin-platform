import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuantumJob } from '@dt-platform/quantum-models';

@Injectable({ providedIn: 'root' })
export class QuantumBridgeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/quantum';

  submitJob(params: {
    algorithm: QuantumJob['algorithm'];
    qubits: number;
    shots: number;
    backend: string;
    triggeredByDevice?: string;
    triggerReason?: QuantumJob['triggerReason'];
    optimizationTarget?: string;
  }): Observable<QuantumJob> {
    return this.http.post<QuantumJob>(`${this.baseUrl}/jobs`, params);
  }

  cancelJob(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/jobs/${id}`);
  }

  getResult(jobId: string): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/results/${jobId}`);
  }
}