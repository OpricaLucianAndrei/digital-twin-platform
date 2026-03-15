import { Injectable, signal, computed } from '@angular/core';
import { Alarm, AlarmEvent, MAX_ALARMS_IN_MEMORY } from '@digital-twin-platform-project/models';

@Injectable({ providedIn: 'root' })
export class AlarmService {
  private readonly _alarms = signal<Alarm[]>([]);

  readonly alarms            = this._alarms.asReadonly();
  readonly activeAlarms      = computed(() => this._alarms().filter(a => !a.resolvedAt));
  readonly resolvedAlarms    = computed(() => this._alarms().filter(a => !!a.resolvedAt));
  readonly acknowledgedAlarms = computed(() => this._alarms().filter(a => a.acknowledged));
  readonly criticalCount     = computed(() => this._alarms().filter(a => a.level === 'critical' && !a.resolvedAt).length);
  readonly warningCount      = computed(() => this._alarms().filter(a => a.level === 'warning' && !a.resolvedAt).length);
  readonly alarmCount        = computed(() => this._alarms().filter(a => a.level === 'alarm' && !a.resolvedAt).length);

  processEvent(event: AlarmEvent): void {
    switch (event.type) {
      case 'alarm:created':
        this.addAlarm(event.alarm);
        break;
      case 'alarm:resolved':
        this.resolveAlarm(event.alarmId, event.resolvedAt);
        break;
      case 'alarm:acknowledged':
        this.acknowledgeAlarm(event.alarmId, event.by);
        break;
    }
  }

  private addAlarm(alarm: Alarm): void {
    this._alarms.update(alarms => {
      const updated = [alarm, ...alarms];
      // mantieni max 500 allarmi in memoria
      return updated.slice(0, MAX_ALARMS_IN_MEMORY);
    });
  }

  private resolveAlarm(alarmId: string, resolvedAt: number): void {
    this._alarms.update(alarms =>
      alarms.map(a => a.id === alarmId ? { ...a, resolvedAt } : a)
    );
  }

  private acknowledgeAlarm(alarmId: string, by: string): void {
    this._alarms.update(alarms =>
      alarms.map(a => a.id === alarmId
        ? { ...a, acknowledged: true, acknowledgedBy: by, acknowledgedAt: Date.now() }
        : a
      )
    );
  }

  clearResolved(): void {
    this._alarms.update(alarms => alarms.filter(a => !a.resolvedAt));
  }
}