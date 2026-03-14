import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuantumBackend, QuantumBackendSchema } from '@dt-platform/quantum-models';

@Injectable({ providedIn: 'root' })
export class QuantumBackendService {
  private readonly http = inject(HttpClient);
  private readonly _backends = signal<QuantumBackend[]>([]);

  readonly backends       = this._backends.asReadonly();
  readonly onlineBackends = computed(() => this._backends().filter(b => b.status === 'online'));
  readonly avgCalibration = computed(() => {
    const online = this.onlineBackends();
    if (!online.length) return 0;
    return online.reduce((sum, b) => sum + b.calibrationScore, 0) / online.length;
  });

  loadBackends(): void {
    this.http.get<unknown[]>('/api/quantum/backends').subscribe(data => {
      const backends = data.map(b => QuantumBackendSchema.parse(b));
      this._backends.set(backends);
    });
  }
}