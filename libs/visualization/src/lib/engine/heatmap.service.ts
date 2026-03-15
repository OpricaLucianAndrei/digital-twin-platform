import { Injectable, signal } from '@angular/core';
import { tempToColor } from '@digital-twin-platform-project/utils';

export interface HeatmapDataPoint {
  deviceId:    string;
  elementId:   string;
  temperature: number;
}


@Injectable({ providedIn: 'root' })
export class HeatmapService {
  private readonly _enabled = signal(false);
  private svgRoot: SVGSVGElement | null = null;

  readonly enabled = this._enabled.asReadonly();

  setSvgRoot(svg: SVGSVGElement): void {
    this.svgRoot = svg;
  }

  toggle(): void {
    this._enabled.update(v => !v);
    if (!this._enabled()) {
      this.clearOverlay();
    }
  }

  enable(): void {
    this._enabled.set(true);
  }

  disable(): void {
    this._enabled.set(false);
    this.clearOverlay();
  }

  render(dataPoints: HeatmapDataPoint[]): void {
    if (!this._enabled() || !this.svgRoot) return;
    const svg = this.svgRoot;

    dataPoints.forEach(point => {
      const element = svg.getElementById(point.elementId) as SVGElement | null;
      if (!element) return;
      const color = tempToColor(point.temperature, 20, 100);
      element.style.fill    = color;
      element.style.opacity = '0.7';
    });
  }

  clearOverlay(): void {
    if (!this.svgRoot) return;
    const elements = this.svgRoot.querySelectorAll('[data-device-id]');
    elements.forEach(el => {
      (el as SVGElement).style.fill    = '';
      (el as SVGElement).style.opacity = '';
    });
  }
}