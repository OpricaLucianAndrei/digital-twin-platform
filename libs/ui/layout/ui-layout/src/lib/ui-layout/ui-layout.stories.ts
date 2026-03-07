import type { Meta, StoryObj } from '@storybook/angular';
import { UiLayout } from './ui-layout';
import { expect } from 'storybook/test';

const meta: Meta<UiLayout> = {
  component: UiLayout,
  title: 'UiLayout',
};
export default meta;

type Story = StoryObj<UiLayout>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/ui-layout/gi)).toBeTruthy();
  },
};
