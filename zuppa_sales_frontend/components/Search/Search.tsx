'use client';

import { updateQueryParams } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { ISearchProps } from '../types';
import './Search.css';

// Update the interface to include paramName
interface UpdatedSearchProps extends ISearchProps {
  paramName?: string; // Add this new prop
}

export default function Search({
  params = {},
  className,
  placeholder,
  paramName = 'search', // Default to 'search' for backward compatibility
}: UpdatedSearchProps) {
  // Use the paramName to get the correct value from params
  const [search, setSearch] = useState(params?.[paramName] ?? '');
  const pathname = usePathname();
  const router = useRouter();

  const onSearch = () => {
    // Create dynamic object with the paramName as key
    const queryParams = {
      [paramName]: search,
      page: 1,
    };
    updateQueryParams(queryParams, router, params, pathname);
  };

  const searchOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
    // Create dynamic object with the paramName as key
    const queryParams = {
      [paramName]: e?.target?.value,
      page: 1,
    };
    updateQueryParams(queryParams, router, params, pathname);
  };

  return (
    <div
      className={` position-relative search_Input ${className} `}
      style={{ cursor: 'pointer' }}
    >
      <input
        type="text"
        name="searchInput"
        placeholder={placeholder || 'Search'}
        className="w-100"
        maxLength={50}
        onChange={searchOnchange}
        value={search as string}
      />
      <span
        className=" search_icon "
        aria-hidden="true"
        onClick={() => onSearch()}
      >
        <IoSearch
          data-testid="search-icon"
          color="var(--textLight)"
          fontSize={20}
        />
      </span>
    </div>
  );
}
