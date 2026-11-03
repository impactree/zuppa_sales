// import '@testing-library/jest-dom';
// import { fireEvent, render, screen } from '@testing-library/react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import Table from '@/components/Table/Table';
// import { IMeta } from '@/lib/interface/IMeta.interface';

// jest.mock('next/navigation', () => ({
//   useRouter: jest.fn(),
//   useSearchParams: jest.fn(),
// }));

// const mockData = [
//   { id: 1, name: 'User 1', email: 'user1@example.com', role: 'Admin' },
//   { id: 2, name: 'User 2', email: 'user2@example.com', role: 'User' },
// ];
// const mockColumns = [
//   { name: 'Name', selector: (row: any) => row.name },
//   { name: 'Email', selector: (row: any) => row.email },
//   { name: 'Role', selector: (row: any) => row.role },
// ];

// const mockMeta: IMeta = {
//   totalCount: 2,
//   currentPage: "1",
//   currentLimit: "10",
//   currentCount: 1
// };

// beforeEach(() => {
//   (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
//   (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
// });

// test('renders the table with data and columns', () => {
//   render(<Table data={mockData} columns={mockColumns} meta={mockMeta} />);

//   expect(screen.getByText('User 1')).toBeInTheDocument();
//   expect(screen.getByText('user1@example.com')).toBeInTheDocument();
//   expect(screen.getByText('Admin')).toBeInTheDocument();
//   expect(screen.getByText('User 2')).toBeInTheDocument();
//   expect(screen.getByText('user2@example.com')).toBeInTheDocument();
//   expect(screen.getByText('User')).toBeInTheDocument();
// });

// test('renders the table with empty data', () => {
//   render(<Table data={[]} columns={mockColumns} meta={mockMeta} />);

//   expect(screen.queryByText('User 1')).not.toBeInTheDocument();
//   expect(screen.queryByText('User 2')).not.toBeInTheDocument();
// });

// test('handles page change and updates URL query params', async () => {
//   render(<Table data={mockData} columns={mockColumns} meta={mockMeta} />);

//   const nextPageButton = screen.getByRole('button', { name: /next/i });
//   fireEvent.click(nextPageButton);
// });

// test('handles rows per page change and updates URL query params', async () => {
//   render(<Table data={mockData} columns={mockColumns} meta={mockMeta} />);

//   const rowsPerPageSelect = screen.getByRole('combobox');
//   fireEvent.change(rowsPerPageSelect, { target: { value: '5' } });
// });

// test('handles missing meta properties gracefully', async () => {
//   render(<Table data={mockData} columns={mockColumns} meta={mockMeta} />); // Passing an empty meta

//   const nextPageButton = screen.getByRole('button', { name: /next/i });
//   fireEvent.click(nextPageButton);
// });

import Table, { handlePageChange, handleRowsPerPageChange } from '@/components/Table/Table';
import { IMeta } from '@/lib/interface/IMeta.interface';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation';

// Mock necessary hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockSearchParams = new URLSearchParams() as ReadonlyURLSearchParams;

  const mockData = [
    { id: 1, name: 'User 1', email: 'user1@example.com', role: 'Admin' },
    { id: 2, name: 'User 2', email: 'user2@example.com', role: 'User' },
  ];
  const mockColumns = [
    { name: 'Name', selector: (row: any) => row.name },
    { name: 'Email', selector: (row: any) => row.email },
    { name: 'Role', selector: (row: any) => row.role },
  ];
  const mockMeta: IMeta = {
    totalCount: 2,
    currentPage: "1",
    currentLimit: "10",
    currentCount: 1,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  test('renders the table with data and columns', () => {
    render(<Table data={mockData} columns={mockColumns} meta={mockMeta} />);

    expect(screen.getByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
    expect(screen.getByText('user2@example.com')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  test('handles page change and updates URL query params', async () => {
    render(<Table data={mockData} columns={mockColumns} meta={mockMeta} />);

    const nextPageButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextPageButton);
  });

  test('handles rows per page change and updates URL query params', async () => {
    render(<Table data={mockData} columns={mockColumns} meta={mockMeta} />);

    const rowsPerPageSelect = screen.getByRole('combobox');
    fireEvent.change(rowsPerPageSelect, { target: { value: '5' } });
  });

  test('calls handlePageChange correctly and updates URL query params', async () => {
    const { push } = useRouter();
    const mockSetCurrentPage = jest.fn();
    const mockRouter = { push } as unknown as AppRouterInstance;
    
    // Simulate a page change using handlePageChange
    const page = 2;
    handlePageChange(page, mockSetCurrentPage, mockSearchParams, mockRouter);
    
    // Ensure that the correct query string is generated and push is called
    expect(mockSetCurrentPage).toHaveBeenCalledWith(page);
    expect(push).toHaveBeenCalledWith('?page=2');
  });

  test('calls handleRowsPerPageChange correctly and updates URL query params', async () => {
    const { push } = useRouter();
    const mockSetRowsPerPage = jest.fn();
    const mockSetCurrentPage = jest.fn();
    const mockRouter = { push } as unknown as AppRouterInstance;
    
    // Simulate a rows per page change using handleRowsPerPageChange
    const limit = 5;
    handleRowsPerPageChange(limit, mockSetRowsPerPage, mockSetCurrentPage, mockSearchParams, mockRouter);
    
    // Ensure that the correct query string is generated and push is called
    expect(mockSetRowsPerPage).toHaveBeenCalledWith(limit);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
    expect(push).toHaveBeenCalledWith('?page=1&limit=5');
  });
