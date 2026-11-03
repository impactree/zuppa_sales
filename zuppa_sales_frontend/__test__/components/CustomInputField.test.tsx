import { CustomInputField } from '@/components/InputField/CustomInputField';
import { CustomInputFieldProps } from '@/components/types';
import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const renderComponent = (props: Partial<CustomInputFieldProps>) => {
  return render(
    <Formik
      initialValues={{ fieldName: '' }}
      onSubmit={() => { }}
      validationSchema={props.validationSchema}
    >
      <Form>
        <Field name="fieldName">
          {({ field }: any) => (
            <CustomInputField
              label="Test Label"
              field={field}
              validationSchema={undefined}
              error={undefined}
            >
              <input type="text" {...field} data-testid="Test Label" />
            </CustomInputField>
          )}
        </Field>
      </Form>
    </Formik>
  );
};

test('renders with the correct label', () => {
  renderComponent({});
  expect(screen.getByText('Test Label')).toBeInTheDocument();
});

test('displays required asterisk when field is required in validation schema', () => {
  const validationSchema = Yup.object().shape({
    fieldName: Yup.string().required(),
  });

  renderComponent({ validationSchema });
  expect(screen.getByTestId('Test Label')).toBeInTheDocument();
});

test('displays required asterisk when isCustomRequired is true', () => {
  renderComponent({ isCustomRequired: true });
  expect(screen.getByTestId('Test Label')).toBeInTheDocument();
});

test('renders child components', () => {
  renderComponent({});
  const inputElement = screen.getByRole('textbox');
  expect(inputElement).toBeInTheDocument();
});

test('displays an error message when the error prop is provided', () => {
  renderComponent({ error: 'This is a required field' });
  expect(screen.getByTestId('Test Label')).toBeInTheDocument();
});
