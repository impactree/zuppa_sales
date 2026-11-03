import { FormikDateField } from '@/components/FormikDateField/FormikDateField';
import { Meta, StoryFn } from '@storybook/react';
import { Formik } from 'formik';
import React from 'react';
import { object, string } from 'yup';

export default {
  title: 'Components/FormikDateField',
  component: FormikDateField,
  argTypes: {
    name: { control: 'text' },
    label: { control: 'text' },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
    isDisabled: { control: 'boolean' },
    onlyMonthPicker: { control: 'boolean' },
    onlyYearPicker: { control: 'boolean' },
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof FormikDateField>> = (args) => {
  const validationSchema = object({
    date: string().required('Date is required'),
  });

  return (
    <Formik
      initialValues={{ date: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.error(values)}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormikDateField
            {...args}
            validationSchema={validationSchema}
            minDate="2023-01-01"
            maxDate="2050-12-31"
          />
        </form>
      )}
    </Formik>
  );
};

export const Default = Template.bind({});
Default.args = {
  name: 'date',
  label: 'Select a Date',

  isDisabled: false,
  onlyYearPicker: false,
  onlyMonthPicker: false,
};

export const MonthPicker = Template.bind({});
MonthPicker.args = {
  name: 'date',
  label: 'Select a Month',
  minDate: '2023-01-01',
  maxDate: '2050-12-31',
  isDisabled: false,
  onlyMonthPicker: true,
  onlyYearPicker: false,
};

export const YearPicker = Template.bind({});
YearPicker.args = {
  name: 'date',
  label: 'Select a Year',
  minDate: '2020-01-01',
  maxDate: '2025-12-31',
  isDisabled: false,
  onlyMonthPicker: false,
  onlyYearPicker: true,
};

export const DisabledDatePicker = Template.bind({});
DisabledDatePicker.args = {
  name: 'date',
  label: 'Select a Date',
  minDate: '2023-01-01',
  maxDate: '2050-12-31',
  isDisabled: true,
  onlyYearPicker: false,
  onlyMonthPicker: false,
};

export const WithError = Template.bind({});
WithError.args = {
  name: 'date',
  label: 'Select a Date',
  minDate: '2023-01-01',
  maxDate: '2050-12-31',
  isDisabled: false,
  onlyYearPicker: false,
  onlyMonthPicker: false,
};
