import {
  Field, FieldProps, FormikHelpers, FormikValues,
} from 'formik';
import { ChangeEvent } from 'react';
import { CustomCheckboxInputField } from '../InputField/CustomCheckboxInputField';
import { CustomCheckboxProps } from '../types';
// import { usePathname } from 'next/navigation';

export default function CustomCheckbox({
  name,
  label,
  errors,
  validationSchema,
  isDisabled = false,
  type,
  onChange,
}: Readonly<CustomCheckboxProps>) {
  // const pathname = usePathname();
  const updateValue = (
    event: ChangeEvent<HTMLInputElement>,
    form: FormikHelpers<FormikValues>,
  ) => {
    if (onChange) {
      onChange(event);
    } else {
      form.setFieldValue(name, event?.target?.checked);
    }
  };

  return (
    <Field name={name} className="position-relative">
      {({ field, form }: FieldProps<FormikValues>) => {
        const inputId = `customCheckbox_${name}`;
        return (
          <CustomCheckboxInputField
            validationSchema={validationSchema}
            label={label}
            error={errors?.[name]}
            field={field}
            isCustomRequired={false}
          >
            <Field
              type={type}
              checked={field?.value}
              name={field}
              id={inputId}
              data-testid={inputId}
              disabled={isDisabled}
              value={field?.value}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                updateValue(event, form);
              }}
            />
          </CustomCheckboxInputField>
        );
      }}
    </Field>
  );
}
