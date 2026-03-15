import { Meta, StoryObj } from '@storybook/angular';
import { AlarmBadgeComponent } from './alarm-badge.component';

const meta: Meta<AlarmBadgeComponent> = {
  title: 'UI/AlarmBadge',
  component: AlarmBadgeComponent,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0B0F14' }],
    },
  },
  argTypes: {
    level: {
      control: 'select',
      options: ['warning', 'alarm', 'critical'],
    },
  },
};

export default meta;
type Story = StoryObj<AlarmBadgeComponent>;

export const Warning:  Story = { args: { level: 'warning', count: 3 } };
export const Alarm:    Story = { args: { level: 'alarm', count: 7 } };
export const Critical: Story = { args: { level: 'critical', count: 2 } };

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display:flex; gap:12px; flex-wrap:wrap; padding:24px; background:#0B0F14;">
        <lib-ui-alarm-badge level="warning" [count]="3" />
        <lib-ui-alarm-badge level="alarm" [count]="7" />
        <lib-ui-alarm-badge level="critical" [count]="2" />
      </div>
    `,
  }),
};