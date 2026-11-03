import Filter from '@/components/Filter/Filter';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Filter Component', () => {
  it('renders the dropdown toggle and menu', () => {
    render(
      <Filter>
        <div>Filter Content</div>
      </Filter>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('displays the children when the dropdown is clicked', () => {
    render(
      <Filter>
        <div>Filter Content</div>
      </Filter>
    );

    const toggleButton = screen.getByRole('button');
    fireEvent.click(toggleButton);
    expect(screen.getByText('Filter Content')).toBeVisible();
  });

  it('applies the correct classes to the dropdown and menu', () => {
    render(
      <Filter>
        <div>Filter Content</div>
      </Filter>
    );
    const dropdown = screen.getByTestId('Filter Content');
    expect(dropdown).toHaveClass('position-relative');
  });

  it('renders the filter icon inside the toggle', () => {
    render(
      <Filter>
        <div>Filter Content</div>
      </Filter>
    );
    expect(screen.getByTestId('Filter Content').querySelector('svg')).toBeInTheDocument();
  });
});
