import AcceptInvitationForm from '@/components/AcceptInvitation/AcceptInvitationForm';
import { IAccount } from '@/lib/interface/IAccount.interface';
import { IUser } from '@/lib/interface/IUser.interface';
import { AuthService } from '@/lib/service';
import { headers } from 'next/headers';

export default async function page({
  searchParams,
}: {
  searchParams: {
    token: string,
    isAccount: string
  }
}) {
  const headersList = headers();
  const host = headersList.get('host');
  const slug = host?.split('.')[0] ?? '';

  const res = searchParams?.isAccount === 'true'
    ? await AuthService.getVerifyAdminToken(searchParams?.token)
    : await AuthService.verifyInvitation(
      searchParams?.token,
      slug,
    );

  const {
    success,
    error,
    user,
    account,
  } = res?.data as {
    success: boolean;
    error: string[];
    user: IUser;
    account: IAccount;
  };

  return (

    <div>
      {success
        ? (
          <AcceptInvitationForm
            slug={slug}
            token={searchParams?.token}
            user={user}
            account={account}
            isAccount={searchParams?.isAccount === 'true'}
          />
        )
        : (
          <div className="d-flex justify-content-center mt-4 fs-4 fw-bold text-danger">
            {error[0]}
          </div>
        )}
    </div>
  );
}
