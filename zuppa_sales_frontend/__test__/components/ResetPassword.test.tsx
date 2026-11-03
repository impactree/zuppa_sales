import ResetPasswordForm, { handleResetPasswordSubmit } from '@/components/ResetPasswordForm/ResetPasswordForm';
import { AuthService } from '@/lib/service';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormikHelpers } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

jest.mock('@/lib/service', () => ({
  AuthService: {
    resetPassword: jest.fn(),
  },
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => ({
    get: jest.fn((key) => {
      if (key === 'token') return 'test-token'; // Return a mock token for tests
      return null;
    }),
  })),
}));

jest.mock('@/components/Notify/Notify', () => ({
  Notify: jest.fn(),
}));

const mockSlug = 'test-slug';

const mockSetSubmitting = jest.fn();
const mockSetFieldError = jest.fn();
const mockValidateForm = jest.fn();
const mockPush = jest.fn();

const mockRouter: Partial<AppRouterInstance> = {
  push: mockPush,
};

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the form elements correctly', () => {
  render(<ResetPasswordForm slug={mockSlug} token={'token'} />);

  expect(screen.getByPlaceholderText('Enter New Password')).toBeInTheDocument();
  expect(screen.getByLabelText(/Re-Enter New Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Update Password/i })).toBeInTheDocument();
});

test('shows validation error for empty fields', async () => {
  render(<ResetPasswordForm slug={mockSlug} token={'token'} />);

  fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));
});

test('shows validation error for mismatched passwords', async () => {
  render(<ResetPasswordForm slug={mockSlug} token={'token'} />);

  fireEvent.change(screen.getByPlaceholderText('Enter New Password'), {
    target: { value: 'ValidPass123!' },
  });
  fireEvent.change(screen.getByLabelText(/Re-Enter New Password/i), {
    target: { value: 'ValidPass123!' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));
});

test('submits the form successfully when API returns success', async () => {
  (AuthService.resetPassword as jest.Mock).mockResolvedValue({
    data: { success: true },
  });

  render(<ResetPasswordForm slug={mockSlug} token={'token'} />);

  fireEvent.change(screen.getByPlaceholderText('Enter New Password'), {
    target: { value: 'ValidPass123!' },
  });
  fireEvent.change(screen.getByLabelText(/Re-Enter New Password/i), {
    target: { value: 'ValidPass123!' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));
});

test('shows error when API returns failure', async () => {
  (AuthService.resetPassword as jest.Mock).mockResolvedValue({
    data: { success: false },
  });

  render(<ResetPasswordForm slug={mockSlug} token={'token'} />);

  fireEvent.change(screen.getByPlaceholderText('Enter New Password'), {
    target: { value: 'ValidPass123!' },
  });
  fireEvent.change(screen.getByLabelText(/Re-Enter New Password/i), {
    target: { value: 'ValidPass123!' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Update Password/i }));
});

test('disables submit button while submitting', async () => {
  (AuthService.resetPassword as jest.Mock).mockResolvedValue({
    data: { success: true },
  });

  render(<ResetPasswordForm slug={mockSlug} token={'token'} />);

  const submitButton = screen.getByRole('button', { name: /Update Password/i });

  fireEvent.change(screen.getByPlaceholderText('Enter New Password'), {
    target: { value: 'ValidPass123!' },
  });
  fireEvent.change(screen.getByLabelText(/Re-Enter New Password/i), {
    target: { value: 'ValidPass123!' },
  });

  fireEvent.click(submitButton);

  expect(submitButton).toBeDisabled();
});

const slug = 'test-slug';
const token = 'test-token';
const values = { password: 'Password@123', confirmPassword: 'Password@123' };


const mockHelpers: Partial<FormikHelpers<{ password: string; confirmPassword: string }>> = {
  setSubmitting: jest.fn(),
  validateForm: jest.fn(),
  setFieldError: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
});

test('calls Notify on successful password reset', async () => {
  (AuthService.resetPassword as jest.Mock).mockResolvedValue({
    data: { success: true },
  });

  await handleResetPasswordSubmit(values, slug, token, mockHelpers as FormikHelpers<{ password: string; confirmPassword: string }>,
    mockRouter as AppRouterInstance);

  expect(AuthService.resetPassword).toHaveBeenCalledWith({ password: 'Password@123', passwordConfirmation: "Password@123", token, slug });
});

test('sets field error on API failure', async () => {
  (AuthService.resetPassword as jest.Mock).mockResolvedValue({
    data: { success: false },
  });

  await handleResetPasswordSubmit(values, slug, token, mockHelpers as FormikHelpers<{ password: string; confirmPassword: string }>,
    mockRouter as AppRouterInstance);
});

test('calls Notify on API failure', async () => {
  (AuthService.resetPassword as jest.Mock).mockResolvedValue({
    data: { success: false, message: 'Invalid Token' },
  });

  await handleResetPasswordSubmit(
    values,
    slug,
    token,
    mockHelpers as FormikHelpers<{ password: string; confirmPassword: string }>,
    mockRouter as AppRouterInstance,
  );
});