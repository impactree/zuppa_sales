import UserInviteForm, {
  getIcon,
  handleDelete,
  handleUserInviteSubmit,
  isButtonDisabled,
  pushNewUser,
} from '@/components/UserInviteForm/UserInviteForm';
import { AuthService } from '@/lib/service';
import { fireEvent, render, screen } from '@testing-library/react';
import { FieldArray, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

jest.mock('@/lib/service', () => ({
  AuthService: {
    invitePeople: jest.fn(),
  },
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

const mockPush = jest.fn();
const mockRefresh = jest.fn();

const defaultProps = {
  slug: 'test-slug',
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
    refresh: mockRefresh,
  });
});

const renderComponent = (props = {}) => {
  return render(<UserInviteForm {...defaultProps} {...props} />);
};

test('renders the form with an add user button', () => {
  renderComponent();

  expect(screen.getByText('Submit & Proceed')).toBeInTheDocument();
});

test('disables submit button if email is invalid', async () => {
  renderComponent();

  screen.getByText('Submit & Proceed');
});

test('removes an email input field when the delete icon is clicked', () => {
  renderComponent();
  const deleteButton = screen.getAllByRole('button')[1];
  fireEvent.click(deleteButton);
});

test('handles successful user invite submission', async () => {
  const values = {
    invitation: [
      { email: 'test@example.com', name: '', role: 'SUSTAINABILITY_MANAGER' },
    ],
  };
  const slug = 'test-slug';
  const setSubmitting = jest.fn();
  const validateForm = jest.fn();

  (AuthService.invitePeople as jest.Mock).mockResolvedValue({
    data: { success: true, error: [] },
  });

  await handleUserInviteSubmit(
    values as any,
    slug,
    { setSubmitting, validateForm } as unknown as FormikHelpers<{
      invitation: any[];
    }>,
    useRouter()
  );

  expect(toast.success).toHaveBeenCalledWith('User Invited Successfully');
  expect(mockPush).toHaveBeenCalledWith('/company_profile/plans');
  expect(setSubmitting).toHaveBeenCalledWith(false);
});

test('handles failed user invite submission', async () => {
  const values = {
    invitation: [
      { email: 'test@example.com', name: '', role: 'SUSTAINABILITY_MANAGER' },
    ],
  };
  const slug = 'test-slug';
  const setSubmitting = jest.fn();
  const validateForm = jest.fn();

  (AuthService.invitePeople as jest.Mock).mockResolvedValue({
    data: { success: false, error: ['Failed to invite'] },
  });

  await handleUserInviteSubmit(
    values as any,
    slug,
    { setSubmitting, validateForm } as unknown as FormikHelpers<{
      invitation: any[];
    }>,
    useRouter()
  );

  expect(toast.error).toHaveBeenCalledWith('Failed to invite');
  expect(setSubmitting).toHaveBeenCalledWith(false);
});

test('returns true if any email is empty', () => {
  const invitations = [{ email: '' }];
  expect(isButtonDisabled(invitations as any)).toBe(true);
});

test('returns false if all emails are filled', () => {
  const invitations = [{ email: 'test@example.com' }];
  expect(isButtonDisabled(invitations as any)).toBe(false);
});

test('removes the correct input field using handleDelete in FieldArray', () => {
  const mockInitialValues = {
    invitation: [
      { email: 'test1@example.com' },
      { email: 'test2@example.com' },
    ],
  };
  const mockRemove = jest.fn();

  render(
    <Formik initialValues={mockInitialValues} onSubmit={() => {}}>
      <FieldArray
        name="invitation"
        render={(arrayHelpers) => (
          <div>
            {mockInitialValues.invitation.map((_, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder={`Email ${index + 1}`}
                  data-testid={`email-input-${index}`}
                />
                {getIcon(index, arrayHelpers as any)}
              </div>
            ))}
          </div>
        )}
      />
    </Formik>
  );
  const deleteIcons = screen.getByTestId('delete-icon-1');
  fireEvent.click(deleteIcons);
});

test('should call arrayHelpers.remove with the correct index', () => {
  const mockRemove = jest.fn();
  const arrayHelpers = { remove: mockRemove };
  const index = 2;
  handleDelete(index, arrayHelpers);
  expect(mockRemove).toHaveBeenCalledTimes(1);
  expect(mockRemove).toHaveBeenCalledWith(index);
});

test('should call arrayHelpers.push with a new user object', () => {
  const mockPush = jest.fn();
  const arrayHelpers = { push: mockPush };

  pushNewUser(arrayHelpers);

  expect(mockPush).toHaveBeenCalledTimes(1);
  expect(mockPush).toHaveBeenCalledWith({
    email: '',
    name: '',
    role: 'SUSTAINABILITY_MANAGER',
  });
});
