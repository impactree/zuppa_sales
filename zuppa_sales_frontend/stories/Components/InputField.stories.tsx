import { InputField } from '@/components/InputField/InputField';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
});

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    validationSchema,
    label: 'Username',
    field: {
      name: 'username',
      value: '',
      onChange: action('onChange'),
    },
    isValid: true,
    error: '',
    autoFocus: true,
    placeholder: 'Enter your username',
    disabled: false,
    isPassword: false,
    setPasswordIcon: action('setPasswordIcon'),
    passwordIcon: false,
    maxLength: 50,
  },
};
