/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormControl, InputGroup } from 'react-bootstrap';
import { TextFieldProps } from '../types';
import './NumberField.css';

function getCleanFileName(url: string): string {
  const fileName = url.split('/').pop() || '';
  return fileName.replace(/^[a-f0-9-]+-/, '');
}

export function TextField({
  type = 'text',
  isValid,
  autoFocus,
  placeholder = 'Enter Text',
  disabled = false,
  maxLength,
  rightIcon,
  icon,
  onBlur,
  onFocus,
  as = 'input',
  onChange,
  onKeyPress,
  unit,
  value,
  className = '',
  error,
}: TextFieldProps) {
  const isFile = type.toLowerCase() === 'file';
  return (
    <div className="position-relative">
      {isFile && value && value.length > 0 ? (
        <div className="form-control file-name-display">
          {value && value.length > 0
            ? getCleanFileName(value as string)
            : 'Choose File'}
        </div>
      ) : (
        <FormControl
          type={isFile ? 'file' : type}
          as={as as any}
          autoFocus={!!autoFocus}
          value={isFile ? undefined : value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          isInvalid={!isValid}
          spellCheck={!isFile}
          autoCorrect={!isFile ? 'on' : 'off'}
          autoCapitalize={!isFile ? 'sentences' : 'off'}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          maxLength={maxLength}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      )}
      {error ? <div className="invalid-feedback d-block">{error}</div> : null}
      {unit && <InputGroup.Text className="unit-css">{unit}</InputGroup.Text>}
      {rightIcon && <span className="number-icon-css">{icon}</span>}
    </div>
  );
}
