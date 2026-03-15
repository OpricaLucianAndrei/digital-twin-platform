import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SidebarSection {
  title:    string;
  items:    SidebarItem[];
}

export interface SidebarItem {
  id:       string;
  label:    string;
  icon:     string;
  badge?:   number;
  badgeColor?: 'default' | 'warning' | 'alarm';
}

@Component({
  selector: 'lib-ui-layout-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="sidebar" [class.sidebar--collapsed]="collapsed()">
      <div class="sidebar__header">
        @if (!collapsed()) {
          <span class="sidebar__title">{{ title() }}</span>
        }
        <button
          class="sidebar__toggle"
          (click)="toggleCollapse()"
          (keyup.enter)="toggleCollapse()"
          [attr.aria-label]="collapsed() ? 'Espandi sidebar' : 'Comprimi sidebar'">
          {{ collapsed() ? '→' : '←' }}
        </button>
      </div>

      @for (section of sections(); track section.title) {
        <div class="sidebar__section">
          @if (!collapsed()) {
            <span class="sidebar__section-title">{{ section.title }}</span>
          }
          @for (item of section.items; track item.id) {
            <div
              class="sidebar__item"
              [class.sidebar__item--active]="selectedId() === item.id"
              role="button"
              tabindex="0"
              (click)="selectItem(item)"
              (keyup.enter)="selectItem(item)">
              <span class="sidebar__item-icon">{{ item.icon }}</span>
              @if (!collapsed()) {
                <span class="sidebar__item-label">{{ item.label }}</span>
                @if (item.badge && item.badge > 0) {
                  <span class="sidebar__item-badge"
                    [class]="'sidebar__item-badge--' + (item.badgeColor ?? 'default')">
                    {{ item.badge > 99 ? '99+' : item.badge }}
                  </span>
                }
              }
            </div>
          }
        </div>
      }
    </aside>
  `,
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly title      = input<string>('');
  readonly sections   = input<SidebarSection[]>([]);
  readonly collapsed  = input<boolean>(false);
  readonly selectedId = input<string>('');

  readonly itemSelected    = output<SidebarItem>();
  readonly collapseToggled = output<boolean>();

  selectItem(item: SidebarItem): void {
    this.itemSelected.emit(item);
  }

  toggleCollapse(): void {
    this.collapseToggled.emit(!this.collapsed());
  }
}