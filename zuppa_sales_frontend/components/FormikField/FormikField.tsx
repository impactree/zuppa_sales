import { Field, FieldProps } from 'formik';
import { usePathname } from 'next/navigation';
import { InputField } from '../InputField/InputField';
import { FormikFieldProps } from '../types';

export function FormikField({
  validationSchema,
  errors,
  label,
  type,
  name,
  autoFocus,
  placeholder,
  disabled,
  as,
  isPassword,
  setPasswordIcon,
  passwordIcon,
  maxLength,
  rightIcon,
  icon,
  onBlur,
  onChange,
  unit,
  value,
  customErrorMap,
  isCustomRequired,
}: FormikFieldProps) {
  const pathname = usePathname();
  return (
    <Field name={name} autoComplete="none">
      {({ field }: FieldProps) => (
        <InputField
          validationSchema={validationSchema}
          label={label}
          error={customErrorMap ?? errors?.[name]}
          type={type}
          autoFocus={autoFocus}
          field={field}
          isValid={customErrorMap ? !customErrorMap : !errors?.[name]}
          placeholder={placeholder}
          disabled={disabled}
          as={as}
          isPassword={isPassword}
          setPasswordIcon={setPasswordIcon}
          passwordIcon={passwordIcon}
          maxLength={maxLength ?? 250}
          rightIcon={rightIcon}
          icon={icon}
          onBlur={onBlur}
          onChange={onChange}
          unit={unit}
          value={value}
          isCustomRequired={isCustomRequired}
          isSideBySide={!!(pathname?.startsWith('/settings') && !pathname?.includes('business_unit'))}
        />
      )}
    </Field>
  );
}
