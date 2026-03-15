import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceStatus } from '@digital-twin-platform-project/models';

@Component({
  selector: 'lib-ui-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [class]="'badge--' + status()">
      <span class="badge__dot"></span>
      <span class="badge__label">{{ labelMap[status()] }}</span>
    </span>
  `,
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  readonly status = input.required<DeviceStatus>();

  readonly labelMap: Record<DeviceStatus, string> = {
    online:      'Online',
    warning:     'Warning',
    alarm:       'Alarm',
    offline:     'Offline',
    maintenance: 'Maintenance',
  };
}