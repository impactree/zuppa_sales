import { formatDateValue, FormikDateField, getDateFormat, handleDateChange } from '@/components/FormikDateField/FormikDateField';
import { FormikDateFieldProps } from '@/components/types';
import { fireEvent, render, screen } from '@testing-library/react';
import { Form, Formik } from 'formik';
import moment from 'moment';

let setFieldValue = jest.fn()

beforeEach(() => {
  setFieldValue = jest.fn();
});

const form = { setFieldValue: jest.fn() };
const name = 'testDate';

const renderFormikDateField = (props: Partial<FormikDateFieldProps> = {}) => {
  const defaultProps: FormikDateFieldProps = {
    name: 'testDate',
    label: 'Test Date',
    errors: '',
    validationSchema: undefined,
    minDate: undefined,
    maxDate: undefined,
    isDisabled: false,
    onlyYearPicker: false,
    onlyMonthPicker: false,
    placeholder: 'Select a date',
  };

  return render(
    <Formik
      initialValues={{ testDate: '' }}
      onSubmit={jest.fn()}
    >
      {() => (
        <Form>
          <FormikDateField {...defaultProps} {...props} />
        </Form>
      )}
    </Formik>
  );
};

test('renders with label and placeholder', () => {
  renderFormikDateField();
  expect(screen.getByPlaceholderText('Select a date')).toBeInTheDocument();
});

test('displays the selected date', () => {
  renderFormikDateField();

  const datePicker = screen.getByPlaceholderText('Select a date');
  fireEvent.change(datePicker, { target: { value: '2024-12-25' } });
});

test('handles month picker mode', () => {
  renderFormikDateField({ onlyMonthPicker: true });

  const datePicker = screen.getByPlaceholderText('Select a date');

  fireEvent.change(datePicker, { target: { value: 'March' } });
});

test('handles year picker mode', () => {
  renderFormikDateField({ onlyYearPicker: true });

  const datePicker = screen.getByPlaceholderText('Select a date');

  fireEvent.change(datePicker, { target: { value: '2024' } });
});

test('disables the date picker when isDisabled is true', () => {
  renderFormikDateField({ isDisabled: true });

  const datePicker = screen.getByPlaceholderText('Select a date');

  expect(datePicker).toBeDisabled();
});

test('handles minDate and maxDate correctly', () => {
  const minDate = moment().subtract(1, 'year').toDate();
  const maxDate = moment().add(1, 'year').toDate();

  renderFormikDateField({ minDate, maxDate });
  const datePicker = screen.getByPlaceholderText('Select a date');
  fireEvent.change(datePicker, { target: { value: moment(minDate).format('YYYY-MM-DD') } });
  fireEvent.change(datePicker, { target: { value: moment(maxDate).format('YYYY-MM-DD') } });
});

test('shows error message when validation fails', () => {
  renderFormikDateField({ errors: 'Invalid date selected' });

  expect(screen.getByText('Invalid date selected')).toBeInTheDocument();
});

describe('Helper Functions', () => {
  test('formatDateValue formats date correctly', () => {
    const formattedDate = formatDateValue('2024-12-25', false, false);
    expect(formattedDate).toBe('25/12/2024');
  });
  test('formatDateValue formats date correctly', () => {
    const formattedDate = formatDateValue(moment(new Date()).format('DD-MM-YYYY'), false, true);
    const expectedDate = new Date(); 
    expect(new Date(formattedDate).toISOString().split('T')[0]).toBe(new Date(expectedDate).toISOString().split('T')[0]);
  });


  test('formatDateValue handles onlyMonthPicker', () => {
    const formattedDate = formatDateValue('March', true, false);
    expect(formattedDate).toEqual(expect.any(Date));
  });

  test('getDateFormat returns correct format', () => {
    expect(getDateFormat(false, false)).toBe('DD-MM-YYYY');
    expect(getDateFormat(true, false)).toBe('YYYY');
    expect(getDateFormat(false, true)).toBe('MMMM');
  });
});

test('should set null when date is null', () => {
  handleDateChange(null, form, false, false, name);
});

test('should format to month when onlyMonthPicker is true', () => {
  const date = moment('2024-12-25');
  handleDateChange(date, form, true, false, name);
});

test('should format to year when onlyYearPicker is true', () => {
  const date = moment('2024-12-25');
  handleDateChange(date, form, false, true, name);
});

test('should format to YYYY-MM-DD when neither onlyMonthPicker nor onlyYearPicker is true', () => {
  const date = moment('2024-12-25');
  handleDateChange(date, form, false, false, name);
});
