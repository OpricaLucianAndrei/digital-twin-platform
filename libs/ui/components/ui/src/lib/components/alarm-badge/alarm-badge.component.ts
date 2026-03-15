import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmLevel } from '@digital-twin-platform-project/models';

@Component({
  selector: 'lib-ui-alarm-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="alarm-badge" [class]="'alarm-badge--' + level()">
      <span class="alarm-badge__icon">{{ icon() }}</span>
      <span class="alarm-badge__label">{{ labelMap[level()] }}</span>
      @if (count() > 0) {
        <span class="alarm-badge__count">{{ count() }}</span>
      }
    </span>
  `,
  styleUrl: './alarm-badge.component.scss',
})
export class AlarmBadgeComponent {
  readonly level = input.required<AlarmLevel>();
  readonly count = input<number>(0);

  readonly labelMap: Record<AlarmLevel, string> = {
    warning:  'Warning',
    alarm:    'Alarm',
    critical: 'Critical',
  };

  readonly icon = computed(() => {
    const map: Record<AlarmLevel, string> = {
      warning:  '⚠',
      alarm:    '🔴',
      critical: '🚨',
    };
    return map[this.level()];
  });
}