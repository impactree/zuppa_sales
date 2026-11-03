import Search from '@/components/Search/Search';
import { updateQueryParams } from '@/lib/utils';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  updateQueryParams: jest.fn(),
}));

const mockRouter = { push: jest.fn() };
const mockParams = { search: 'initial search' };

beforeEach(() => {
  jest.clearAllMocks();
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  (usePathname as jest.Mock).mockReturnValue('/test-path');
});

test('renders the search input with initial search value', () => {
  render(<Search params={mockParams} className="test-class" />);
  const inputElement = screen.getByPlaceholderText(/Search/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveValue('initial search');
});

test('updates the input value on change', () => {
  render(<Search params={mockParams} className="test-class" />);
  const inputElement = screen.getByPlaceholderText(/Search/i);

  fireEvent.change(inputElement, { target: { value: 'new search' } });
  expect(inputElement).toHaveValue('new search');
});

test('calls updateQueryParams on input change', () => {
  render(<Search params={mockParams} className="test-class" />);
  const inputElement = screen.getByPlaceholderText(/Search/i);

  fireEvent.change(inputElement, { target: { value: 'new search' } });
  expect(updateQueryParams).toHaveBeenCalledWith(
    { search: 'new search', page: 1 },
    mockRouter,
    mockParams,
    '/test-path',
  );
});

test('calls updateQueryParams with correct params when search icon is clicked', () => {
  render(<Search params={mockParams} className="test-class" />);
  const searchIcon = screen.getByTestId('search-icon');

  fireEvent.click(searchIcon);
  expect(updateQueryParams).toHaveBeenCalledWith(
    { search: 'initial search', page: 1 },
    mockRouter,
    mockParams,
    '/test-path',
  );
});

test('adds custom className to the wrapper div', () => {
  render(<Search params={mockParams} className="extra-class" />);
  const wrapperDiv = screen.getByRole('textbox').closest('div');
  expect(wrapperDiv).toHaveClass('extra-class');
});
