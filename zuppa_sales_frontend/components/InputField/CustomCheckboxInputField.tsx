import { getIn } from 'formik';
import { FormGroup, FormLabel } from 'react-bootstrap';
import { CustomInputFieldProps } from '../types';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRequiredField = (validationSchema: any, name: string) => !!getIn(
  validationSchema?.describe().fields,
  name,
  (obj: { name: string }) => (
    obj.name === 'required'
    || obj.name === 'min'
    || obj.name === 'max'),
);

export function CustomCheckboxInputField({
  validationSchema,
  label,
  field,
  error,
  children,
  isCustomRequired,
}: CustomInputFieldProps) {
  return (
    <FormGroup controlId={field?.name} className="position-relative">
      <div className="d-flex align-items-center">
        {children}
        {label && (
          <FormLabel className="form_label ms-2 mb-0">
            {label}
            {' '}
            {(isCustomRequired
              ?? isRequiredField(validationSchema, field.name))
              && '*'}
          </FormLabel>
        )}
      </div>
      {error && (
        <div className={`error-message ${error.length > 57 ? 'long' : ''}`}>
          {error}
        </div>
      )}
    </FormGroup>
  );
}
