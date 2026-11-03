/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISite } from '@/lib/interface/IAccount.interface';
import { BusinessUnitService } from '@/lib/service';
import { useCallback, useEffect, useState } from 'react';
import Select, {
  GroupBase, MultiValue, OptionsOrGroups, SingleValue,
} from 'react-select';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import { Option } from '../types';

interface SiteSelectProps {
  slug: string;
  isMulti?: boolean;
  value?: string[];
  onChange: (option: Option | Option[]) => void;
  isDisabled?: boolean;
  placeholder?: string;
}

export default function SiteSelect({
  isMulti = false,
  value,
  onChange,
  isDisabled = false,
  placeholder = 'Select Business Unit',
  slug,
}: SiteSelectProps) {
  const [options, setOptions] = useState<OptionsOrGroups<Option, GroupBase<Option>>>([]);

  const loadOptions = useCallback(
    async (): Promise<OptionsOrGroups<Option, GroupBase<Option>>> => {
      const res = await BusinessUnitService.getSites(slug);
      const {
        site: sites,
      } = res?.data as unknown as { site: ISite[] };
      const newOptions = sites?.map((site) => ({
        label: `${site?.business_unit?.name} - ${site?.name} - ${site?.location}`,
        value: site.id.toString(),
      })) || [];
      return newOptions || [];
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    loadOptions().then((options: any) => {
      setOptions(options as OptionsOrGroups<Option, GroupBase<Option>>);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      id="sector"
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
      inputId="sector"
    />
  );
}
