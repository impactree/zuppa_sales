import UserFilter from '@/components/Filter/UserFilter/UserFilter';
import { IUserFilter } from '@/lib/interface/IUser.interface';
import { applyFilter, resetFilter } from '@/lib/utils';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  applyFilter: jest.fn(),
  resetFilter: jest.fn(),
}));

jest.mock('@/components/CustomSelect/CustomSelect', () => ({ options, ...props }: any) => (
  <select {...props}>
    {options.map((option: any) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
));

const mockRouter = { push: jest.fn() };
const mockPathname = '/users';

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  (usePathname as jest.Mock).mockReturnValue(mockPathname);
  jest.clearAllMocks();
});

const params: IUserFilter = { role: 'GUEST', status: 'ACTIVE' };

test('renders the FilterHeader and form fields', () => {
  render(<UserFilter params={params} />);

  expect(screen.getByText('Filters')).toBeInTheDocument();
  expect(screen.getByLabelText('Role *')).toBeInTheDocument();
  expect(screen.getByLabelText('Status *')).toBeInTheDocument();
  expect(screen.getByText('Apply')).toBeInTheDocument();
  expect(screen.getByText('Cancel')).toBeInTheDocument();
});

test('calls resetFilter when the reset button is clicked', () => {
  render(<UserFilter params={params} />);

  const resetButton = screen.getByText('Cancel');
  fireEvent.click(resetButton);

  expect(resetFilter).toHaveBeenCalledWith(mockRouter, expect.any(Function), mockPathname);
});

test('validates form and applies filters on submission', async () => {
  render(<UserFilter params={params} />);

  const roleSelect = screen.getByLabelText('Role *');
  const statusSelect = screen.getByLabelText('Status *');
  const applyButton = screen.getByText('Apply');

  fireEvent.change(roleSelect, { target: { value: 'ADMIN' } });
  fireEvent.change(statusSelect, { target: { value: 'PENDING' } });
  fireEvent.click(applyButton);

  await waitFor(() => {
    expect(applyFilter).toHaveBeenCalledWith(
      {},
      mockRouter,
      params,
      mockPathname
    );
  });
});

test('resets the form when the reset button is clicked', async () => {
  render(<UserFilter params={params} />);

  const roleSelect = screen.getByLabelText('Role *');
  const statusSelect = screen.getByLabelText('Status *');
  const resetButton = screen.getByText('Cancel');

  fireEvent.change(roleSelect, { target: { value: 'ADMIN' } });
  fireEvent.change(statusSelect, { target: { value: 'PENDING' } });

  fireEvent.click(resetButton);

  await waitFor(() => {
    expect(roleSelect).toHaveValue('ADMIN');
    expect(statusSelect).toHaveValue('PENDING');
  });
});

test('renders initial values from params', () => {
  render(<UserFilter params={params} />);
});

test('renders correctly with initial values', () => {
  render(<UserFilter params={params} />);
  expect(screen.getByText('Status *')).toBeInTheDocument();
  expect(screen.getByText('Cancel')).toBeInTheDocument();
  expect(screen.getByText('Apply')).toBeInTheDocument();
});

test('handles role field changes', async () => {
  render(<UserFilter params={params} />);
  const roleSelect = screen.getByLabelText('Role *');
  fireEvent.change(roleSelect, { target: { value: 'ADMIN' } });

  expect(roleSelect).toHaveValue('ADMIN');
});

test('handles status field changes', async () => {
  render(<UserFilter params={params} />);
  const statusSelect = screen.getByLabelText('Status *');
  fireEvent.change(statusSelect, { target: { value: 'ACTIVE' } });

  expect(statusSelect).toHaveValue('ACTIVE');
});

test('calls resetFilter when "Cancel" is clicked', () => {
  render(<UserFilter params={params} />);

  const cancelButton = screen.getByText('Cancel');
  fireEvent.click(cancelButton);

});

test('calls onSubmit when "Apply" is clicked', () => {
  render(<UserFilter params={params} />);

  const applyButton = screen.getByText('Apply');
  fireEvent.click(applyButton);
});

test('displays validation error when required fields are empty', async () => {
  render(<UserFilter params={params} />);

  const applyButton = screen.getByText('Apply');
  fireEvent.click(applyButton);
});

test('calls resetFilter when the reset button in FilterHeader is clicked', () => {
  render(<UserFilter params={params} />);
  const resetButton = screen.getByText('Cancel');
  fireEvent.click(resetButton);
  expect(resetFilter).toHaveBeenCalledWith(mockRouter, expect.any(Function), mockPathname);
});