import { Meta, StoryObj } from '@storybook/angular';
import { ShellLayoutComponent } from './shell-layout.component';

const meta: Meta<ShellLayoutComponent> = {
  title: 'Layout/ShellLayout',
  component: ShellLayoutComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0B0F14' }],
    },
  },
};

export default meta;
type Story = StoryObj<ShellLayoutComponent>;

const defaultNavItems = [
  { label: 'Digital Twin', route: '/twin',      icon: '🏭' },
  { label: 'Alarms',       route: '/alarms',    icon: '🔔' },
  { label: 'Analytics',    route: '/analytics', icon: '📊' },
  { label: 'Quantum',      route: '/quantum',   icon: '⚛' },
  { label: 'Admin',        route: '/admin',     icon: '⚙' },
];

export const Default: Story = {
  args: {
    brandName:   'Digital Twin',
    navItems:    defaultNavItems,
    activeRoute: '/twin',
  },
  render: (args) => ({
    props: args,
    template: `
      <lib-ui-layout-shell
        [brandName]="brandName"
        [navItems]="navItems"
        [activeRoute]="activeRoute">
        <div style="padding:32px; color:#E5E7EB;">
          <h1 style="font-size:24px; margin:0 0 8px;">Dashboard Content</h1>
          <p style="color:#6B7280;">Main content area</p>
        </div>
      </lib-ui-layout-shell>
    `,
  }),
};