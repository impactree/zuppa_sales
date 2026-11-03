/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ISector } from '@/lib/interface/ISector.interface';
import { UserService } from '@/lib/service';
import { useCallback, useEffect, useState } from 'react';
import Select, {
  GroupBase, MultiValue, OptionsOrGroups, SingleValue,
} from 'react-select';
import { IIndustries } from '@/lib/interface/IIndustries.interface';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import { Option } from '../types';

interface IndustriesSelectProps {
  slug: string;
  sectorId: string;
  isMulti?: boolean;
  value?: string[];
  onChange: (option: Option | Option[]) => void;
  isDisabled?: boolean;
  placeholder?: string;
}

export default function IndustriesSelect({
  isMulti = false,
  value,
  onChange,
  isDisabled = false,
  placeholder = 'Select Industries',
  slug,
  sectorId,
}: IndustriesSelectProps) {
  const [options, setOptions] = useState<OptionsOrGroups<Option, GroupBase<Option>>>([]);

  const loadOptions = useCallback(
    async (): Promise<OptionsOrGroups<Option, GroupBase<Option>>> => {
      if (sectorId) {
        const res = await UserService.getIndustryListById(slug, sectorId);
        const { sector } = res?.data as unknown as { sector: ISector };
        const newOptions = sector?.industry?.map((industry: IIndustries) => ({
          label: industry.name,
          value: industry.id.toString(),
          isDisabled: industry?.status === 'INACTIVE',
        })) || [];
        return newOptions || [];
      }
      return [];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sectorId],
  );

  useEffect(() => {
    if (sectorId) {
      // eslint-disable-next-line no-shadow
      loadOptions().then((options: any) => {
        setOptions(options as OptionsOrGroups<Option, GroupBase<Option>>);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectorId]);

  const handleChange = (
    newValue: MultiValue<Option> | SingleValue<Option>,
  ) => {
    if (isMulti) {
      onChange(newValue as Option[]);
    } else {
      onChange(newValue as Option);
    }
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
    <Select
      id="Industries"
      value={getValues()}
      onChange={handleChange}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      isDisabled={isDisabled}
      styles={CustomStyles}
      isClearable={false}
      classNamePrefix="custom_select_input"
      data-testid="customSelect"
      inputId="Industries"
    />
  );
}
