import AccessWrapper from '@/components/AccessWrapper/AccessWrapper';
import AddorEditUser from '@/components/AddorEditUser/AddorEditUser';
import BusinessUnitList from '@/components/BusinessUnitList/BusinessUnitList';
import ActivityLog from '@/components/ActivityLog/ActivityLog';
import FileRepository from '@/components/FileRepository/FileRepository';
import ChangePassword from '@/components/ChangePassword/ChangePassword';
import CompanyInformationForm from '@/components/CompanyInformationForm/CompanyInformationForm';
import EmissionDatabaseForm from '@/components/EmissionDatabase/EmissionDatabaseForm';
import PageNotFound from '@/components/PageNotFound/PageNotFound';
import RolesAndAccess from '@/components/RolesAndAccess/RolesAndAccess';
import { auth } from '@/lib/auth';
import { IUser } from '@/lib/interface/IUser.interface';
import { DataCube, RoleService, UserService } from '@/lib/service';
import { redirect } from 'next/navigation';
import './SettingsLayout.css';

export default async function page({ params }: { params: { slug?: string } }) {
  const session = await auth();
  if (!session) {
    return redirect('/sign_in');
  }
  const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;
  const accessToken = (session?.user as unknown as { accessToken: string })
    ?.accessToken;
  const id = (session?.user as IUser)?.id;
  const userRes = await UserService.getCurrentUser(apiKey, accessToken);

  const { user } = userRes?.data as {
    user: IUser;
    success: boolean;
  };

  const ReRender = async () => {
    switch (params.slug) {
      case 'profile':
        return {
          title: 'My Profile',
          subTitle: 'Edit your Profile here',
          components: (
            <AddorEditUser apiKey={apiKey} isCurrentUser user={user} id={id} />
          ),
        };
      case 'change_password':
        return {
          title: 'Change Password',
          subTitle: 'Change your Password',
          components: <ChangePassword slug={apiKey} />,
        };
      case 'company_profile':
        return {
          title: 'Company Details',
          subTitle: 'Edit your Company details here',
          components: (
            <AccessWrapper module="ORGANIZATION" feature="READ">
              <CompanyInformationForm slug={apiKey} account={user?.account} />
            </AccessWrapper>
          ),
        };
      case 'business_unit':
        return {
          title: `Business Unit (${user?.account?.business_unit.length})`,
          subTitle: 'Add / edit your Business units',
          components: (
            <AccessWrapper module="BUSINESS_UNIT" feature="READ">
              <BusinessUnitList
                slug={apiKey}
                businessUnits={user?.account?.business_unit}
              />
            </AccessWrapper>
          ),
        };
      case 'emissions_database':
        return {
          title: 'Emissions Database',
          subTitle: 'Select your Emissions Database here',
          components: <EmissionDatabaseForm />,
        };
      case 'roles': {
        const resp = await RoleService.getRoleConfig(apiKey, accessToken);
        return {
          title: 'Roles And Access',
          subTitle: 'Edit Roles and Access here',
          components: (
            <AccessWrapper module="SETTINGS" feature="ROLES">
              <RolesAndAccess roleAccess={resp?.data} slug={apiKey} />
            </AccessWrapper>
          ),
        };
      }
      case 'activity_log': {
        const activityLogData = await DataCube.getActivityLog(apiKey, {}, accessToken);
        return {
          title: 'Activity Log',
          subTitle: 'Settings',
          components: (
            <ActivityLog
              apiKey={apiKey}
              accessToken={accessToken}
              initialData={activityLogData?.data}
            />
          ),
        };
      }
      case 'file_repository': {
        return {
          title: 'File Repository',
          subTitle: 'See all Data logs',
          components: (
            <FileRepository apiKey={apiKey} accessToken={accessToken} />
          ),
        };
      }
      default:
        return {
          title: '',
          components: <PageNotFound isAccessDenied />,
        };
    }
  };

  const getComponent = async (role: string, slug: string) => {
    const component = (await ReRender())?.components;

    if (role === 'ADMIN') {
      return component;
    }

    if (['company_profile', 'business_unit', 'roles'].includes(slug)) {
      return (
        <AccessWrapper module="SETTINGS" feature={slug.toUpperCase()}>
          {component}
        </AccessWrapper>
      );
    }

    return component;
  };

  return (
    <div className="p-3 p-md-4">
      {params?.slug !== 'roles' && params?.slug !== 'activity_log' && params?.slug !== 'file_repository' && (
        <div className=" pb-5">
          <span className="settings-subtitle">
            {(await ReRender())?.subTitle}
          </span>
          <h4 className="fw-700 mb-0">{(await ReRender())?.title}</h4>
        </div>
      )}
      {params?.slug === 'activity_log' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          gap: '1rem',
          paddingBottom: '1rem',
        }}
        >
          <div>
            <span className="settings-subtitle">
              {(await ReRender())?.subTitle}
            </span>
            <h4 className="fw-700 mb-0">{(await ReRender())?.title}</h4>
          </div>
          <div>{/* Filters will be rendered here by ActivityLog component */}</div>
        </div>
      )}
      {await getComponent(user?.role, params?.slug as string)}
    </div>
  );
}
