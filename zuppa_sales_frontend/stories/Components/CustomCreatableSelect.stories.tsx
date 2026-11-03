import { CustomCreatableSelect } from '@/components/CustomCreatableSelect/CustomCreatableSelect';
import { CustomCreatableSelectProps, Option } from '@/components/types';
import { Meta, StoryFn } from '@storybook/react';
import { Form, Formik } from 'formik';

export default {
  title: 'Components/CustomCreatableSelect',
  component: CustomCreatableSelect,
  argTypes: {
    placeholder: { control: 'text' },
    isMulti: { control: 'boolean' },
    isClearable: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    displayName: { control: 'text' },
    maxLength: { control: 'number' },
  },
  tags: ['autodocs'],
} as Meta;

const isMulti = false;

const Template: StoryFn<CustomCreatableSelectProps> = (args) => {
  const options: Option[] = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <Formik
      initialValues={{ customSelect: isMulti ? [] : '' }}
      onSubmit={(values) => console.error('Submitted values:', values)}
    >
      {({
        values, handleChange, handleBlur, setFieldValue,
      }) => (
        <Form>
          <CustomCreatableSelect
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
  placeholder: 'Select or create an option...',
  isMulti: false,
  isClearable: true,
  isDisabled: false,
  displayName: 'Create',
  maxLength: 25,
  className: '',
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  placeholder: 'Select or create options...',
  isMulti: true,
  isClearable: true,
  isDisabled: false,
  displayName: 'Add',
  maxLength: 25,
  className: '',
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'This is disabled...',
  isMulti: false,
  isClearable: true,
  isDisabled: true,
  displayName: 'Create',
  maxLength: 25,
  className: '',
};

export const WithCustomCallback = Template.bind({});
WithCustomCallback.args = {
  placeholder: 'Select with callback...',
  isMulti: true,
  isClearable: true,
  isDisabled: false,
  displayName: 'Create',
  maxLength: 25,
  className: '',
  callback: (selectedOptions: Option[]) => console.error('Selected options:', selectedOptions),
};
