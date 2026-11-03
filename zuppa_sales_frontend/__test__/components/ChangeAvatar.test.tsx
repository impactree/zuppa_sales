import ChangeAvatar from '@/components/ChangeAvatar/ChangeAvatar';
import { useUser } from '@/components/Context/userProvider';
import { IUser } from '@/lib/interface/IUser.interface';
import { UserService } from '@/lib/service';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

jest.mock('@/components/Context/userProvider', () => ({
  useUser: jest.fn(),
}));

jest.mock('@/lib/service', () => ({
  UserService: {
    updateAvatar: jest.fn(),
    updateAccountAvatar: jest.fn(),
    deleteAvatar: jest.fn(),
    deleteAccountAvatar: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const mockUser: IUser = {
  name: 'string',
  email: 'string',
  avatar_url: 'string',
  id: 'string',
  createdAt: 'string',
  updatedAt: 'string',
  created_by_type: 'string',
  created_by: 'string',
  phone_number: 'string',
  status: 'string',
  confirmed_at: 'string',
  password_reset_on: 'string',
  accept_terms_of_service: false,
  last_login_at: 'string',
  block_reason: 'string',
  blocked_on: 'string',
  role: 'ADMIN',
  departments: null,
  account: null,
  is_guest: false,
  company_name: 'string'
}

const mockContext = {
  getCurrentUser: jest.fn(),
};

const mockRouter = {
  refresh: jest.fn(),
};

beforeEach(() => {
  (useUser as jest.Mock).mockReturnValue(mockContext);
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
});

test('renders the component with user details', () => {
  render(<ChangeAvatar user={mockUser} apiKey="test-api-key" isUser />);
});

test('calls uploadProfilePicture when file is selected', async () => {
  (UserService.updateAvatar as jest.Mock).mockResolvedValue({ data: { success: true } });

  render(<ChangeAvatar user={mockUser} apiKey="test-api-key" isUser />);

  const fileInput = screen.getByTestId('avatar-input');
  const file = new File(['dummy content'], 'avatar.png', { type: 'image/png' });

  fireEvent.change(fileInput, { target: { files: [file] } });

  await waitFor(() => expect(UserService.updateAvatar).toHaveBeenCalled());
  expect(toast.success).toHaveBeenCalledWith('Avatar updated successfully');
  expect(mockRouter.refresh).toHaveBeenCalled();
  expect(mockContext.getCurrentUser).toHaveBeenCalledWith('test-api-key');
});

test('handles error when uploadProfilePicture fails', async () => {
  (UserService.updateAvatar as jest.Mock).mockResolvedValue({ data: { success: false, error: ['Upload failed'] } });

  render(<ChangeAvatar user={mockUser} apiKey="test-api-key" isUser />);

  const fileInput = screen.getByTestId('avatar-input');
  const file = new File(['dummy content'], 'avatar.png', { type: 'image/png' });

  fireEvent.change(fileInput, { target: { files: [file] } });

  await waitFor(() => expect(UserService.updateAvatar).toHaveBeenCalled());
  expect(toast.error).toHaveBeenCalledWith('Upload failed');
});

test('calls deleteProfileAttachment when delete button is clicked', async () => {
  (UserService.deleteAvatar as jest.Mock).mockResolvedValue({ data: { success: true } });

  render(<ChangeAvatar user={mockUser} apiKey="test-api-key" isUser />);

  const deleteButton = screen.getByTestId('avatar-delete');
  fireEvent.click(deleteButton);

  await waitFor(() => expect(UserService.deleteAvatar).toHaveBeenCalled());
  expect(toast.success).toHaveBeenCalledWith('Avatar deleted successfully');
  expect(mockRouter.refresh).toHaveBeenCalled();
  expect(mockContext.getCurrentUser).toHaveBeenCalledWith('test-api-key');
});

test('handles error when deleteProfileAttachment fails', async () => {
  (UserService.deleteAvatar as jest.Mock).mockResolvedValue({ data: { success: false, error: ['Delete failed'] } });

  render(<ChangeAvatar user={mockUser} apiKey="test-api-key" isUser />);

  const deleteButton = screen.getByTestId('avatar-delete');
  fireEvent.click(deleteButton);

  await waitFor(() => expect(UserService.deleteAvatar).toHaveBeenCalled());
  expect(toast.error).toHaveBeenCalledWith('Delete failed');
});
