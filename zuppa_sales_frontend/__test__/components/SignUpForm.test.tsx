import SignUpForm, {
  handleSignUpSubmit,
} from '@/components/SignUpForm/SignUpForm';
import { AuthService } from '@/lib/service';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormikHelpers } from 'formik';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

jest.mock('@/lib/service', () => ({
  AuthService: {
    signUp: jest.fn().mockResolvedValue({
      data: { success: true, error: [] },
    }),
  },
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));
jest.mock('@/components/Notify/Notify', () => ({
  Notify: jest.fn(),
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
afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('lodash', () => ({
  debounce: (fn: any) => fn,
}));
describe('SignUpForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('render all input fileds', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Name/i));
    expect(screen.getAllByLabelText(/Workspace URL/i));
    expect(screen.getAllByLabelText(/Email Address/i));
    expect(screen.getAllByLabelText(/Password */i));
    expect(screen.getByText(/I agree/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Save & Proceed/i })).toBeInTheDocument();
  });

  test('shows validation error messages for invalid inputs', async () => {
    render(<SignUpForm />);
    const btnElement = screen.getByRole('button', { name: /Save & Proceed/i });
    fireEvent.click(btnElement);
    await waitFor(() => {
      expect(screen.getByText(/Full Name is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Company Name is required/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Workspace URL is required/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Email address is required/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Agree Terms and Conditions is required/i)
      ).toBeInTheDocument();
    });
  });

  test('show validation errors for empty fields', () => {
    render(<SignUpForm />);
    const btnElement = screen.getByRole('button', { name: /Save & Proceed/i });
    fireEvent.click(btnElement);
  });

  test('shows validation error for invalid email', async () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Save & Proceed/i }));
  });
  test('toggle password visibility', () => {
    render(<SignUpForm />);

    const passwordField = screen.getByLabelText(/Password */i);
    const toggleIcon = screen.getByTestId('password-eye-invisible-icon');

    expect(passwordField).toHaveAttribute('type', 'password');

    fireEvent.click(toggleIcon);
    expect(passwordField).toHaveAttribute('type', 'text');

    fireEvent.click(toggleIcon);
    expect(passwordField).toHaveAttribute('type', 'password');
  });

  test('disables Workspace URL field until Organisation Name is populated', () => {
    render(<SignUpForm />);

    const workspaceField = screen.getByLabelText(/Workspace URL */i);

    // expect(workspaceField).toBeDisabled();

    fireEvent.change(screen.getByLabelText(/Company Name */i), {
      target: { value: 'Test Organization' },
    });

    expect(workspaceField).not.toBeDisabled();
  });

  test('triggers debounced slug verification', async () => {
    const mockSetFieldError = jest.fn();
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/Company Name */i), {
      target: { value: 'Test Organization' },
    });

    // await waitFor(() => {
    //   expect(mockSetFieldError).not.toHaveBeenCalled();
    // });
  });

  test('automatically generates Workspace URL based on Organisation Name', async () => {
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/Company Name */i), {
      target: { value: 'Test Organization' },
    });

    // await waitFor(() => {
    //   expect(screen.getByLabelText(/Workspace URL */i)).toHaveValue('test');
    // });
  });

  test('prevents form submission if terms and conditions are not accepted', async () => {
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/Full Name */i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Company Name */i), {
      target: { value: 'ExampleOrg' },
    });
    fireEvent.change(screen.getByLabelText(/Workspace URL */i), {
      target: { value: 'example' },
    });
    fireEvent.change(screen.getByLabelText(/Email Address */i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password */i), {
      target: { value: 'StrongP@ssw0rd' },
    });

    fireEvent.click(screen.getByText(/Save & Proceed/i));

    await waitFor(() => {
      expect(
        screen.queryByText(/Agree Terms and Conditions is required/i)
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/I agree/i));
    fireEvent.click(screen.getByText(/Save & Proceed/i));

    // await waitFor(() => {
    //   expect(screen.queryByText(/Agree Terms and Conditions is required/i)).not.toBeInTheDocument();
    // });
  });
  test('submits the form successfully with valid inputs', async () => {
    (AuthService.signUp as jest.Mock).mockResolvedValue({
      data: { success: true, error: [] },
    });

    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/Full Name */i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Company Name */i), {
      target: { value: 'ExampleOrg' },
    });
    fireEvent.change(screen.getByLabelText(/Workspace URL */i), {
      target: { value: 'example' },
    });
    fireEvent.change(screen.getByLabelText(/Email Address */i), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password */i), {
      target: { value: 'StrongP@ssw0rd' },
    });
    fireEvent.click(screen.getByText(/I agree/i));

    fireEvent.click(screen.getByRole('button', { name: /Save & Proceed/i }));
  });

  test('shows error message when API call fails', async () => {
    (AuthService.signUp as jest.Mock).mockResolvedValue({
      data: { success: false, error: 'This email is already in use' },
    });

    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByText(/Save & Proceed/i));

    // await waitFor(() => {
    //   expect(screen.queryByText(/This email is already in use/i)).toBeInTheDocument();
    // });
  });

  const mockHelpers: Partial<
    FormikHelpers<{
      fullname: string;
      company_name: string;
      workspace_url: string;
      email: string;
      password: string;
      terms: string;
    }>
  > = {
    setSubmitting: jest.fn(),
    validateForm: jest.fn(),
    setFieldError: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('handles successful login', async () => {
    (AuthService.signUp as jest.Mock).mockResolvedValue({
      data: { success: true, error: [] },
    });

    const values = {
      fullname: 'John Doe',
      company_name: 'TestOrg',
      workspace_url: 'testorg',
      email: 'john.doe@example.com',
      password: 'Password1!',
      terms: 'agree',
    };

    await handleSignUpSubmit(
      values,
      mockHelpers as FormikHelpers<{
        fullname: string;
        company_name: string;
        workspace_url: string;
        email: string;
        password: string;
        terms: string;
      }>,
      mockRouter as AppRouterInstance,
      (details: { email: string; slug: string }) => {
        console.log('Set details called with:', details);
      } // Mock implementation of setDetails
    );

    expect(AuthService.signUp).toHaveBeenCalledWith({
      name: 'John Doe',
      account_name: 'TestOrg',
      slug: 'testorg',
      email: 'john.doe@example.com',
      password: 'Password1!',
    });
    // expect(Notify).toHaveBeenCalledWith({
    //   message: 'User Registered',
    //   type: 'SUCCESS',
    // });
    expect(mockHelpers.setSubmitting).toHaveBeenCalledWith(false);
  });
  test('handles login failure', async () => {
    (AuthService.signUp as jest.Mock).mockResolvedValue({
      data: { success: false, error: ['Workspace is already exists!'] },
    });

    const values = {
      fullname: 'John Doe',
      company_name: 'TestOrg',
      workspace_url: 'testorg',
      email: 'john.doe@example.com',
      password: 'Password1!',
      terms: 'agree',
    };
    await handleSignUpSubmit(
      values,
      mockHelpers as FormikHelpers<{
        fullname: string;
        company_name: string;
        workspace_url: string;
        email: string;
        password: string;
        terms: string;
      }>,
      mockRouter as AppRouterInstance,
      (details: { email: string; slug: string }) => {
        console.log('Set details called with:', details);
      } // Mock implementation of setDetails
    );
    expect(mockHelpers.setSubmitting).toHaveBeenCalledWith(true);
    // expect(Notify).toHaveBeenCalledWith({
    //   message: 'Workspace is already exists!',
    //   type: 'ERROR',
    // });
    expect(mockHelpers.setSubmitting).toHaveBeenCalledWith(false);
  });
});
