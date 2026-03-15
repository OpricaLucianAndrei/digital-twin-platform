import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type MetricTrend = 'rising' | 'falling' | 'stable';
export type MetricStatus = 'normal' | 'warning' | 'alarm';

@Component({
  selector: 'lib-ui-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="metric-card" [class]="'metric-card--' + status()">
      <div class="metric-card__header">
        <span class="metric-card__label">{{ label() }}</span>
        <span class="metric-card__trend" [class]="'metric-card__trend--' + trend()">
          {{ trendIcon() }}
        </span>
      </div>
      <div class="metric-card__body">
        <span class="metric-card__value">{{ value() }}</span>
        <span class="metric-card__unit">{{ unit() }}</span>
      </div>
      @if (subtitle()) {
        <div class="metric-card__footer">
          <span class="metric-card__subtitle">{{ subtitle() }}</span>
        </div>
      }
    </div>
  `,
  styleUrl: './metric-card.component.scss',
})
export class MetricCardComponent {
  readonly label    = input.required<string>();
  readonly value    = input.required<number | string>();
  readonly unit     = input<string>('');
  readonly trend    = input<MetricTrend>('stable');
  readonly status   = input<MetricStatus>('normal');
  readonly subtitle = input<string>('');

  readonly trendIcon = computed(() => {
    const map: Record<MetricTrend, string> = {
      rising:  '↑',
      falling: '↓',
      stable:  '→',
    };
    return map[this.trend()];
  });
}