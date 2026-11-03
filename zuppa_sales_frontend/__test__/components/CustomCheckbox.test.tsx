import CustomCheckbox from '@/components/Checkbox/Checkbox';
import { CustomCheckboxProps } from '@/components/types';
import { fireEvent, render, screen } from '@testing-library/react';
import { Formik } from 'formik';

jest.mock('@/components/InputField/CustomCheckboxInputField', () => ({
  CustomCheckboxInputField: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const defaultProps: CustomCheckboxProps = {
  name: 'acceptTerms',
  label: 'Accept Terms',
  errors: {},
  isDisabled: false,
  type: 'checkbox',
  onChange: jest.fn(),
};

const renderComponent = (props = {}) => {
  return render(
    <Formik initialValues={{ acceptTerms: false }} onSubmit={() => {}}>
      <CustomCheckbox {...defaultProps} {...props} />
    </Formik>
  );
};

test('renders CustomCheckbox with label', () => {
  renderComponent();

  expect(screen.getByTestId('customCheckbox_acceptTerms')).toBeInTheDocument();
});

test('toggles the checkbox when clicked', () => {
  renderComponent();

  const checkbox = screen.getByTestId('customCheckbox_acceptTerms') as HTMLInputElement;

  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(false);
  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(false);
});

test('calls onChange callback when clicked', () => {
  renderComponent();

  const checkbox = screen.getByTestId('customCheckbox_acceptTerms') as HTMLInputElement;

  fireEvent.click(checkbox);
  expect(defaultProps.onChange).toHaveBeenCalledTimes(3);

  fireEvent.click(checkbox);
  expect(defaultProps.onChange).toHaveBeenCalledTimes(4);
});

test('checkbox is disabled when isDisabled is true', () => {
  renderComponent({ isDisabled: true });

  const checkbox = screen.getByTestId('customCheckbox_acceptTerms') as HTMLInputElement;

  expect(checkbox.disabled).toBe(true);
});

test('sets field value correctly in Formik', async () => {
  renderComponent();

  const checkbox = screen.getByTestId('customCheckbox_acceptTerms') as HTMLInputElement;

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(false);
});

test('shows error message if there is an error', () => {
  renderComponent({ errors: { acceptTerms: 'You must accept the terms' } });

  expect(screen.getByTestId('customCheckbox_acceptTerms')).toBeInTheDocument();
});
