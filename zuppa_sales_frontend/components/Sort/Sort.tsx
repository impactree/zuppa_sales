'use client';

import { Params, updateQueryParams } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Select from 'react-select';
import { CustomStyles } from '../CustomStyles/CustomStyles';

export default function Sort({
  params,
}: Readonly<{
  params: Params;
}>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sortOptions = pathname?.endsWith('/tasks')
    ? [
      {
        value: 'createdAt',
        label: 'Date - Ascending',
      },
      {
        value: '-createdAt',
        label: 'Date - Recent',
      },
    ]
    : [
      {
        value: 'createdAt',
        label: 'Date - Ascending',
      },
      {
        value: '-createdAt',
        label: 'Date - Recent',
      },
      { value: 'name', label: 'Name (A-Z)' },
      { value: '-name', label: 'Name (Z-A)' },
    ];
  const value = searchParams?.get('sort') ?? '-createdAt';
  const [sortValue, setSortValue] = useState<string>(
    value,
  );

  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="min-width-select">
      <Select
        className="w-100"
        name=""
        onChange={(e) => {
          setShow(!show);
          setSortValue(e?.value as string);
          updateQueryParams(
            {
              sort: e?.value as string,
              page: '1',
            },
            router,
            params,
            pathname,
          );
        }}
        options={sortOptions}
        value={sortOptions?.find((item) => item?.value === sortValue)}
        isMulti={false}
        isSearchable={false}
        styles={CustomStyles}
        classNamePrefix="select-wrapper"
      />
    </div>
  );
}
