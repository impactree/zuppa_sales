import { FieldInputProps } from 'formik';
import Select, { components } from 'react-select';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import { CustomSelectProps, Option } from '../types';
import { Pill } from '../Pill/Pill';

export const getValue = (
  options: Option[] | undefined,
  isMulti: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldInputProps<any> | undefined,
  value: Option | null | undefined | string,
): Option | Option[] | undefined | null | string => {
  if (!options) {
    return isMulti ? [] : null;
  }

  if (!field?.value) {
    if (isMulti) {
      return (
        options.filter((option) => (Array.isArray(value)
          ? (value as Option[]).some(
            (val) => val.value === option.value || val.label === option.label,
          )
          : false)) ?? ''
      );
    }
    return (
      options.find((option) => (typeof value === 'object'
        ? option?.value === value?.value || option?.label === value?.label
        : option?.value === value || option?.label === value)) ?? ''
    );
  }

  if (isMulti) {
    return (
      options.filter((option) => field.value?.some(
        (val: string) => val === option.value || val === option.label,
      )) ?? ''
    );
  }
  return (
    options.find(
      (option) => option?.value === field.value
        || (typeof value === 'object' && option?.label === value?.label)
        || (typeof value === 'string' && option?.label === value),
    ) ?? ''
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomOption = (props: any) => (
  <components.Option {...props}>
    <div className="border-0">
      <div className="p-0">
        <div className=" d-flex align-items-center justify-content-between  ">
          <div className=" d-flex align-items-center">
            <div style={{ paddingInlineStart: '.7rem' }}>
              <h6 className="fw-semibold m-0 ">{props?.data?.label}</h6>
            </div>
          </div>
          {props?.data?.isDisabled && (
          <div>
            <Pill pillText="Up coming" />
          </div>
          )}
        </div>
      </div>
    </div>
  </components.Option>
);

function CustomSelect({
  className = '',
  placeholder = 'Select...',
  field,
  form,
  id,
  isDisabled,
  options,
  isMulti = false,
  value,
  isClearable = true,
  onFieldUpdate,
  isCustomOption = false,
}: CustomSelectProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (option: any) => {
    if (onFieldUpdate) {
      onFieldUpdate(option);
    }
    form?.setFieldValue(
      field?.name ?? '',
      isMulti
        ? (option as Option[])?.map((item) => item?.value)
        : (option as Option)?.value,
    );
  };

  return (
    <Select
      className={className}
      components={isCustomOption ? { Option: CustomOption } : undefined}
      name={field?.name}
      id={id}
      value={getValue(options, isMulti, field, value)}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      isDisabled={isDisabled}
      isClearable={isClearable}
      styles={CustomStyles}
      classNamePrefix="custom_select_input"
      data-testid="customSelect"
      inputId={field?.name}
    />
  );
}

export default CustomSelect;
