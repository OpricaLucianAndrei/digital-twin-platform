import { Meta, StoryObj } from '@storybook/angular';
import { StatusBadgeComponent } from './status-badge.component';

const meta: Meta<StatusBadgeComponent> = {
  title: 'UI/StatusBadge',
  component: StatusBadgeComponent,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0B0F14' }],
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'warning', 'alarm', 'offline', 'maintenance'],
    },
  },
};

export default meta;
type Story = StoryObj<StatusBadgeComponent>;

export const Online:      Story = { args: { status: 'online' } };
export const Warning:     Story = { args: { status: 'warning' } };
export const Alarm:       Story = { args: { status: 'alarm' } };
export const Offline:     Story = { args: { status: 'offline' } };
export const Maintenance: Story = { args: { status: 'maintenance' } };

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; flex-wrap:wrap; padding:24px; background:#0B0F14;">
        <lib-ui-status-badge status="online" />
        <lib-ui-status-badge status="warning" />
        <lib-ui-status-badge status="alarm" />
        <lib-ui-status-badge status="offline" />
        <lib-ui-status-badge status="maintenance" />
      </div>
    `,
  }),
};