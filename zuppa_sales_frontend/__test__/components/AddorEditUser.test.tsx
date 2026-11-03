import AddorEditUser, { getButtonText, getMessage, handleAddOrEditUser } from '@/components/AddorEditUser/AddorEditUser';
import { IUser } from '@/lib/interface/IUser.interface';
import { AuthService, UserService } from '@/lib/service';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormikHelpers } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast from 'react-hot-toast';

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(),
}));

jest.mock('@/lib/service', () => ({
  AuthService: {
    inviteUsers: jest.fn(),
    resendInvitation: jest.fn(),
  },
  UserService: {
    updateCurrentUser: jest.fn(),
    updateUserById: jest.fn(),
  },
}));

const mockOnClose = jest.fn();

const initialProps = {
  apiKey: 'test-api-key',
  id: '123',
  onClose: mockOnClose,
};

const mockValidateForm = jest.fn();
const mockSetFieldError = jest.fn();

const formikHelpers = {
  validateForm: mockValidateForm,
  setFieldError: mockSetFieldError,
} as unknown as FormikHelpers<any>;

afterEach(() => {
  jest.clearAllMocks();
});

const validValues = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone_number: '+1234567890',
  role: 'ADMIN',
  id: 'user-123',
};


const user: IUser = {
  id: '123',
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone_number: '1234567890',
  role: 'GUEST',
  avatar_url: '',
  createdAt: '',
  updatedAt: '',
  created_by_type: null,
  created_by: null,
  status: '',
  confirmed_at: '',
  password_reset_on: null,
  accept_terms_of_service: false,
  last_login_at: '',
  block_reason: null,
  blocked_on: null,
  departments: null,
  account: null,
  is_guest: false,
  company_name: ''
};

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the form fields correctly', () => {
  render(<AddorEditUser {...initialProps} />);
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
});

test('validates form fields on submission', async () => {
  render(<AddorEditUser {...initialProps} />);
  fireEvent.click(screen.getByText('Invite'));
});

test('validates form fields on submission', async () => {
  render(<AddorEditUser {...initialProps} isResendInvitation={false} user={user} />);
  expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText('Save'));
});

test('submits form successfully for inviting a user', async () => {
  (AuthService.inviteUsers as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
  render(<AddorEditUser {...initialProps} isInvite />);

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
  fireEvent.click(screen.getByText('Invite'));
});

test('displays an error toast if the API call fails', async () => {
  (AuthService.inviteUsers as jest.Mock).mockResolvedValueOnce({ data: { success: false, error: ['Error occurred'] } });
  render(<AddorEditUser {...initialProps} isInvite />);

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
  fireEvent.click(screen.getByText('Invite'));

});

test('handles resend invitation correctly', async () => {
  (AuthService.resendInvitation as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
  render(<AddorEditUser {...initialProps} isResendInvitation />);

  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
  fireEvent.click(screen.getByText('Resend'));
});

test('returns correct button text based on the state', () => {
  expect(getButtonText(false, false)).toBe('Invite');
  expect(getButtonText(true, false)).toBe('Resend');
  expect(getButtonText(false, true)).toBe('Update');
  expect(getButtonText(false, false, user)).toBe('Save');
});

test('returns correct message based on the state', () => {
  expect(getMessage(true, false)).toBe('Invitation resended');
  expect(getMessage(false, true)).toBe('Profile updated');
  expect(getMessage(false, false, true)).toBe('User Invited');
  expect(getMessage(false, false)).toBe('User Updated');
});
test('calls inviteUsers API for a new invite and shows success toast', async () => {
  (AuthService.inviteUsers as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
  const mockRouter = {
    refresh: jest.fn(),
    push: jest.fn(),
    query: {},
  };

  await handleAddOrEditUser(
    validValues as any,
    formikHelpers,
    mockRouter as any,
    'test-api-key',
    {
      isResendInvitation: false,
      isCurrentUser: false,
      isInvite: true,
      onClose: mockOnClose,
    }
  );


  expect(AuthService.inviteUsers).toHaveBeenCalledWith(
    [{ email: 'john.doe@example.com' }],
    'test-api-key'
  );
  expect(toast.success).toHaveBeenCalledWith('User Invited');
  expect(mockOnClose).toHaveBeenCalled();
  expect(mockRouter.refresh).toHaveBeenCalled();
});

test('calls updateCurrentUser API and shows success toast', async () => {
  (UserService.updateCurrentUser as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
  const mockRouter = {
    refresh: jest.fn(),
    push: jest.fn(),
    query: {},
  };

  await handleAddOrEditUser(
    {
      name: 'John Doe',
      phone_number: '+919999999999',
    } as any,
    formikHelpers,
    mockRouter as unknown as AppRouterInstance,
    'test-api-key',
    { isInvite: false, isResendInvitation: false, isCurrentUser: true, onClose: mockOnClose }
  );

  expect(UserService.updateCurrentUser).toHaveBeenCalledWith(
    { name: 'John Doe', phone_number: '+919999999999' },
    'test-api-key'
  );
  expect(toast.success).toHaveBeenCalledWith('Profile updated');
  expect(mockOnClose).toHaveBeenCalled();
  expect(mockRouter.refresh).toHaveBeenCalled();
});

test('calls resendInvitation API and shows success toast', async () => {
  (AuthService.resendInvitation as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
  const mockRouter = {
    refresh: jest.fn(),
    push: jest.fn(),
    query: {},
  };

  await handleAddOrEditUser(
    validValues as any,
    formikHelpers,
    mockRouter as unknown as AppRouterInstance,
    'test-api-key',
    { isInvite: false, isResendInvitation: true, isCurrentUser: false, onClose: mockOnClose }
  );

  expect(AuthService.resendInvitation).toHaveBeenCalledWith({
    email: 'john.doe@example.com',
    slug: 'test-api-key',
    id: 'user-123',
  });
  expect(toast.success).toHaveBeenCalledWith('Invitation resended');
  expect(mockOnClose).toHaveBeenCalled();
  expect(mockRouter.refresh).toHaveBeenCalled();
});

test('shows an error toast if the API call fails', async () => {
  (AuthService.inviteUsers as jest.Mock).mockResolvedValueOnce({
    data: { success: false, error: ['API error'] },
  });

  const mockRouter = {
    refresh: jest.fn(),
    push: jest.fn(),
    query: {},
  };

  await handleAddOrEditUser(
    validValues as any,
    formikHelpers,
    mockRouter as unknown as AppRouterInstance,
    'test-api-key',
    { isInvite: true, isResendInvitation: false, isCurrentUser: false, onClose: mockOnClose }
  );

  expect(AuthService.inviteUsers).toHaveBeenCalledWith(
    [{ email: 'john.doe@example.com' }],
    'test-api-key'
  );
  expect(toast.error).toHaveBeenCalledWith('API error');
});
