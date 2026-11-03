import { Pill } from '@/components/Pill/Pill';
import '@/components/Pill/Pill.css';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Pill',
  component: Pill,
  argTypes: {
    pillText: { control: 'text', description: 'Text displayed inside the pill.' },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPill: Story = {
  args: {
    pillText: 'sample',
  },
  render: (args) => <Pill {...args} />,
};

export const WarningPill: Story = {
  args: {
    pillText: 'warning',
  },
  render: (args) => <Pill {...args} />,
};

export const SuccessPill: Story = {
  args: {
    pillText: 'success',
  },
  render: (args) => <Pill {...args} />,
};
