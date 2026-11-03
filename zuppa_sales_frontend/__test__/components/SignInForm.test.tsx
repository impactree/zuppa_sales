import SignInForm, { handleSignInSubmit } from '@/components/SignInForm/SignInForm';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormikHelpers } from 'formik';
import { signIn } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => ({
    get: jest.fn((key) => {
      if (key === 'from') return '/company_profile/company_information';
      return null;
    }),
  })),
}));


const mockPush = jest.fn();
const mockRefresh = jest.fn();

const mockRouter: Partial<AppRouterInstance> = {
  push: mockPush,
  refresh: mockRefresh,
};

(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
  refresh: mockRefresh,
});

const mockSlug = 'test-slug';

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the form elements correctly', () => {
  render(<SignInForm slug={mockSlug} />);

  expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Login to account/i })).toBeInTheDocument();
  // expect(screen.getByRole('link', { name: /Create An account/i })).toBeInTheDocument();
});

test('shows validation errors for empty fields', async () => {
  render(<SignInForm slug={mockSlug} />);

  fireEvent.click(screen.getByRole('button', { name: /Login to account/i }));

  await waitFor(() => {
    expect(screen.getByText('Email address is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });
});

test('shows validation error for invalid email', async () => {
  render(<SignInForm slug={mockSlug} />);

  fireEvent.change(screen.getByLabelText(/Email Address/i), {
    target: { value: 'invalid-email' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Login to account/i }));
});

test('submits the form and redirects on successful sign-in', async () => {
  (signIn as jest.Mock).mockResolvedValue({ error: null });

  render(<SignInForm slug={mockSlug} />);

  fireEvent.change(screen.getByLabelText(/Email Address/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: 'ValidPass123!' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Login to account/i }));

  await waitFor(() => {
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'test@example.com',
      password: 'ValidPass123!',
      slug: mockSlug,
      redirect: false,
    });

    expect(mockPush).toHaveBeenCalledWith('/company_profile/company_information');
    expect(mockRefresh).toHaveBeenCalled();
  });
});

test('handles sign-in errors correctly', async () => {
  (signIn as jest.Mock).mockResolvedValue({ error: 'Invalid credentials' });

  render(<SignInForm slug={mockSlug} />);

  fireEvent.change(screen.getByLabelText(/Email Address/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: 'WrongPassword123!' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Login to account/i }));
});

test('disables the submit button while submitting', async () => {
  (signIn as jest.Mock).mockResolvedValue({ error: null });

  render(<SignInForm slug={mockSlug} />);

  const submitButton = screen.getByRole('button', { name: /Login to account/i });

  fireEvent.change(screen.getByLabelText(/Email Address/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/Password/i), {
    target: { value: 'ValidPass123!' },
  });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(submitButton).toBeDisabled();
  });
});

const mockHelpers: Partial<FormikHelpers<{ email: string; password: string }>> = {
  setSubmitting: jest.fn(),
  validateForm: jest.fn(),
  setFieldError: jest.fn(),
};

test('handles successful login with handleSignInSubmit', async () => {
  (signIn as jest.Mock).mockResolvedValue({ error: null });

  const values = { email: 'test@example.com', password: 'ValidPass123!' };

  await handleSignInSubmit(
    values,
    mockSlug,
    mockHelpers as FormikHelpers<{ email: string; password: string }>,
    mockRouter as AppRouterInstance,
  );

  expect(mockHelpers.validateForm).toHaveBeenCalledWith(values);
  expect(mockHelpers.setSubmitting).toHaveBeenCalledWith(true);
  expect(signIn).toHaveBeenCalledWith('credentials', {
    email: 'test@example.com',
    password: 'ValidPass123!',
    slug: mockSlug,
    redirect: false,
  });
  expect(mockHelpers.setSubmitting).toHaveBeenCalledWith(false);
  expect(mockPush).toHaveBeenCalledWith('/company_profile/company_information');
  expect(mockRefresh).toHaveBeenCalled();
});

test('handles login failure with handleSignInSubmit', async () => {
  (signIn as jest.Mock).mockResolvedValue({ error: 'Invalid credentials' });

  const values = { email: 'test@example.com', password: 'WrongPass123!' };

  await handleSignInSubmit(
    values,
    mockSlug,
    mockHelpers as FormikHelpers<{ email: string; password: string }>,
    mockRouter as AppRouterInstance,
  );

  expect(mockHelpers.validateForm).toHaveBeenCalledWith(values);
  expect(mockHelpers.setSubmitting).toHaveBeenCalledWith(true);
  expect(signIn).toHaveBeenCalledWith('credentials', {
    email: 'test@example.com',
    password: 'WrongPass123!',
    slug: mockSlug,
    redirect: false,
  });
  expect(mockHelpers.setFieldError).toHaveBeenCalledWith(
    'email',
    'Accept Invitation / Invalid Email or Password'
  );
  expect(mockPush).not.toHaveBeenCalled();
  expect(mockRefresh).not.toHaveBeenCalled();
  expect(mockHelpers.setSubmitting).toHaveBeenCalledWith(false);
});
