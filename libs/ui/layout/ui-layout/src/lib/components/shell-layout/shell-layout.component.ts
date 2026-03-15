import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

export interface NavItem {
  label:  string;
  route:  string;
  icon:   string;
}

@Component({
  selector: 'lib-ui-layout-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
  <div class="shell">
    <aside class="shell__sidebar">
      <div class="shell__brand">
        <span class="shell__brand-icon">⬡</span>
        <span class="shell__brand-name">{{ brandName() }}</span>
      </div>
      <nav class="shell__nav">
        @for (item of navItems(); track item.route) {
          <a class="shell__nav-item"
             role="button"
             tabindex="0"
             [class.shell__nav-item--active]="isActive(item.route)"
             (click)="navigate(item.route)"
             (keyup.enter)="navigate(item.route)"
             (keyup.space)="navigate(item.route)">
            <span class="shell__nav-icon">{{ item.icon }}</span>
            <span class="shell__nav-label">{{ item.label }}</span>
          </a>
        }
      </nav>
      <div class="shell__sidebar-footer">
        <ng-content select="[sidebar-footer]" />
      </div>
    </aside>
    <main class="shell__main">
      <ng-content />
    </main>
  </div>
`,
  styleUrl: './shell-layout.component.scss',
})
export class ShellLayoutComponent {
  readonly brandName = input<string>('Digital Twin');
  readonly navItems  = input<NavItem[]>([]);
  readonly activeRoute = input<string>('');

  isActive(route: string): boolean {
    return this.activeRoute().startsWith(route);
  }

  navigate(route: string): void {
    window.location.href = route;
  }
}