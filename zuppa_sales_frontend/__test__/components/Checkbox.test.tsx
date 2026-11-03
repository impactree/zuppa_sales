import CustomCheckbox from '@/components/Checkbox/Checkbox';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { boolean, object } from 'yup';

const mockOnChange = jest.fn();
const validationSchema = object().shape({
  accept_terms_and_conditions: boolean().oneOf([true], ' ').required(' '),
});

const renderComponent = (props = {}) => {
  render(
    <Formik
      initialValues={{ accept_terms_and_conditions: false }}
      onSubmit={() => { }}
    >
      <CustomCheckbox
        name="accept_terms_and_conditions"
        label="Test Checkbox"
        errors={{}}
        validationSchema={validationSchema}
        type="checkbox"
        onChange={mockOnChange}
        {...props}
      />
    </Formik>,
  );
};

test('renders the checkbox with the correct label', () => {
  renderComponent();
  const checkbox = screen.getByTestId('customCheckbox_accept_terms_and_conditions');
  expect(checkbox).toBeInTheDocument();
  expect(screen.getByText('Test Checkbox')).toBeInTheDocument();
});

test('checkbox is disabled when isDisabled is true', () => {
  renderComponent({ isDisabled: true });
  const checkbox = screen.getByTestId('customCheckbox_accept_terms_and_conditions');
  expect(checkbox).toBeDisabled();
});

test('calls onChange handler when checkbox is clicked', () => {
  renderComponent();
  const checkbox = screen.getByTestId('customCheckbox_accept_terms_and_conditions');

  fireEvent.click(checkbox);
  expect(mockOnChange).toHaveBeenCalled();
});

test('updates form value when onChange is not provided', () => {
  const mockSetFieldValue = jest.fn();
  render(
    <Formik
      initialValues={{ accept_terms_and_conditions: false }}
      onSubmit={() => { }}
    >
      <CustomCheckbox
        name="accept_terms_and_conditions"
        label="Test Checkbox"
        errors={{}}
        validationSchema={validationSchema}
        type="checkbox"
      />
    </Formik>,
  );

  const checkbox = screen.getByTestId('customCheckbox_accept_terms_and_conditions');
  fireEvent.click(checkbox);

  expect(mockSetFieldValue).toHaveBeenCalledTimes(0);
});

test('displays validation error message', () => {
  renderComponent({ errors: { accept_terms_and_conditions: 'Required field' } });
  expect(screen.getByText('Required field')).toBeInTheDocument();
});
