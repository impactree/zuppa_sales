'use client';

import NoDataImg from '@/assests/User.png';
import { IMeta } from '@/lib/interface/IMeta.interface';
import { buildQueryParams } from '@/lib/utils';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import './Table.css';

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  meta?: IMeta;
}

export const handlePageChange = (
  page: number,
  setCurrentPage: (data: number) => void,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
) => {
  setCurrentPage(page);
  const query = buildQueryParams({
    ...Object.fromEntries(
      new URLSearchParams(searchParams?.toString() ?? ''),
    ),
    page: page.toString(),
  }).toString();
  router.push(`?${query}`);
};

export const handleRowsPerPageChange = (
  newLimit: number,
  setRowsPerPage: (data: number) => void,
  setCurrentPage: (data: number) => void,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
) => {
  setRowsPerPage(newLimit);
  setCurrentPage(1);
  const query = buildQueryParams({
    ...Object.fromEntries(
      new URLSearchParams(searchParams?.toString() ?? ''),
    ),
    page: '1',
    limit: newLimit.toString(),
  }).toString();
  router.push(`?${query}`);
};

function Table<T>({ data, columns, meta }: Readonly<TableProps<T>>) {
  const [currentPage, setCurrentPage] = useState(Number(meta?.currentPage));
  const [rowsPerPage, setRowsPerPage] = useState(Number(meta?.currentLimit));
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <DataTable
      columns={columns}
      className="clm-data-table"
      data={data}
      pagination={!!meta}
      paginationServer
      paginationTotalRows={meta?.totalCount || meta?.totalcount}
      paginationDefaultPage={currentPage}
      paginationPerPage={rowsPerPage}
      paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50]}
      onChangePage={(page: number) => handlePageChange(page, setCurrentPage, searchParams, router)}
      onChangeRowsPerPage={(row: number) => handleRowsPerPageChange(
        row,
        setRowsPerPage,
        setCurrentPage,
        searchParams,
        router,
      )}
      noDataComponent={(
        <div className="text-center my-4">
          <Image src={NoDataImg} alt="No data available" height={450} />
          <p className="mt-3">No data available</p>
        </div>
      )}
    />
  );
}

export default Table;
