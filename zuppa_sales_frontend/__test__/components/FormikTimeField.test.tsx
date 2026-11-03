import { FormikTimeField, onChangeTime } from '@/components/FormikTimeField/FormikTimeField';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Formik } from 'formik';
import moment from 'moment';
import { object, string } from 'yup';

const validationSchema = object().shape({
  time: string()
    .required("Field is required")
    .max(50, "Field must be at most 50 characters long"),
});


const mockOnChange = jest.fn();
const mockSetFieldValue = jest.fn();

test('calls onChangeTime when the time changes', () => {
  const mockForm = { setFieldValue: mockSetFieldValue };
  const newValue = moment('11:00', 'HH:mm');

  onChangeTime(newValue, false, mockOnChange, mockForm, 'time');
  expect(mockOnChange).toHaveBeenCalledWith('11:00');

  onChangeTime(newValue, false, undefined, mockForm, 'time');
  expect(mockSetFieldValue).toHaveBeenCalledWith('time', '11:00');
});

test('updates the form value when time changes', () => {
  const { getByTestId } = render(
    <Formik
      initialValues={{ time: '' }}
      onSubmit={() => { }}
    >
      {({ setFieldValue }) => (
        <FormikTimeField
          name="time"
          label="Time"
          errors={"Time is required"}
          validationSchema={validationSchema}
          isDisabled={false}
          use12Hours={false}
          onChange={mockOnChange}
        />
      )}
    </Formik>
  );

  expect(mockOnChange).toHaveBeenCalledWith('11:00');
});

test('disables the time picker when isDisabled is true', () => {
  render(
    <Formik initialValues={{ time: '' }} onSubmit={() => { }}>
      <FormikTimeField
        name="time"
        label="Time"
        errors={"Time is required"}
        validationSchema={validationSchema}
        isDisabled
        use12Hours={false}
        value="10:00"
      />
    </Formik>
  );

});

test('displays validation errors', () => {
  const { getByText } = render(
    <Formik initialValues={{ time: '' }} onSubmit={() => { }}>
      <FormikTimeField
        name="time"
        label="Time"
        errors="Time is required"
        validationSchema={validationSchema}
        isDisabled={false}
        use12Hours={false}
      />
    </Formik>
  );

  expect(getByText('Time is required')).toBeInTheDocument();
});
