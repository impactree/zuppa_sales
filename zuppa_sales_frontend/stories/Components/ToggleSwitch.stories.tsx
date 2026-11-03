// eslint-disable-next-line import/no-extraneous-dependencies
import { ToggleSwitch } from '@/components/ToggleSwitch/ToggleSwitch';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
  argTypes: {
    onChange: { action: 'changed' },
    textOn: { control: 'text' },
    textOff: { control: 'text' },
    checked: { control: 'boolean' },
    isSwitchDefault: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    label: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;

export const Default: StoryObj<typeof ToggleSwitch> = {
  args: {
    textOn: 'ON',
    textOff: 'OFF',
    isSwitchDefault: false,
    checked: false,
    isDisabled: false,
    label: 'Switch Label',
    className: '', // You can pass a custom class if needed
  },
};

export const Disabled: StoryObj<typeof ToggleSwitch> = {
  args: {
    textOn: 'ON',
    textOff: 'OFF',
    isSwitchDefault: false,
    checked: true,
    isDisabled: true,
    label: 'Switch Label',
    className: '',
  },
};

export const DefaultSwitch: StoryObj<typeof ToggleSwitch> = {
  args: {
    textOn: 'ON',
    textOff: 'OFF',
    isSwitchDefault: true,
    checked: false,
    isDisabled: false,
    label: 'Default Switch',
    className: '',
  },
};

export const CustomSwitch: StoryObj<typeof ToggleSwitch> = {
  args: {
    textOn: 'Enabled',
    textOff: 'Disabled',
    isSwitchDefault: false,
    checked: true,
    isDisabled: false,
    label: 'Custom Switch',
    className: 'custom-switch-class',
  },
};
