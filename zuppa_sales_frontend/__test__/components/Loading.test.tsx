import { Loader } from '@/components/Loader/Loader';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/Modal/Modal', () => ({
  Modal: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="modal">{children}</div>
  ),
}));

test('renders the modal', () => {
  render(<Loader />);

  const modal = screen.getByTestId('modal');
  expect(modal).toBeInTheDocument();
});

test('renders the loader animation', () => {
  render(<Loader />);

  const loader = screen.getByTestId('loader');
  expect(loader).toBeInTheDocument();
  expect(loader).toHaveClass('loader');
});

test('displays loading text animation', () => {
  render(<Loader />);

  const loadingText = screen.getByText((content, element) =>
    element?.tagName === 'SPAN' && content === 'L');
  expect(loadingText).toBeInTheDocument();

  const loadingSpans = screen.getAllByText((_, element) =>
    element?.tagName === 'SPAN' && (element as any)?.dataset.text);

  const expectedText = ['L', 'O', 'A', 'D', 'I', 'N', 'G', '.', '.', '.'];
  expect(loadingSpans.map(span => span.textContent)).toEqual(expectedText);
});
