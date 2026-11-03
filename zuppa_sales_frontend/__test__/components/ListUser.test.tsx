import ListUsers, { closeModal, getActionMessage, getModalTitle, handleConfirm } from '@/components/ListUsers/ListUsers';
import { useModal } from '@/components/Modal/Context';
import { IMeta } from '@/lib/interface/IMeta.interface';
import { IUser, IUserFilter } from '@/lib/interface/IUser.interface';
import { UserService } from '@/lib/service';
import { render } from '@testing-library/react';
import { Session } from 'next-auth';

jest.mock("@/lib/utils", () => ({
  convertToPascalCase: jest.fn(),
  getStatusColor: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("@/lib/service", () => ({
  UserService: {
    blockUser: jest.fn(),
    unBlockUser: jest.fn(),
    deleteUser: jest.fn(),
  }
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => "/users"),
  useSearchParams: jest.fn()
}));

jest.mock('@/components/Modal/Context', () => ({
  useModal: jest.fn(),
}));

const mockUsers: IUser[] = [
  {
    id: "1", name: "John Doe", email: "john@example.com", role: "ADMIN", status: "ACTIVE", avatar_url: "", createdAt: "", updatedAt: "", is_guest: false,
    created_by_type: null,
    created_by: null,
    phone_number: null,
    confirmed_at: "",
    password_reset_on: null,
    accept_terms_of_service: false,
    last_login_at: "",
    block_reason: null,
    blocked_on: null,
    departments: null,
    account: null,
    company_name: ''
  },
  {
    id: "2", name: "Jane Smith", email: "jane@example.com", role: "GUEST", status: "BLOCKED", avatar_url: "", createdAt: "", updatedAt: "", is_guest: false,
    created_by_type: null,
    created_by: null,
    phone_number: null,
    confirmed_at: "",
    password_reset_on: null,
    accept_terms_of_service: false,
    last_login_at: "",
    block_reason: null,
    blocked_on: null,
    departments: null,
    account: null,
    company_name: ''
  },
  {
    id: "3", name: "Jane Smith", email: "jane@example.com", role: "GUEST", status: "PENDING", avatar_url: "", createdAt: "", updatedAt: "", is_guest: false,
    created_by_type: null,
    created_by: null,
    phone_number: null,
    confirmed_at: "",
    password_reset_on: null,
    accept_terms_of_service: false,
    last_login_at: "",
    block_reason: null,
    blocked_on: null,
    departments: null,
    account: null,
    company_name: ''
  },
];

const mockMeta: IMeta = {
  totalCount: 2,
  currentCount: 10,
  currentPage: "1",
  currentLimit: "10"
};

const mockParams: IUserFilter = { page: "", limit: "", sort: "", search: "", role: "", status: "" }
const hideModal = jest.fn();
const setCurrentUser = jest.fn();
const setActionType = jest.fn();
const router = { refresh: jest.fn() };
const mockHideModal = jest.fn();
const mockSession = { user: { apiKey: "api-key", id: "user-id" } } as unknown as Session;

beforeEach(() => {
  (useModal as jest.Mock).mockImplementation(() => mockHideModal);
});

test('renders users correctly', () => {
  render(<ListUsers users={mockUsers} meta={mockMeta} params={mockParams} session={mockSession} />);
});

test('handles block action correctly', async () => {
  render(<ListUsers users={mockUsers} meta={mockMeta} params={mockParams} session={mockSession} />);

  (UserService.blockUser as jest.Mock).mockResolvedValueOnce({ data: { success: true } });

});

test('renders the invite button and calls the appropriate action', () => {
  render(<ListUsers users={mockUsers} meta={mockMeta} params={mockParams} session={mockSession} />);

});

test('handles delete action correctly', async () => {
  render(<ListUsers users={mockUsers} meta={mockMeta} params={mockParams} session={mockSession} />);

  (UserService.deleteUser as jest.Mock).mockResolvedValueOnce({ data: { success: true } });
});

test("calls getModalTitle correctly for different actions", () => {
  expect(getModalTitle('Edit')).toBe('Edit User');
  expect(getModalTitle('Block')).toBe('Invite User');
  expect(getModalTitle('Unblock')).toBe('Invite User');
  expect(getModalTitle('Delete')).toBe('Invite User');
  expect(getModalTitle('ResendInvitation')).toBe('Resend Invitation');
});

test("calls getActionMessage correctly for different actions", () => {
  expect(getActionMessage('Block')).toBe('block this user');
  expect(getActionMessage('Unblock')).toBe('unblock this user');
  expect(getActionMessage('Delete')).toBe('delete this user');
});
test('should hide modal, reset current user and action type, and refresh the router', () => {

  closeModal(hideModal, setCurrentUser, setActionType, router as any);
  expect(hideModal).toHaveBeenCalledTimes(1);
  expect(setCurrentUser).toHaveBeenCalledWith(undefined);
  expect(setActionType).toHaveBeenCalledWith(null);
  expect(router.refresh).toHaveBeenCalledTimes(1);
});

test('should hide modal, reset current user and action type, and refresh the router', () => {
  closeModal(hideModal, setCurrentUser, setActionType, router as any);

  expect(hideModal).toHaveBeenCalledTimes(2);
  expect(setCurrentUser).toHaveBeenCalledWith(undefined);
  expect(setActionType).toHaveBeenCalledWith(null);
  expect(router.refresh).toHaveBeenCalledTimes(2);
});

test('should not proceed if currentUser is undefined', async () => {
  await handleConfirm(
    undefined,
    'Block',
    {
      reason: 'Reason',
      apiKey: 'apiKey'
    },
    hideModal,
    setCurrentUser,
    setActionType,
    router as any
  );
});

test('should show an error if the reason is empty for Block action', async () => {
  await handleConfirm(
    mockUsers[0],
    'Block',
    {
      reason: '',
      apiKey: 'apiKey'
    },
    hideModal,
    setCurrentUser,
    setActionType,
    router as any
  );
});

test('should call blockUser and handle success', async () => {
  (UserService.blockUser as jest.Mock).mockResolvedValue({ data: { success: true, error: [] } });

  await handleConfirm(
    mockUsers[0],
    'Block',
    {
      reason: 'Some reason',
      apiKey: 'apiKey'
    },
    hideModal,
    setCurrentUser,
    setActionType,
    router as any
  );

  expect(UserService.blockUser).toHaveBeenCalledWith({ blocked_reason: 'Some reason' }, 'apiKey', '1');
  expect(hideModal).toHaveBeenCalled();
  expect(setCurrentUser).toHaveBeenCalledWith(undefined);
  expect(setActionType).toHaveBeenCalledWith(null);
  expect(router.refresh).toHaveBeenCalledTimes(3);
});

test('should call unBlockUser and handle success', async () => {
  (UserService.unBlockUser as jest.Mock).mockResolvedValue({ data: { success: true, error: [] } });

  await handleConfirm(
    mockUsers[1],
    'Unblock',
    {
      reason: 'Reason',
      apiKey: 'apiKey'
    },
    hideModal,
    setCurrentUser,
    setActionType,
    router as any
  );

  expect(UserService.unBlockUser).toHaveBeenCalledWith('apiKey', '2');
});

test('should call deleteUser and handle success', async () => {
  (UserService.deleteUser as jest.Mock).mockResolvedValue({ data: { success: true, error: [] } });

  await handleConfirm(
    mockUsers[2],
    'Delete',
    {
      reason: 'Reason',
      apiKey: 'apiKey'
    },
    hideModal,
    setCurrentUser,
    setActionType,
    router as any
  );

  expect(UserService.deleteUser).toHaveBeenCalledWith('apiKey', '3');
});

test('should handle error response from blockUser', async () => {
  (UserService.blockUser as jest.Mock).mockResolvedValue({ data: { success: false, error: ['Error message'] } });

  await handleConfirm(
    mockUsers[0],
    'Block',
    {
      reason: 'Reason',
      apiKey: 'apiKey'
    },
    hideModal,
    setCurrentUser,
    setActionType,
    router as any
  );
});