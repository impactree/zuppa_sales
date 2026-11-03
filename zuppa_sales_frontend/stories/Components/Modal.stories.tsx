import { Modal } from '@/components/Modal/Modal';
import '@/components/Modal/Modal.css';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'left',
  },
  argTypes: {
    show: { control: 'boolean' },
    title: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'lg', 'xl'],
    },
    fullscreen: { control: 'boolean' },
    className: { control: 'text' },
    onClose: { action: 'onClose' },
    onHide: { action: 'onHide' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
    title: 'Default Modal',
    children: <p>This is a default modal content.</p>,
    size: 'sm',
    fullscreen: undefined,
    className: '',
    onClose: action('onClose'),
    onHide: action('onHide'),
  },
};

export const LargeModal: Story = {
  args: {
    show: true,
    title: 'Large Modal',
    children: <p>This is a large modal content.</p>,
    size: 'lg',
    fullscreen: undefined,
    className: '',
    onClose: action('onClose'),
    onHide: action('onHide'),
  },
};

export const FullscreenModal: Story = {
  args: {
    show: true,
    title: 'Fullscreen Modal',
    children: <p>This is a fullscreen modal content.</p>,
    size: 'lg',
    fullscreen: true,
    className: '',
    onClose: action('onClose'),
    onHide: action('onHide'),
  },
};
