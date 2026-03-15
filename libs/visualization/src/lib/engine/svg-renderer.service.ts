import { Injectable, NgZone, inject, signal } from '@angular/core';
import { DeviceStatus } from '@digital-twin-platform-project/models';
import { SvgDeviceRegistryService } from './svg-device-registry.service';

export const STATUS_CLASSES: Record<DeviceStatus, string> = {
  online:      'status-online',
  warning:     'status-warning',
  alarm:       'status-alarm',
  offline:     'status-offline',
  maintenance: 'status-maintenance',
};

@Injectable({ providedIn: 'root' })
export class SvgRendererService {
  private readonly registry = inject(SvgDeviceRegistryService);
  private readonly zone     = inject(NgZone);

  // Render queue — Set per deduplicare burst updates
  private readonly renderQueue = new Set<string>();
  private rafId: number | null = null;

  readonly frameCount = signal(0);

  /**
   * Accoda un device per il prossimo frame di rendering
   * Chiamato dal WebSocket handler — fuori dalla zona Angular
   */
  enqueue(deviceId: string): void {
    this.renderQueue.add(deviceId);
    if (!this.rafId) {
      this.scheduleFlush();
    }
  }

  /**
   * Aggiorna immediatamente lo status di un device sull'SVG
   */
  updateStatus(deviceId: string, status: DeviceStatus): void {
    const element = this.registry.getElement(deviceId);
    if (!element) return;
    this.applyStatusClass(element, status);
  }

  /**
   * Aggiorna immediatamente tutti i device nella mappa
   */
  updateAll(statuses: Map<string, DeviceStatus>): void {
    this.zone.runOutsideAngular(() => {
      statuses.forEach((status, deviceId) => {
        this.updateStatus(deviceId, status);
      });
    });
  }

  private scheduleFlush(): void {
    this.zone.runOutsideAngular(() => {
      this.rafId = requestAnimationFrame(() => this.flush());
    });
  }

  private flush(): void {
    const toRender = [...this.renderQueue];
    this.renderQueue.clear();
    this.rafId = null;

    // Esegue fuori dalla zona Angular — zero CD cycles
    toRender.forEach(deviceId => {
      const entry = this.registry.get(deviceId);
      if (entry) {
        // Il chiamante è responsabile di passare lo status aggiornato
        // tramite updateStatus() — qui solo svuotiamo la queue
      }
    });

    this.frameCount.update(n => n + 1);
  }

  private applyStatusClass(element: SVGElement, status: DeviceStatus): void {
    // Rimuovi tutte le classi di status esistenti
    Object.values(STATUS_CLASSES).forEach(cls => element.classList.remove(cls));
    // Aggiungi la nuova classe
    element.classList.add(STATUS_CLASSES[status]);
  }

  destroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.renderQueue.clear();
  }
}
