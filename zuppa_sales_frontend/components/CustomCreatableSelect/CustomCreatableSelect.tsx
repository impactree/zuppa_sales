/* eslint-disable @typescript-eslint/no-explicit-any */

import { FieldInputProps } from 'formik';
import CreatableSelect from 'react-select/creatable';
import { useState } from 'react';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import { CustomCreatableSelectProps, Option } from '../types';

export const onChange = (
  option: Option,
  form?: {
    setFieldValue: (name: string, value: string | string[]) => void;
  },
  field?: FieldInputProps<any> extends infer F ? F : never,
  isMulti?: boolean,
  callback?: (value: Option[]) => void,
) => {
  form?.setFieldValue(
    field?.name ?? '',
    isMulti
      ? (option as unknown as Option[])?.map((item) => item?.value)
      : option?.value,
  );
  if (callback) {
    const selectedOption = isMulti ? (option as unknown as Option[]) : [option];
    callback(selectedOption);
  }
};

export const getValue = (
  field?: FieldInputProps<any> extends infer F ? F : never,
  isMulti?: boolean,
  options?: Option[],
) => {
  if (!field?.value?.length) {
    return isMulti ? [] : null;
  }

  if (!options?.length) {
    return isMulti
      ? field.value.map((item: string) => ({ label: item, value: item }))
      : { label: field.value, value: field.value };
  }

  if (isMulti) {
    const multiOptions = options.filter(
      (option: Option) => field.value.includes(option.value) ?? field.value.includes(option.label),
    );

    if (multiOptions.length > 0) {
      const uniqueItems = Array.from(
        new Set(
          multiOptions.map((item: Option) => item.label).concat(field.value),
        ),
      );

      return uniqueItems.map((item: string) => ({
        label: item,
        value: item,
      }));
    }
    return field.value.map((item: string) => ({
      label: item,
      value: item,
    }));
  }
  const singleOption = options.find(
    (option: Option) => option.value === field.value || option.label === field.value,
  ) ?? { label: field.value, value: field.value };

  return singleOption ?? { label: field.value, value: field.value };
};

export const onInputChange = (
  input: string,
  setInputValue: (data: string) => void,
  maxLength: number,
) => {
  if (input.length > maxLength) {
    setInputValue(input.substring(0, maxLength));
  } else {
    setInputValue(input);
  }
};

export function CustomCreatableSelect({
  className,
  placeholder,
  field,
  form,
  options,
  isDisabled,
  isMulti = false,
  isClearable = true,
  callback,
  displayName = 'Create',
  maxLength = 25,
}: CustomCreatableSelectProps) {
  const [inputValue, setInputValue] = useState('');

  const inputId = `customCreatableSelect_${field?.name}`;

  return (
    <CreatableSelect
      className={className}
      name={field?.name}
      defaultValue={getValue()}
      onChange={(e) => onChange(e, form, field, isMulti, callback)}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      isDisabled={isDisabled}
      isClearable={isClearable}
      value={getValue()}
      styles={CustomStyles}
      classNamePrefix="select-wrapper"
      id={inputId}
      data-testid={inputId}
      inputId={field?.name}
      formatCreateLabel={(inputText) => `${displayName} "${inputText}"`}
      onInputChange={(newValue) => onInputChange(newValue, setInputValue, maxLength)}
      inputValue={inputValue}
    />
  );
}
