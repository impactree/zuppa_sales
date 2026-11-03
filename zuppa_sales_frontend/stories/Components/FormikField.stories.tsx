import '@/app/globals.css';
import { FormikField } from '@/components/FormikField/FormikField';
import '@/components/InputField/inputField.css';
import { Meta, StoryFn } from '@storybook/react';
import { Formik } from 'formik';
import React from 'react';
import { object, string } from 'yup';

export default {
  title: 'Components/FormikField',
  component: FormikField,
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    isPassword: { control: 'boolean' },
    maxLength: { control: 'number' },
    rightIcon: { control: 'boolean' },
    icon: { control: 'object' },
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof FormikField>> = (args) => {
  const validationSchema = object({
    field: string().required('Field is required'),
  });

  return (
    <Formik
      initialValues={{ field: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.error(values)}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormikField {...args} validationSchema={validationSchema} errors={{}} />
        </form>
      )}
    </Formik>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'field',
  label: 'Field Label',
  type: 'text',
  placeholder: 'Enter text here',
  disabled: false,
  maxLength: 250,
  rightIcon: false,
  icon: null,
};

export const PasswordField = Template.bind({});
PasswordField.args = {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  disabled: false,
  isPassword: true,
  passwordIcon: true,
  maxLength: 250,
  rightIcon: true,
  icon: null,
};

export const DisabledField = Template.bind({});
DisabledField.args = {
  name: 'field',
  label: 'Disabled Field',
  type: 'text',
  placeholder: 'This field is disabled',
  disabled: true,
  maxLength: 250,
  rightIcon: false,
  icon: null,
};

export const WithError = Template.bind({});
WithError.args = {
  name: 'field',
  label: 'Field with Error',
  type: 'text',
  placeholder: 'Enter text here',
  disabled: false,
  maxLength: 250,
  rightIcon: false,
  icon: null,
};

export const CustomErrorMessage = Template.bind({});
CustomErrorMessage.args = {
  name: 'field',
  label: 'Custom Error Field',
  type: 'text',
  placeholder: 'Custom error message will show here',
  disabled: false,
  maxLength: 250,
  rightIcon: false,
  icon: null,
  customErrorMap: 'This is a custom error message.',
};
