import { Meta, StoryObj } from '@storybook/angular';
import { SidebarComponent } from './sidebar.component';

const meta: Meta<SidebarComponent> = {
  title: 'Layout/Sidebar',
  component: SidebarComponent,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0B0F14' }],
    },
  },
};

export default meta;
type Story = StoryObj<SidebarComponent>;

const defaultSections = [
  {
    title: 'Monitoring',
    items: [
      { id: 'twin',      label: 'Digital Twin', icon: '🏭' },
      { id: 'alarms',    label: 'Alarms',       icon: '🔔', badge: 3, badgeColor: 'alarm' as const },
      { id: 'analytics', label: 'Analytics',    icon: '📊' },
    ],
  },
  {
    title: 'Quantum',
    items: [
      { id: 'quantum',   label: 'Quantum Ops',  icon: '⚛', badge: 1, badgeColor: 'warning' as const },
    ],
  },
  {
    title: 'System',
    items: [
      { id: 'admin',     label: 'Admin',        icon: '⚙' },
    ],
  },
];

export const Default: Story = {
  args: {
    title:      'Navigation',
    sections:   defaultSections,
    collapsed:  false,
    selectedId: 'twin',
  },
};

export const Collapsed: Story = {
  args: {
    title:      'Navigation',
    sections:   defaultSections,
    collapsed:  true,
    selectedId: 'twin',
  },
};