import { getIn } from 'formik';
import { FormGroup, FormLabel } from 'react-bootstrap';
import { CustomInputFieldProps } from '../types';
import './CustomInputField.css';

const isRequiredField = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: any,
  name: string,
) => !!getIn(validationSchema?.describe().fields, name)?.tests?.find(
  (obj: { name: string }) => obj?.name === 'required' || obj?.name === 'min' || obj?.name === 'max',
);

export function CustomInputField({
  validationSchema,
  label,
  field,
  error,
  children,
  isCustomRequired,
  isSideBySide = false,
  placeholder,
}: CustomInputFieldProps) {
  return (
    <FormGroup
      controlId={field?.name}
      className="position-relative form-margin-bottom"
    >
      <div
        className={isSideBySide ? 'd-lg-flex justify-content-lg-between mb-4' : ''}
      >
        <FormLabel className="form_label ms-0">
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
        <div className={isSideBySide ? 'settings-form-input-container' : ''}>
          {children}
          {isSideBySide && error && (
            <div
              className={`select-error-message-side ${error.length > 57 ? 'long' : ''}`}
            >
              {error}
            </div>
          )}
        </div>
      </div>
      {!isSideBySide && error && (
        <div
          className={`select-error-message ${error.length > 57 ? 'long' : ''}`}
        >
          {error}
        </div>
      )}
    </FormGroup>
  );
}
