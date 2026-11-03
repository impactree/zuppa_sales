import CustomCheckbox from '@/components/Checkbox/Checkbox';
import { CustomCheckboxProps } from '@/components/types';
import { Meta, StoryFn } from '@storybook/react';
import { Form, Formik } from 'formik';

export default {
  title: 'Components/CustomCheckbox',
  component: CustomCheckbox,
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
    type: { control: { type: 'select', options: ['checkbox'] } },
    isDisabled: { control: 'boolean' },
    errors: { control: 'object' },
  },
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<CustomCheckboxProps> = (args) => (
  <Formik
    initialValues={{ name: false }}
    onSubmit={(values) => console.error(values)}
  >
    <Form>
      <CustomCheckbox {...args} />
    </Form>
  </Formik>
);

export const Default = Template.bind({});
Default.args = {
  name: 'customCheckbox',
  label: 'Accept Terms and Conditions',
  type: 'checkbox',
  isDisabled: false,
  errors: {},
};

export const WithError = Template.bind({});
WithError.args = {
  name: 'customCheckbox',
  label: 'Accept Terms and Conditions',
  type: 'checkbox',
  isDisabled: false,
  errors: { customCheckbox: 'This field is required' },
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: 'customCheckbox',
  label: 'Accept Terms and Conditions',
  type: 'checkbox',
  isDisabled: true,
  errors: {},
};
