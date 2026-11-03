import BusinessUnitForm from '@/components/BusinessUnitForm/BusinessUnitForm';
import CompanyInformationForm from '@/components/CompanyInformationForm/CompanyInformationForm';
// import SkipButton from '@/components/SkipButton/SkipButton';
import StandardRegulationsForm from '@/components/StandardRegulationsForm/StandardRegulationsForm';
import UserInviteForm from '@/components/UserInviteForm/UserInviteForm';
import { auth } from '@/lib/auth';
import { IStandard } from '@/lib/interface/IStandard.interface';
import { IUser } from '@/lib/interface/IUser.interface';
import { DataCube, RoleService, UserService } from '@/lib/service';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await auth();
  const headersList = headers();
  const host = headersList.get('host');
  const slug = host?.split('.')[0] ?? '';
  if (!session) {
    return redirect('/sign_in');
  }
  const token = (session?.user as { accessToken: string })?.accessToken;
  const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;

  const userResponse = await UserService.getCurrentUser(apiKey, token);
  const { user, success } = userResponse?.data as {
    user: IUser;
    success: boolean;
  };

  const roleRes = await RoleService.getCurrentAccess(apiKey, token);
  const { access } = roleRes?.data as {
    access: Record<string, string[]>;
  };

  if (!success) {
    return redirect('/sign_in');
  }
  const onboardingPath = [
    '/company_profile/company_information',
    '/company_profile/business_unit',
    '/company_profile/standard_regulations',
    '/company_profile/invite_user',
    '/home',
  ];

  const currentOnboardingStage = user?.account?.current_onboarding_stage ?? -1;
  const adjustedOnboardingStage = currentOnboardingStage >= 4 ? 4 : currentOnboardingStage;
  const targetPath = onboardingPath[adjustedOnboardingStage];

  function resolveRedirectPath(
    currentSlug: string,
    currentTargetPath: string | undefined,
    _access: Record<string, string[]>,
  ): string | null {
    if (
      currentTargetPath
      && currentTargetPath !== `/company_profile/${currentSlug}`
    ) {
      if (currentTargetPath === '/home') {
        return _access?.HEADER
          ? `/${_access.HEADER[0]?.toLowerCase() || 'access_denied'}`
          : '/home';
      }
      return currentTargetPath;
    }
    return null;
  }

  const redirectPath = resolveRedirectPath(params.slug, targetPath, access);
  if (redirectPath) {
    return redirect(redirectPath);
  }

  const content = (async () => {
    switch (params.slug) {
      case 'company_information':
        return <CompanyInformationForm slug={slug} account={user?.account} />;
      case 'business_unit':
        return <BusinessUnitForm slug={slug} />;
      case 'standard_regulations': {
        const res = await DataCube.getAllStandards(apiKey, token);
        const { standards } = res?.data as {
          standards: IStandard[];
        };
        return (
          <StandardRegulationsForm
            standards={standards}
            account={user?.account}
          />
        );
      }
      case 'invite_user':
        return <UserInviteForm slug={slug} />;
        // case 'plans':
        //   return (
        //     <div className=" d-flex justify-content-center align-items-center
        //      flex-column pt-5 mt-5">
        //       <div
        //         className=" fw-600 text-uppercase fs-15"
        //         style={{ letterSpacing: '2px' }}
        //       >
        //         Plans need to update
        //       </div>

      //       <SkipButton apiKey={slug} type="plan" />
      //     </div>
      //   );
      default:
        return <div>Access Denied</div>;
    }
  })();

  return (
    <div
      className={
        params.slug === 'standard_regulations'
          ? ''
          : 'd-flex justify-content-center align-items-center'
      }
    >
      {content}
    </div>
  );
}
