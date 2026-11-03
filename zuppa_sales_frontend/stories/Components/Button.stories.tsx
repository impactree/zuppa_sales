import { Button } from '@/components/Button/Button';
import '@/components/Button/Button.css';
import { ButtonProps } from '@/components/types';
import { Meta, StoryFn } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    onDoubleClick: { action: 'double-clicked' },
    prefixIconChildren: { control: 'text' },
    sufixIconChildren: { control: 'text' },
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<ButtonProps> = function ButtonTemplate(args) {
  return <Button {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  text: 'Primary Button',
  variant: 'primary',
  type: 'button',
  isDisabled: false,
  isLoading: false,
  isSolid: true,
};

export const Loading = Template.bind({});
Loading.args = {
  text: 'Loading Button',
  variant: 'secondary',
  type: 'button',
  isLoading: true,
  isSolid: false,
  isSolidSecondary: false,
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  text: 'Button with Icons',
  variant: 'success',
  type: 'button',
  isLoading: false,
  prefixIconChildren: <span role="img" aria-label="icon">🚀</span>,
  sufixIconChildren: <span role="img" aria-label="icon">🌟</span>,
  isSolid: true,
};
