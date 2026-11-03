/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProject } from '@/lib/interface/IProject';
import { ProjectService } from '@/lib/service';
import { useCallback, useEffect, useState } from 'react';
import {
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  SingleValue,
} from 'react-select';
import AsyncSelect from 'react-select/async';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import { Option } from '../types';

interface ProjectSelectProps {
  slug: string;
  isMulti?: boolean;
  value?: string;
  onChange: (option: Option) => void;
  isDisabled?: boolean;
  placeholder?: string;
}

export default function ProjectSelect({
  isMulti = false,
  value,
  onChange,
  isDisabled = false,
  placeholder = 'Select Project',
  slug,
}: ProjectSelectProps) {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<
    OptionsOrGroups<Option, GroupBase<Option>>
  >([]);

  const loadOptions = useCallback(
    async (
      input: string,
    ): Promise<OptionsOrGroups<Option, GroupBase<Option>>> => {
      const res = await ProjectService.getProjects(slug, {
        limit: '1000',
        search: input,
      });
      const { projects } = res?.data as {
        projects: IProject[];
      };
      const newOptions = projects?.map((project) => ({
        label: project?.name,
        value: project.id.toString(),
      })) || [];
      return newOptions || [];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    loadOptions('').then((options: any) => {
      setOptions(options as OptionsOrGroups<Option, GroupBase<Option>>);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (newValue: MultiValue<Option> | SingleValue<Option>) => {
    // if (isMulti) {
    //   onChange(newValue as Option[]);
    // } else {
    onChange(newValue as Option);
    // }
  };

  const getValues = () => {
    if (isMulti) {
      return options
        .filter((opt): opt is Option => !('options' in opt))
        .filter((item) => value?.includes(item?.value));
    }
    return options
      .filter((opt): opt is Option => !('options' in opt))
      .find((item) => value?.includes(item?.value));
  };

  return (
    <AsyncSelect
      isMulti={isMulti}
      value={getValues()}
      onChange={handleChange}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onInputChange={(newValue: any) => {
        setInputValue(newValue);
      }}
      defaultOptions={options}
      placeholder={placeholder}
      isDisabled={isDisabled}
      loadOptions={loadOptions}
      inputValue={inputValue}
      styles={CustomStyles}
      isClearable={false}
      classNamePrefix="custom_select_input"
    />
  );
}
