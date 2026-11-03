import { FormikPhoneNumber } from '@/components/FormikPhoneNumber/FormikPhoneNumber';
import '@/components/FormikPhoneNumber/FormikPhoneNumber.css';
import { Meta, StoryFn } from '@storybook/react';
import { Formik } from 'formik';
import React from 'react';
import 'react-phone-number-input/style.css';
import { object, string } from 'yup';

export default {
  title: 'Components/FormikPhoneNumber',
  component: FormikPhoneNumber,
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isInternational: { control: 'boolean' },
    value: { control: 'text' },
    isCustomRequired: { control: 'boolean' },
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof FormikPhoneNumber>> = (args) => {
  const validationSchema = object({
    phoneNumber: string().required('Phone number is required'),
  });

  return (
    <Formik
      initialValues={{ phoneNumber: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.error(values)}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormikPhoneNumber {...args} validationSchema={validationSchema} errors="Phone number is required" />
        </form>
      )}
    </Formik>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'phoneNumber',
  label: 'Phone Number',
  isDisabled: false,
  isInternational: true,
  value: '',
  isCustomRequired: false,
};

export const DisabledField = Template.bind({});
DisabledField.args = {
  name: 'phoneNumber',
  label: 'Phone Number',
  isDisabled: true,
  isInternational: true,
  value: '',
  isCustomRequired: false,
};

export const WithPhoneNumber = Template.bind({});
WithPhoneNumber.args = {
  name: 'phoneNumber',
  label: 'Phone Number',
  isDisabled: false,
  isInternational: true,
  value: '+1234567890',
  isCustomRequired: false,
};

export const WithError = Template.bind({});
WithError.args = {
  name: 'phoneNumber',
  label: 'Phone Number',
  isDisabled: false,
  isInternational: true,
  value: '',
  isCustomRequired: false,
};
