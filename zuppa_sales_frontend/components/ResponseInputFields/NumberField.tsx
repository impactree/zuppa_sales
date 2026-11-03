/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormControl, InputGroup } from 'react-bootstrap';
import { TextFieldProps } from '../types';
import './NumberField.css';

export function NumberField({
  type = 'number',
  isValid,
  autoFocus,
  placeholder = 'Enter Value',
  disabled = false,
  maxLength,
  rightIcon,
  icon,
  onBlur,
  as = 'input',
  onChange,
  unit,
  value,
  error,
  // isCustomRequired,
  // isMixed = false,
}: TextFieldProps) {
  return (
    <div className="position-relative">
      <FormControl
        type={type}
        as={as as any}
        autoFocus={!!autoFocus}
        value={value}
        onChange={onChange}
        isInvalid={!isValid}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        autoComplete="none"
        onBlur={onBlur}
        onFocus={onBlur}
        onWheel={(e) => {
          if (e?.target instanceof HTMLInputElement) {
            e.target.blur();
          }
        }}
      />
      {error ? (
        // Bootstrap invalid feedback
        // Note: FormControl uses `isInvalid={!isValid}` above
        <div className="invalid-feedback d-block">{error}</div>
      ) : null}
      {unit && <InputGroup.Text className="unit-css">{unit}</InputGroup.Text>}
      {rightIcon && !disabled ? (
        <span className="number-icon-css">{icon}</span>
      ) : null}
    </div>
  );
}
