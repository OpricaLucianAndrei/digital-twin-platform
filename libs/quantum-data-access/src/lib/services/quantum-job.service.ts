import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuantumJob, QuantumJobSchema } from '@dt-platform/quantum-models';

@Injectable({ providedIn: 'root' })
export class QuantumJobService {
  private readonly http = inject(HttpClient);
  private readonly _jobs = signal<QuantumJob[]>([]);

  readonly jobs          = this._jobs.asReadonly();
  readonly activeJobs    = computed(() => this._jobs().filter(j => j.status === 'running' || j.status === 'queued'));
  readonly completedJobs = computed(() => this._jobs().filter(j => j.status === 'completed'));
  readonly failedJobs    = computed(() => this._jobs().filter(j => j.status === 'failed'));

  loadJobs(): void {
    this.http.get<unknown[]>('/api/quantum/jobs').subscribe(data => {
      const jobs = data.map(j => QuantumJobSchema.parse(j));
      this._jobs.set(jobs);
    });
  }

  addJob(job: QuantumJob): void {
    this._jobs.update(jobs => [job, ...jobs]);
  }

  updateJobStatus(id: string, status: QuantumJob['status']): void {
    this._jobs.update(jobs =>
      jobs.map(j => j.id === id ? { ...j, status } : j)
    );
  }
}