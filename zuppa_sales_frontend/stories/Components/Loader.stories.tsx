import { Loader } from '@/components/Loader/Loader';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'left',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
