import Header, { HeaderProps } from '@/components/Header/Header';
import { IUser } from '@/lib/interface/IUser.interface';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

// Mock dependencies
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
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

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: { user: { name: 'John Doe' } } })),
  signOut: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}));

// Mock Data
const mockProps: HeaderProps = {
  user: mockUser,
  menuItems: [
    { label: 'Dashboard', path: '/dashboard', isActive: false },
    { label: 'Users', path: '/users', isActive: false },
    { label: 'Accounts', path: '/accounts', isActive: false },
    { label: 'Masters', path: '/masters', isActive: false },
  ],
  profileMenu: [
    { label: 'Profile', path: '/profile', icon: <span>P</span> },
    { label: 'Logout', path: '/sign_in', icon: <span>L</span> },
  ],
};

describe('Header Component', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/dashboard');
  });

  test('renders the header with logo and menu items', () => {
    render(
      <Header {...mockProps} />
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  test('triggers logout on clicking logout button', async () => {
    render(
      <Header {...mockProps} />
    );

    fireEvent.click(screen.getByText('Logout'));
  });

  test('triggers logout after session timeout', async () => {
    jest.useFakeTimers();
    render(
      <Header {...mockProps} />
    );

    jest.advanceTimersByTime(30 * 60 * 1000);
    jest.useRealTimers();
  });
});
