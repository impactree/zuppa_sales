import { NavBarMenuItems } from '@/components/NavBarMenu/NavBarMenuItems';
import { NavBarMenuItemsProps } from '@/components/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

const defaultProps: NavBarMenuItemsProps = {
  url: '/test-url',
  text: 'Test Item',
  subMenu: 'SubMenu',
  isRadius: false,
  menu: 'Menu',
  icon: <span data-testid="test-icon">Icon</span>,
  subText: ''
};

test('renders with correct href and text', () => {
  render(<NavBarMenuItems {...defaultProps} />);

  const link = screen.getByRole('link', { name: /test item/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/test-url');
});

test('renders icon if provided', () => {
  render(<NavBarMenuItems {...defaultProps} />);

  const icon = screen.getByTestId('test-icon');
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveTextContent('Icon');
});

test('applies "is_radius" and "active" class when isRadius is true and text matches menu', () => {
  render(
    <NavBarMenuItems
      {...defaultProps}
      isRadius={true}
      menu="Test Item"
    />
  );

  const link = screen.getByRole('link', { name: /test item/i });
  expect(link).toHaveClass('is_radius active');
});

test('applies "header-css" and "active" class when isRadius is false and text matches subMenu', () => {
  render(
    <NavBarMenuItems
      {...defaultProps}
      isRadius={false}
      subMenu="Test Item"
    />
  );

  const link = screen.getByRole('link', { name: /test item/i });
  expect(link).toHaveClass('header-css active');
});

test('does not apply "active" class when text does not match menu or subMenu', () => {
  render(<NavBarMenuItems {...defaultProps} />);

  const link = screen.getByRole('link', { name: /test item/i });
  expect(link).not.toHaveClass('active');
});
