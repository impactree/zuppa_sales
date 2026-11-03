import { CustomInputField } from '@/components/InputField/CustomInputField';
import type { Meta, StoryObj } from '@storybook/react';
import { FormikValues } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
});

const meta = {
  title: 'Components/CustomInputField',
  component: CustomInputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomInputField>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    validationSchema,
    label: 'Username',
    field: {
      name: 'username',
      value: 'creew' as FormikValues['username'],
      onChange: () => {},
    },
    error: '',
    children: <input type="text" />,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'This field is required',
  },
};
