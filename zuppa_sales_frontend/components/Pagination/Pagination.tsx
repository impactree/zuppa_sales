/* eslint-disable no-unsafe-optional-chaining */

'use client';

import { IMeta } from '@/lib/interface/IMeta.interface';
import { buildQueryParams, Params } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { Form, Pagination } from 'react-bootstrap';
import './Pagination.css';

const TablePagination = ({ meta, params }: { meta: IMeta; params: Params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState(page);
  const [rowsPerPage, setRowsPerPage] = useState(limit);

  const totalPages = Math.ceil(
    (meta?.totalCount ?? meta?.totalcount ?? 0) / rowsPerPage,
  );
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
    const query = buildQueryParams({
      ...params,
      limit: e.target.value,
      page: 1,
    });
    router.push(`?${query}`);
  };

  const handlePageChange = (_page: number) => {
    if (_page >= 1 && _page <= totalPages) {
      setCurrentPage(_page);
      const query = buildQueryParams({ ...params, page: _page });
      router.push(`?${query}`);
    }
  };

  return (
    <div className="d-flex justify-content-end">
      <div className="d-flex justify-content-between align-items-center custom-pagination gap-3 p-2 ps-4 rounded-2 flex-wrap">
        Rows per page:
        <Form.Select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          style={{ width: 'auto', minWidth: '40px' }}
        >
          {[5, 10, 15, 25, 30, 50].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Form.Select>

        <div>
          {indexOfFirstRow + 1}
          -
          {Math.min(indexOfLastRow, meta?.totalCount ?? meta?.totalcount ?? 0)}
          {' '}
          of
          {' '}
          {meta?.totalCount ?? meta?.totalcount ?? 0}
        </div>
        <Pagination className="mb-0 cursor-pointer">
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? '' : 'active-page'}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={currentPage === 1 ? '' : 'active-page'}
          />
          {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => handlePageChange(pageNumber)}
                className={pageNumber === currentPage ? 'active-page' : ''}
              >
                {pageNumber}
              </Pagination.Item>
            )
          )} */}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? '' : 'active-page'}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={currentPage === totalPages ? '' : 'active-page'}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default TablePagination;
