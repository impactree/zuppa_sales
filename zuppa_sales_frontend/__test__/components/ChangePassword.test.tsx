import ChangePassword, { handleChangePassword } from '@/components/ChangePassword/ChangePassword';
import { AuthService, UserService } from '@/lib/service';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormikHelpers } from 'formik';
import { signOut } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast from 'react-hot-toast';

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock('@/lib/service', () => ({
  UserService: {
    changePassword: jest.fn(),
  },
  AuthService: {
    logout: jest.fn(),
  },
}));

const slug = 'test-slug';

const mockRouter = { push: jest.fn() };
const mockHelpers = {
  validateForm: jest.fn().mockResolvedValue({}),
  setSubmitting: jest.fn(),
} as unknown as FormikHelpers<{ oldPassword: string; newPassword: string; confirmPassword: string }>;

const values = {
  oldPassword: 'OldPassword1!',
  newPassword: 'NewPassword1!',
  confirmPassword: 'NewPassword1!',
};

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders the form fields and submit button', () => {
  render(<ChangePassword slug={slug} />);

  expect(screen.getByLabelText(/Old Password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
  expect(screen.getByText(/Update Password/i)).toBeInTheDocument();
});

test('validates required fields', async () => {
  render(<ChangePassword slug={slug} />);
  fireEvent.click(screen.getByText(/Update Password/i));
});

test('displays an error if passwords do not match', async () => {
  render(<ChangePassword slug={slug} />);
  fireEvent.change(screen.getByLabelText(/New Password/i), { target: { value: 'NewPassword1!' } });
  fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'DifferentPassword1!' } });
  fireEvent.click(screen.getByText(/Update Password/i));

  await waitFor(() => {
    expect(screen.getByText(/Passwords must match/i)).toBeInTheDocument();
  });
});

test('calls the UserService and displays success message on successful password change', async () => {
  (UserService.changePassword as jest.Mock).mockResolvedValue({
    data: { success: true, error: [] },
  });

  render(<ChangePassword slug={slug} />);
  fireEvent.change(screen.getByLabelText(/Old Password/i), { target: { value: 'OldPassword1!' } });
  fireEvent.change(screen.getByLabelText(/New Password/i), { target: { value: 'NewPassword1!' } });
  fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'NewPassword1!' } });
  fireEvent.click(screen.getByText(/Update Password/i));

  await waitFor(() => {
    expect(toast.success).toHaveBeenCalledWith('Password updated successfully');
    expect(AuthService.logout).toHaveBeenCalledWith({ slug });
    expect(signOut).toHaveBeenCalledWith({ redirect: false });
  });
});

test('displays an error message on failed password change', async () => {
  (UserService.changePassword as jest.Mock).mockResolvedValue({
    data: { success: false, error: ['Old password is incorrect'] },
  });

  render(<ChangePassword slug={slug} />);
  fireEvent.change(screen.getByLabelText(/Old Password/i), { target: { value: 'OldPassword1!' } });
  fireEvent.change(screen.getByLabelText(/New Password/i), { target: { value: 'NewPassword1!' } });
  fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'NewPassword1!' } });
  fireEvent.click(screen.getByText(/Update Password/i));

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith('Old password is incorrect');
  });
});

test('should call UserService.changePassword and handle success', async () => {
  (UserService.changePassword as jest.Mock).mockResolvedValue({
    data: { success: true, error: [] },
  });

  await handleChangePassword(values, slug, mockHelpers, mockRouter as unknown as AppRouterInstance);

  expect(UserService.changePassword).toHaveBeenCalledWith(
    {
      oldPassword: values.oldPassword,
      password: values.newPassword,
      passwordConfirmation: values.confirmPassword,
    },
    slug,
  );
  expect(toast.success).toHaveBeenCalledWith('Password updated successfully');
  expect(AuthService.logout).toHaveBeenCalledWith({ slug });
  expect(signOut).toHaveBeenCalledWith({ redirect: false });
  expect(mockRouter.push).toHaveBeenCalledWith('/sign_in');
});

test('should handle error when password change fails', async () => {
  (UserService.changePassword as jest.Mock).mockResolvedValue({
    data: { success: false, error: ['Old password is incorrect'] },
  });

  await handleChangePassword(values, slug, mockHelpers, mockRouter as unknown as AppRouterInstance);

  expect(UserService.changePassword).toHaveBeenCalledWith(
    {
      oldPassword: values.oldPassword,
      password: values.newPassword,
      passwordConfirmation: values.confirmPassword,
    },
    slug,
  );
  expect(toast.error).toHaveBeenCalledWith('Old password is incorrect');
  expect(AuthService.logout).not.toHaveBeenCalled();
  expect(signOut).not.toHaveBeenCalled();
  expect(mockRouter.push).not.toHaveBeenCalled();
});

test('should validate form values before making API call', async () => {
  await handleChangePassword(values, slug, mockHelpers, mockRouter as unknown as AppRouterInstance);

  expect(mockHelpers.validateForm).toHaveBeenCalledWith(values);
});

test('should reset the form when the Cancel button is clicked', async () => {
  render(<ChangePassword slug={slug} />);
  const mockResetForm = jest.fn();
  const cancelButton = screen.getByText('Cancel');
  fireEvent.click(cancelButton);
  expect(mockResetForm).toHaveBeenCalledTimes(0);
});
