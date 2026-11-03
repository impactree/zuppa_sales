/* eslint-disable @typescript-eslint/no-explicit-any */

import { getIn } from 'formik';
import {
  FormControl, FormGroup, FormLabel, InputGroup,
} from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { InputFieldProps } from '../types';
import './inputField.css';

// eslint-disable-next-line max-len
const isRequiredField = (validationSchema: any, name: string) => !!getIn(validationSchema?.describe().fields, name)?.tests?.find(
  (obj: { name: string }) => obj?.name === 'required' || obj?.name === 'min' || obj?.name === 'max',
);
export function InputField({
  validationSchema,
  label,
  type = 'text',
  field,
  isValid,
  autoFocus,
  error,
  placeholder,
  disabled = false,
  isPassword,
  setPasswordIcon,
  passwordIcon,
  maxLength,
  rightIcon,
  icon,
  onBlur,
  as = 'input',
  onChange,
  unit,
  value,
  isCustomRequired,
  isSideBySide = false,
}: InputFieldProps) {
  return (
    <FormGroup
      controlId={field.name}
      className="position-relative form-margin-bottom"
    >
      <div
        className={` position-relative ${isSideBySide ? 'd-lg-flex justify-content-lg-between ' : ''}`}
      >
        <FormLabel className={`form_label ${isSideBySide ? '' : ''}`}>
          {label}
          {(isCustomRequired
            || isRequiredField(validationSchema, field.name)) && (
            <span className=" textSecondary"> *</span>
          )}
          {isSideBySide ? (
            <div className="fs-12 settings-card-subtitle fw-normal">
              {placeholder}
            </div>
          ) : (
            ''
          )}
        </FormLabel>
        <div
          className={`position-relative ${isSideBySide ? 'settings-form-input-container' : ''}`}
        >
          <FormControl
            type={type}
            as={as as any}
            autoFocus={!!autoFocus}
            value={value ?? field.value}
            onChange={onChange ?? field.onChange}
            isInvalid={!isValid}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            autoComplete="none"
            onBlur={onBlur}
            onFocus={onBlur}
          />
          {isPassword
            && (passwordIcon ? (
              <span
                aria-hidden="true"
                className={isSideBySide ? 'side-by-side-icon-css' : 'icon-css'}
                data-testid="password-eye-icon"
                onClick={() => {
                  if (setPasswordIcon) {
                    setPasswordIcon(!passwordIcon);
                  }
                }}
              >
                <AiFillEye color="var(--textLight)" />
              </span>
            ) : (
              <span
                aria-hidden="true"
                className={isSideBySide ? 'side-by-side-icon-css' : 'icon-css'}
                data-testid="password-eye-invisible-icon"
                onClick={() => {
                  if (setPasswordIcon) {
                    setPasswordIcon(!passwordIcon);
                  }
                }}
              >
                <AiFillEyeInvisible color="var(--textLight)" />
              </span>
            ))}
          {unit && (
            <InputGroup.Text className="unit-css">{unit}</InputGroup.Text>
          )}
          {rightIcon && (
            <span
              className={isSideBySide ? 'side-by-side-icon-css' : 'icon-css'}
            >
              {icon}
            </span>
          )}
          {isSideBySide && error && (
            <div
              className={`${isSideBySide ? 'error-message-side' : 'error-message'}${error.length > 50 ? 'long' : ''}`}
            >
              {error}
            </div>
          )}
        </div>
      </div>
      {!isSideBySide && error && (
        <div
          className={`${isSideBySide ? 'error-message-side' : 'error-message'}${error.length > 50 ? 'long' : ''}`}
        >
          {error}
        </div>
      )}
    </FormGroup>
  );
}
