import Select, { MultiValue, SingleValue } from 'react-select';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import { Option } from '../types';

interface InputSelectProps {
  isMulti?: boolean;
  value?: string | string[] | undefined | null;
  onChange: (option: Option | Option[]) => void;
  isDisabled?: boolean;
  placeholder?: string;
  options: Option[];
  isClearable?: boolean;
}

export default function InputSelectField({
  isMulti = false,
  value,
  onChange,
  isDisabled = false,
  placeholder = 'Select Value',
  options,
  isClearable = false,
}: InputSelectProps) {
  const handleChange = (newValue: MultiValue<Option> | SingleValue<Option>) => {
    if (isMulti) {
      onChange(newValue as Option[]);
    } else {
      onChange(newValue as Option);
    }
  };
  const getValues = () => {
    if (isMulti) {
      if (Array.isArray(value)) {
        return options.filter((opt) => value.some((v) => v === opt.value));
      }
      return [];
    }
    if (typeof value === 'string') {
      return options?.find((opt) => opt.value === value);
    }
    return undefined;
  };

  return (
    <Select
      id="Industries"
      value={getValues()}
      onChange={handleChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      isDisabled={isDisabled}
      styles={CustomStyles}
      isClearable={isClearable}
      classNamePrefix="custom_select_input"
      data-testid="customSelect"
      inputId="Industries"
    />
  );
}
