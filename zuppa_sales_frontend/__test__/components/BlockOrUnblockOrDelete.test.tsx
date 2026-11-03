import BlockOrUnblockOrDelete from '@/components/BlockOrUnblockOrDelete/BlockOrUnblockOrDelete';
import { fireEvent, render, screen } from '@testing-library/react';

describe('BlockOrUnblockOrDelete Component', () => {
  const mockOnConfirm = jest.fn();
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with deleteText', () => {
    render(
      <BlockOrUnblockOrDelete
        actionType="Delete"
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
        deleteText="Are you sure you want to delete this user?"
      />
    );

    expect(screen.getByText('Are you sure you want to delete this user?')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('shows textarea only when actionType is Block', () => {
    render(
      <BlockOrUnblockOrDelete
        actionType="Block"
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
        deleteText="Are you sure you want to block this user?"
      />
    );

    expect(screen.getByPlaceholderText('Enter reason for blocking')).toBeInTheDocument();
  });

  it('does not show textarea when actionType is not Block', () => {
    render(
      <BlockOrUnblockOrDelete
        actionType="Delete"
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
        deleteText="Are you sure you want to delete this user?"
      />
    );

    expect(screen.queryByPlaceholderText('Enter reason for blocking')).not.toBeInTheDocument();
  });

  it('calls onConfirm with reason when actionType is Block', () => {
    render(
      <BlockOrUnblockOrDelete
        actionType="Block"
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
        deleteText="Are you sure you want to block this user?"
      />
    );

    const textarea = screen.getByPlaceholderText('Enter reason for blocking');
    fireEvent.change(textarea, { target: { value: 'Spamming' } });

    const confirmButton = screen.getByText('Block');
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledWith('Spamming');
  });

  it('calls onConfirm with an empty string when actionType is Delete', () => {
    render(
      <BlockOrUnblockOrDelete
        actionType="Delete"
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
        deleteText="Are you sure you want to delete this user?"
      />
    );

    const confirmButton = screen.getByText('Delete');
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledWith('');
  });

  it('calls onClose when the Cancel button is clicked', () => {
    render(
      <BlockOrUnblockOrDelete
        actionType="Delete"
        onConfirm={mockOnConfirm}
        onClose={mockOnClose}
        deleteText="Are you sure you want to delete this user?"
      />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
