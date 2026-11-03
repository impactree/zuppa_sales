import AccessWrapper from '@/components/AccessWrapper/AccessWrapper';
import ListUsers from '@/components/ListUsers/ListUsers';
import { auth } from '@/lib/auth';
import { IMeta } from '@/lib/interface/IMeta.interface';
import { IUser, IUserFilter } from '@/lib/interface/IUser.interface';
import { UserService } from '@/lib/service';
import { redirect } from 'next/navigation';

export default async function page({ searchParams }: {
  searchParams: IUserFilter
}) {
  const session = await auth();
  if (!session) {
    return redirect('/sign_in');
  }
  const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;
  const accessToken = (session?.user as unknown as { accessToken: string })?.accessToken;
  const userRes = await UserService.getCurrentUser(apiKey, accessToken);

  const { user, success } = userRes?.data as {
    user: IUser;
    success: boolean;
  };

  if (!success) {
    return redirect('/sign_in');
  }

  if (session !== null) {
    switch (user?.account?.current_onboarding_stage) {
      case 1:
        return redirect('/company_profile/standard_regulations');
      case 2:
        return redirect('/company_profile/invite_user');
      // case 3:
      //   return redirect('/company_profile/plans');
      case 0:
        return redirect('/company_profile/company_information');
      default:
        break;
    }
  }

  const params = {
    page: searchParams?.page,
    limit: searchParams?.limit,
    sort: searchParams?.sort,
    search: searchParams?.search,
    role: searchParams?.role,
    status: searchParams?.status,
  };
  const res = await UserService?.getAllUsers(params, apiKey, accessToken);

  const { users, meta } = res?.data as {
    success: boolean;
    users: IUser[];
    meta: IMeta;
  };

  return (
    <AccessWrapper module="HEADER" feature="USERS">
      <AccessWrapper feature="READ" module="USER">
        <ListUsers
          users={users}
          meta={meta}
          params={params}
          session={session}
        />
      </AccessWrapper>
    </AccessWrapper>
  );
}
