import FilterHeader from '@/components/Filter/FilterHeader';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('FilterHeader Component', () => {
  it('renders the header with text "Filters"', () => {
    render(<FilterHeader resetButton={jest.fn()} />);
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  it('renders the "Reset All" button', () => {
    render(<FilterHeader resetButton={jest.fn()} />);
    const resetButton = screen.getByText('Reset All');
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toHaveClass('resetAll_btn');
  });

  it('calls the resetButton callback when the button is clicked', () => {
    const mockResetButton = jest.fn();
    render(<FilterHeader resetButton={mockResetButton} />);
    const resetButton = screen.getByText('Reset All');
    fireEvent.click(resetButton);
    expect(mockResetButton).toHaveBeenCalledTimes(1);
  });

  it('applies the correct classes to the container and button', () => {
    render(<FilterHeader resetButton={jest.fn()} />);
    const container = screen.getByText('Filters').closest('div');
    expect(container).toHaveClass('d-flex justify-content-between align-items-center');
    const resetButton = screen.getByRole('button');
    expect(resetButton).toHaveClass('d-flex justify-content-between align-items-center border-0 bg-white');
  });
});
