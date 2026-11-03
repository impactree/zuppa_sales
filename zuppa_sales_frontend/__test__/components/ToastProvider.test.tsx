import { ToastProvider } from '@/components/Notify/ToastProvider';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

test('renders ToastContainer', () => {
  render(<ToastProvider />);
  const toastContainer = screen.getByTestId('ToastContainer');
  expect(toastContainer).toBeInTheDocument();
});
