import { FormikTimeField } from '@/components/FormikTimeField/FormikTimeField';
import '@/components/FormikTimeField/FormikTimeField.css';
import { Meta, StoryFn } from '@storybook/react';
import { Formik } from 'formik';
import 'rc-time-picker/assets/index.css';
import React from 'react';
import { object, string } from 'yup';

export default {
  title: 'Components/FormikTimeField',
  component: FormikTimeField,
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    isDisabled: { control: 'boolean' },
    use12Hours: { control: 'boolean' },
    value: { control: 'text' },
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof FormikTimeField>> = (args) => {
  const validationSchema = object({
    time: string().required('Time is required'),
  });

  return (
    <Formik
      initialValues={{ time: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.error(values)}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormikTimeField {...args} validationSchema={validationSchema} errors="Time " />
        </form>
      )}
    </Formik>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'time',
  label: 'Select Time',
  isDisabled: false,
  use12Hours: true,
  value: '',
};

export const WithPreFilledTime = Template.bind({});
WithPreFilledTime.args = {
  name: 'time',
  label: 'Select Time',
  isDisabled: false,
  use12Hours: false,
  value: '14:30', // Pre-filled with a 24-hour formatted time
};

export const DisabledField = Template.bind({});
DisabledField.args = {
  name: 'time',
  label: 'Select Time',
  isDisabled: true,
  use12Hours: true,
  value: '',
};

export const WithError = Template.bind({});
WithError.args = {
  name: 'time',
  label: 'Select Time',
  isDisabled: false,
  use12Hours: true,
  value: '',
};
