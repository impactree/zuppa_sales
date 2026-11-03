import { ModalProvider, useModal } from '@/components/Modal/Context';
import { IModalProps } from '@/components/types';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

jest.mock('@/components/Modal/Modal', () => ({
  Modal: ({ children, show }: IModalProps) => (
    show ? <div data-testid="modal">{children}</div> : null
  ),
}));

const TestModalComponent = ({ content }: { content: ReactNode }) => {
  const triggerModal = useModal({ content });

  return (
    <button onClick={triggerModal} data-testid="toggle-modal-button">
      Toggle Modal
    </button>
  );
};

test('renders children inside ModalProvider', () => {
  render(
    <ModalProvider>
      <div data-testid="child">Child Component</div>
    </ModalProvider>
  );

  const child = screen.getByTestId('child');
  expect(child).toBeInTheDocument();
});

test('shows and hides modal with useModal hook', () => {
  const contentText = 'Test Modal Content';
  render(
    <ModalProvider>
      <TestModalComponent content={<div>{contentText}</div>} />
    </ModalProvider>
  );

  expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

  const toggleButton = screen.getByTestId('toggle-modal-button');
  fireEvent.click(toggleButton);

  expect(screen.getByTestId('modal')).toBeInTheDocument();
  expect(screen.getByText(contentText)).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('modal').parentElement!);

});

test('calls hideModal callback when modal is hidden', () => {
  const contentText = 'Test Modal Content';
  render(
    <ModalProvider>
      <TestModalComponent content={<div>{contentText}</div>} />
    </ModalProvider>
  );

  const toggleButton = screen.getByTestId('toggle-modal-button');
  fireEvent.click(toggleButton);

  const modal = screen.getByTestId('modal');
  expect(modal).toBeInTheDocument();
  fireEvent.click(modal.parentElement!);

});

test('throws an error when useModal is used outside ModalProvider', () => {
  const originalError = console.error;
  console.error = jest.fn();

  expect(() => render(<TestModalComponent content={<div />} />)).toThrow(
    'useModal must be used within a ModalProvider'
  );

  console.error = originalError;
});
