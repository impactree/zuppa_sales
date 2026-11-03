import { AuthLayout } from '@/components/Layout/AuthLayout';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    refresh: jest.fn(),
  })),
  useParams: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
  useSession: jest.fn(() => ({
    data: null,
  }))
}));

jest.mock('@/lib/service', () => ({
  AuthService: {
    logout: jest.fn(),
  },
}));

const mockRouter = { 
  push: jest.fn(),
  refresh: jest.fn(),
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
});

test('renders the sign-in page layout', () => {
  (usePathname as jest.Mock).mockReturnValue('/sign_in');

  render(
    <AuthLayout slug="test-slug">
      <div>Sign In Page</div>
    </AuthLayout>
  );

  expect(screen.getByText('Sign In Page')).toBeInTheDocument();
});

test('renders the sign-up page layout', () => {
  (usePathname as jest.Mock).mockReturnValue('/sign_up');

  render(
    <AuthLayout slug="test-slug">
      <div>Sign Up Page</div>
    </AuthLayout>
  );

  expect(screen.getByText('Sign Up Page')).toBeInTheDocument();
});

test('renders authorized layout with logout button', async () => {
  (usePathname as jest.Mock).mockReturnValue('/company_profile');

  render(
    <AuthLayout slug="test-slug">
      <div>Authorized Page</div>
    </AuthLayout>
  );

  expect(screen.getByText('Authorized Page')).toBeInTheDocument();
  const logoutButton = screen.getByText('Logout');
  expect(logoutButton).toBeInTheDocument();

  fireEvent.click(logoutButton);
});

test('renders dashboard layout', () => {
  (usePathname as jest.Mock).mockReturnValue('/dashboard');

  render(
    <AuthLayout slug="test-slug">
      <div>Dashboard Page</div>
    </AuthLayout>
  );

  expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
});
