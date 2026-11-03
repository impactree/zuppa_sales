import { Button } from '@/components/Button/Button';
import { ButtonProps } from '@/components/types';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

const defaultProps: ButtonProps = {
  text: 'Test Button',
  type: 'button',
  onClick: jest.fn(),
  onDoubleClick: jest.fn(),
  isSolid: false
};

test('renders the button with the correct text', () => {
  render(<Button {...defaultProps} />);
  const button = screen.getByTestId('button-Test Button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Test Button');
});

test('applies the correct class name for isSolid prop', () => {
  const { container } = render(<Button {...defaultProps} isSolid />);
  expect(container.querySelector('.common_solid_button')).toBeInTheDocument();
});

test('applies the correct class name for isDanger prop', () => {
  const { container } = render(<Button {...defaultProps} isDanger />);
  expect(container.querySelector('.common_hallowdanger_button')).toBeInTheDocument();
});

test('calls onClick handler when clicked', () => {
  render(<Button {...defaultProps} />);
  const button = screen.getByTestId('button-Test Button');
  fireEvent.click(button);
  expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
});

test('calls onDoubleClick handler when double-clicked', () => {
  render(<Button {...defaultProps} />);
  const button = screen.getByTestId('button-Test Button');
  fireEvent.doubleClick(button);
  expect(defaultProps.onDoubleClick).toHaveBeenCalledTimes(1);
});

test('disables the button when isDisabled is true', () => {
  render(<Button {...defaultProps} isDisabled />);
  const button = screen.getByTestId('button-Test Button');
  expect(button).toBeDisabled();
});

test('disables the button and shows spinner when isLoading is true', () => {
  render(<Button {...defaultProps} isLoading />);
  const button = screen.getByTestId('button-Test Button');
  expect(button).toBeDisabled();
});

test('renders prefix and suffix icons if provided', () => {
  render(
    <Button
      {...defaultProps}
      prefixIconChildren={<span data-testid="prefix-icon">Prefix</span>}
      sufixIconChildren={<span data-testid="suffix-icon">Suffix</span>}
    />
  );
  expect(screen.getByTestId('prefix-icon')).toBeInTheDocument();
  expect(screen.getByTestId('suffix-icon')).toBeInTheDocument();
});

test('The button when isLink is true', () => {
  render(<Button {...defaultProps} isLink />);
  const button = screen.getByTestId('button-Test Button');
});

test('The button when isSolidSecondary is true', () => {
  render(<Button {...defaultProps} isSolidSecondary isSolid={false} />);
  const button = screen.getByTestId('button-Test Button');
});
