import { Button } from '@/components/Button/Button';
import { AuthLayout } from '@/components/Layout/AuthLayout';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/AuthLayout',
  component: AuthLayout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h2>Welcome to Auth Page</h2>
        <p>Please log in to continue.</p>
        <Button text="Sign In" className="btn btn-primary" />
      </div>
    ),
    slug: 'slug',
  },
};

export const WithLogoutButton: Story = {
  args: {
    children: (
      <div>
        <h2>Welcome, User!</h2>
        <p>You are logged in.</p>
        <Button text="Go to Dashboard" className="btn btn-success" />
      </div>
    ),
    slug: 'slug',
  },
};
