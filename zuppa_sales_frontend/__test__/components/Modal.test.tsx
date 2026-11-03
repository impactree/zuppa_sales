import { Modal } from '@/components/Modal/Modal';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

const defaultProps = {
  title: 'Test Title',
  children: <div>Test Content</div>,
  size: 'sm',
  show: true,
  onHide: jest.fn(),
  onClose: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
});


test('does not render the modal when `show` is false', () => {
  render(<Modal show={false} children={<div>Test Content</div>} size={'sm'} />);

  expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
});

test('renders the title if provided', () => {
  render(<Modal show={true} title="Sample Title" children={<div>Test Content</div>} size={'sm'} />);
  expect(screen.getByText('Sample Title')).toBeInTheDocument();
});

test('does not render the title if not provided', () => {
  render(<Modal show={true} title={undefined} children={<div>Test Content</div>} size={'sm'} />);
  expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
});

test('calls onHide and onClose callbacks when the modal is closed', () => {
  render(<Modal show={false} children={<div>Test Content</div>} size={'sm'} />);
  expect(defaultProps.onHide).toHaveBeenCalledTimes(0);
  expect(defaultProps.onClose).toHaveBeenCalledTimes(0);
});

test('calls onHide and onClose callbacks when the modal is closed', () => {
  render(<Modal show={false} children={<div>Test Content</div>} size={'sm'} onHide={() => jest.fn()} />);
  expect(defaultProps.onHide).toHaveBeenCalledTimes(0);
  expect(defaultProps.onClose).toHaveBeenCalledTimes(0);
});

test('calls onHide and onClose when close button is clicked', () => {
  const onHide = jest.fn();
  const onClose = jest.fn();

  render(<Modal  onHide={onHide} onClose={onClose} show={true} children={<div>Test Content</div>} size={'sm'} />);

  const closeButton = screen.getByRole('button', { name: /close/i });
  fireEvent.click(closeButton);

  expect(onHide).toHaveBeenCalledTimes(1);
  expect(onClose).toHaveBeenCalledTimes(1);
});