import {
  Field, FieldProps,
  FormikValues,
} from 'formik';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { CustomInputField } from '../InputField/CustomInputField';
import { FormikTimeFieldProps } from '../types';
import './FormikTimeField.css';

export const onChangeTime = (
  newValue: moment.Moment,
  use12Hours: boolean | undefined,
  onChange: ((time: string) => void) | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any,
  name: string,
) => {
  const formattedTime = newValue.format(use12Hours ? 'h:mm a' : 'HH:mm');
  if (onChange) {
    onChange(formattedTime);
  } else {
    form.setFieldValue(name, formattedTime);
  }
};

export function FormikTimeField({
  name,
  label,
  errors,
  validationSchema,
  isDisabled,
  value,
  use12Hours,
  onChange,
}: FormikTimeFieldProps) {
  const inputId = `formikDateField_${name}`;

  return (
    <Field
      name={name}
      data-testid={inputId}
    >
      {({ field, form }: FieldProps<FormikValues>) => {
        const defaultValue = moment(
          value ?? form.values[name] ?? '00:00',
          use12Hours ? 'h:mm a' : 'HH:mm',
        );
        return (
          <CustomInputField
            validationSchema={validationSchema}
            label={label}
            error={errors}
            field={field}
          >
            <TimePicker
              id={inputId}
              data-testid={inputId}
              showSecond={false}
              defaultValue={defaultValue}
              className="form-control xxx"
              onChange={(newValue) => {
                onChangeTime(newValue, use12Hours, onChange, form, name);
              }}
              disabled={isDisabled}
              format={use12Hours ? 'h:mm a' : 'HH:mm'}
              use12Hours={use12Hours}
            />
          </CustomInputField>
        );
      }}
    </Field>
  );
}
