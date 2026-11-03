import Sort from '@/components/Sort/Sort';
import { updateQueryParams } from '@/lib/utils';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  updateQueryParams: jest.fn(),
}));

const mockRouter = { push: jest.fn() };
const mockParams = { category: 'test-category' };
const mockPathname = '/test-path';
const mockSearchParams = new URLSearchParams('sort=-createdAt');

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  (usePathname as jest.Mock).mockReturnValue(mockPathname);
  (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  jest.clearAllMocks();
});

test('renders the Select component with correct options', () => {
  const { container } = render(<Sort params={mockParams} />);

  const dropdown = container.querySelector('.select-wrapper__control');
  fireEvent.mouseDown(dropdown as Element);

  expect(screen.getByText('Date - Ascending')).toBeInTheDocument();
  expect(screen.getByText('Name (A-Z)')).toBeInTheDocument();
  expect(screen.getByText('Name (Z-A)')).toBeInTheDocument();
});


test('displays the correct default value', () => {
  render(<Sort params={mockParams} />);

  const selectedOption = screen.getByText('Date - Recent');
  expect(selectedOption).toBeInTheDocument();
});

test('updates the sort value and calls updateQueryParams on change', () => {
  const { container } = render(<Sort params={mockParams} />);

  const dropdown = container.querySelector('.select-wrapper__control');
  fireEvent.mouseDown(dropdown as Element); // Opens the dropdown

  const option = screen.getByText('Name (A-Z)');
  fireEvent.click(option); // Simulate selecting an option

  expect(updateQueryParams).toHaveBeenCalledWith(
    {
      sort: 'name',
      page: '1',
    },
    mockRouter,
    mockParams,
    mockPathname,
  );
});


test('toggles the show state on sort value change', () => {
  const { container } = render(<Sort params={mockParams} />);

  const dropdown = container.querySelector('.select-wrapper__control');
  fireEvent.mouseDown(dropdown as Element);

  const option = screen.getByText('Name (A-Z)');
  fireEvent.click(option);

  const updatedOption = screen.getByText('Name (A-Z)');
  expect(updatedOption).toBeInTheDocument();
});
