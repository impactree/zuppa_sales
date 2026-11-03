import CustomSelect from '@/components/CustomSelect/CustomSelect';
import { CustomSelectProps, Option } from '@/components/types';
import { Meta, StoryFn } from '@storybook/react';
import { Form, Formik } from 'formik';

export default {
  title: 'Components/CustomSelect',
  component: CustomSelect,
  argTypes: {
    placeholder: { control: 'text' },
    isMulti: { control: 'boolean' },
    isClearable: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    className: { control: 'text' },
    onFieldUpdate: { action: 'onFieldUpdate' },
  },
  tags: ['autodocs'],
} as Meta;

const isMulti = false;

const Template: StoryFn<CustomSelectProps> = (args) => {
  const options: Option[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <Formik
      initialValues={{ customSelect: isMulti ? [] : '' }}
      onSubmit={(values) => console.error('Form submitted:', values)}
    >
      {({
        values, handleChange, handleBlur, setFieldValue,
      }) => (
        <Form>
          <CustomSelect
            {...args}
            field={{
              name: 'customSelect',
              value: values.customSelect,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
            form={{
              setFieldValue,
            }}
            options={options}
          />
        </Form>
      )}
    </Formik>
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Select an option...',
  isMulti: false,
  isClearable: true,
  isDisabled: false,
  className: '',
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  placeholder: 'Select multiple options...',
  isMulti: true,
  isClearable: true,
  isDisabled: false,
  className: '',
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'This is disabled...',
  isMulti: false,
  isClearable: true,
  isDisabled: true,
  className: '',
};

export const WithCustomCallback = Template.bind({});
WithCustomCallback.args = {
  placeholder: 'Select with callback...',
  isMulti: true,
  isClearable: true,
  isDisabled: false,
  className: '',
};
