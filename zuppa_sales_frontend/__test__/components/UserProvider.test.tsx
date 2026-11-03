import { UserContextProp, UserProvider, useUser } from '@/components/Context/userProvider';
import { IUser } from '@/lib/interface/IUser.interface';
import { UserService } from '@/lib/service';
import { act, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

// Mock UserService
jest.mock('@/lib/service', () => ({
  UserService: {
    getCurrentUser: jest.fn(),
  },
}));

const MockComponent = () => {
  const { currentUser, getCurrentUser } = useUser() as UserContextProp;
  return (
    <>
      <div>
        {currentUser ? `User: ${currentUser.name}` : 'No user'}
      </div>
      <button onClick={() => getCurrentUser('slug')}>
        Get User
      </button>
    </>
  );
};

const Wrapper = ({ children }: { children: ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

beforeEach(() => {
  jest.clearAllMocks();
});

test('renders the context provider with children', () => {
  render(
    <Wrapper>
      <MockComponent />
    </Wrapper>
  );
  expect(screen.getByText('No user')).toBeInTheDocument();
});

test('calls getCurrentUser and sets currentUser in context on success', async () => {
  const mockUser: IUser = {
    id: '1', name: 'John Doe', email: 'john@example.com',
    avatar_url: '',
    createdAt: '',
    updatedAt: '',
    created_by_type: null,
    created_by: null,
    phone_number: null,
    status: '',
    confirmed_at: '',
    password_reset_on: null,
    accept_terms_of_service: false,
    last_login_at: '',
    block_reason: null,
    blocked_on: null,
    role: 'ADMIN',
    departments: null,
    account: null,
    is_guest: false,
    company_name: ''
  };
  const mockResponse = { data: { user: mockUser, success: true } };
  (UserService.getCurrentUser as jest.Mock).mockResolvedValueOnce(mockResponse);

  render(
    <Wrapper>
      <MockComponent />
    </Wrapper>
  );

  const button = screen.getByText('Get User');
  await act(async () => {
    button.click();
  });

  expect(UserService.getCurrentUser).toHaveBeenCalledWith('slug');
  expect(screen.getByText('User: John Doe')).toBeInTheDocument();
});

test('does not set currentUser if getCurrentUser fails', async () => {
  const mockResponse = { data: { user: null, success: false } };
  (UserService.getCurrentUser as jest.Mock).mockResolvedValueOnce(mockResponse);

  render(
    <Wrapper>
      <MockComponent />
    </Wrapper>
  );

  const button = screen.getByText('Get User');
  await act(async () => {
    button.click();
  });

  expect(UserService.getCurrentUser).toHaveBeenCalledWith('slug');
  expect(screen.getByText('No user')).toBeInTheDocument();
});

test('does not update currentUser if no user is returned from getCurrentUser', async () => {
  const mockResponse = { data: { user: null, success: false } };
  (UserService.getCurrentUser as jest.Mock).mockResolvedValueOnce(mockResponse);

  render(
    <Wrapper>
      <MockComponent />
    </Wrapper>
  );

  const button = screen.getByText('Get User');
  await act(async () => {
    button.click();
  });

  expect(screen.getByText('No user')).toBeInTheDocument();
});
