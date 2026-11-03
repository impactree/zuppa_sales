import AcceptInvitationForm, { handleSubmitAcceptInvitation } from '@/components/AcceptInvitation/AcceptInvitationForm';
import { IUser } from '@/lib/interface/IUser.interface';
import { AuthService } from '@/lib/service';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('@/lib/service', () => ({
  AuthService: {
    acceptInvitation: jest.fn(),
    acceptInvitationByAdmin: jest.fn(),
  },
}));

const mockPush = jest.fn();

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  mockPush.mockClear();
});

const mockRouter: Partial<AppRouterInstance> = {
  push: mockPush,
};

const user: IUser = {
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

const mockValidateForm = jest.fn();
const mockSetFieldError = jest.fn();

const values = {
  phone_number: '1234567890',
  password: 'password123',
  confirm_password: 'password123',
  accept_terms_and_conditions: true,
};

const slug = 'test-slug';
const token = 'test-token';

afterEach(() => {
  jest.clearAllMocks();
});

test('renders the form with all fields when isAccount is false', () => {
  render(<AcceptInvitationForm isAccount={false} slug="test-slug" token={''} user={user} />);

  expect(screen.getByLabelText(/Enter Your Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
  expect(screen.getByText(/I agree to/i)).toBeInTheDocument();
});

test('hides name and phone number fields when isAccount is true', () => {
  render(<AcceptInvitationForm isAccount slug="test-slug" token={''} user={user} />);

  expect(screen.queryByLabelText(/Enter Your Name/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/Phone Number/i)).not.toBeInTheDocument();

  expect(screen.getByLabelText(/Enter Password */i)).toBeInTheDocument();
});

test('redirects to sign_in on successful submission', async () => {
  render(<AcceptInvitationForm isAccount={false} slug="test-slug" token={''} user={user} />);

  fireEvent.change(screen.getByLabelText(/Enter Your Name/i), {
    target: { value: 'John Doe' },
  });
  fireEvent.change(screen.getByLabelText(/Phone Number/i), {
    target: { value: '+1234567890' },
  });
  // fireEvent.change(screen.getByLabelText(/New Password/i), {
  //   target: { value: 'Password1!' },
  // });
  fireEvent.click(screen.getByText(/I agree/i));
  fireEvent.click(screen.getByText(/Let me in/i));
});

test('toggles password visibility', () => {
  render(<AcceptInvitationForm isAccount={false} slug="test-slug" token={''} user={user} />);
  screen.getByLabelText(/Phone Number/i);
});


test('should show error for invalid phone number if isAccount is false', async () => {
  const isAccount = false;

  await handleSubmitAcceptInvitation(
    values as any,
    slug,
    token,
    { validateForm: mockValidateForm, setFieldError: mockSetFieldError } as any,
    mockRouter as any,
    isAccount
  );

  expect(mockSetFieldError).toHaveBeenCalledWith('phone_number', 'Must be valid Phone Number');
  expect(mockRouter.push).not.toHaveBeenCalled(); // No redirect if validation fails
});

test('should successfully accept invitation for admin', async () => {
  const isAccount = true;
  const mockResponse = { data: { success: true, error: [] } };
  (AuthService.acceptInvitationByAdmin as jest.Mock).mockResolvedValue(mockResponse);

  await handleSubmitAcceptInvitation(
    values as any,
    slug,
    token,
    { validateForm: mockValidateForm, setFieldError: mockSetFieldError } as any,
    mockRouter as any,
    isAccount
  );

  expect(mockRouter.push).toHaveBeenCalledWith('/sign_in');
});

test('should fail to accept invitation and show error', async () => {
  const isAccount = true;
  const mockResponse = { data: { success: false, error: ['Failed to accept invitation'] } };
  (AuthService.acceptInvitation as jest.Mock).mockResolvedValue(mockResponse);

  await handleSubmitAcceptInvitation(
    values as any,
    slug,
    token,
    { validateForm: mockValidateForm, setFieldError: mockSetFieldError } as any,
    mockRouter as any,
    isAccount
  );

});

test('should fail to accept invitation and show error', async () => {
  const isAccount = true;
  const mockResponse = { data: { success: true, error: ['Failed to accept invitation'] } };
  (AuthService.acceptInvitation as jest.Mock).mockResolvedValue(mockResponse);

  await handleSubmitAcceptInvitation(
    values as any,
    slug,
    token,
    { validateForm: mockValidateForm, setFieldError: mockSetFieldError } as any,
    mockRouter as any,
    isAccount
  );

});

test('should validate form if isAccount is true', async () => {
  const isAccount = true;

  await handleSubmitAcceptInvitation(
    values as any,
    slug,
    token,
    { validateForm: mockValidateForm, setFieldError: mockSetFieldError } as any,
    mockRouter as any,
    isAccount
  );

  expect(mockValidateForm).toHaveBeenCalledWith(values);
});