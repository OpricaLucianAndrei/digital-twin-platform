import { Meta, StoryObj } from '@storybook/angular';
import { MetricCardComponent } from './metric-card.component';

const meta: Meta<MetricCardComponent> = {
  title: 'UI/MetricCard',
  component: MetricCardComponent,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0B0F14' }],
    },
  },
};

export default meta;
type Story = StoryObj<MetricCardComponent>;

export const Normal: Story = {
  args: { label: 'Temperature', value: 65, unit: '°C', trend: 'stable', status: 'normal', subtitle: 'Last updated 2s ago' }
};

export const Warning: Story = {
  args: { label: 'Temperature', value: 78, unit: '°C', trend: 'rising', status: 'warning', subtitle: 'Above threshold' }
};

export const Alarm: Story = {
  args: { label: 'Temperature', value: 94, unit: '°C', trend: 'rising', status: 'alarm', subtitle: 'Critical — immediate action required' }
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns: repeat(3, 200px); gap:16px; padding:24px; background:#0B0F14;">
        <lib-ui-metric-card label="Temperature" [value]="65" unit="°C" trend="stable" status="normal" subtitle="Normal range" />
        <lib-ui-metric-card label="Vibration" [value]="5.2" unit="mm/s" trend="rising" status="warning" subtitle="Above threshold" />
        <lib-ui-metric-card label="Power" [value]="940" unit="kW" trend="rising" status="alarm" subtitle="Critical" />
      </div>
    `,
  }),
};