import ChangeAvatar from '@/components/ChangeAvatar/ChangeAvatar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/PageHeaderWrapper';
import { SettingsNavBar } from '@/components/SettingsNavBar/SettingsNavBar';
import { auth } from '@/lib/auth';
import { IUser } from '@/lib/interface/IUser.interface';
import { RoleService, UserService } from '@/lib/service';
import { convertToPascalCase } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaUsersGear } from 'react-icons/fa6';
import { HiOutlineSquare3Stack3D } from 'react-icons/hi2';
import { MdAddBusiness } from 'react-icons/md';
import { RiBarChart2Line, RiLockPasswordLine } from 'react-icons/ri';
import { PiClock } from 'react-icons/pi';
import { DataViewAlt } from '@carbon/icons-react';

export default async function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  const session = await auth();
  if (!session) {
    return redirect('/sign_in');
  }
  const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;
  const accessToken = (session?.user as unknown as { accessToken: string })
    ?.accessToken;
  const userRes = await UserService.getCurrentUser(apiKey, accessToken);
  const res = await RoleService.getCurrentAccess(apiKey, accessToken);
  const { access } = res?.data as {
    access: Record<string, string[]>;
  };

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

  const menu = [
    {
      text: 'Profile',
      subText: 'Personal details',
      settingIcon: <FaRegUserCircle size={24} />,
    },
    {
      text: 'Change Password',
      subText: 'Password details',
      settingIcon: <RiLockPasswordLine size={24} />,
    },
    {
      text: 'Emissions Database',
      subText: 'Setup Emission Factors',
      settingIcon: <HiOutlineSquare3Stack3D size={24} />,
    },
  ];

  const additionalMenu = [
    {
      text: 'Company Profile',
      subText: 'Company details',
      settingIcon: <RiBarChart2Line size={24} />,
    },
    {
      text: 'Business Unit',
      subText: 'Business unit details',
      settingIcon: <MdAddBusiness size={24} />,
    },
    {
      text: 'Roles',
      subText: 'Roles details',
      settingIcon: <FaUsersGear size={24} />,
    },
    {
      text: 'Activity Log',
      subText: 'Daily Activity Record',
      settingIcon: <PiClock size={24} />,
    },
    {
      text: 'File Repository',
      subText: 'Data logs',
      settingIcon: <DataViewAlt size={24} />,
    },
  ];

  const hasAccess = (feature: string) => access?.SETTINGS?.includes(feature);

  const filteredItems = additionalMenu.filter((item) => hasAccess(item.text?.toLocaleUpperCase()?.replaceAll(' ', '_')));

  return (
    <PageHeaderWrapper title="Settings">
      <Row className="settings-card-container m-0">
        <Col className="col-12 col-lg-3 border-end p-0 ">
          <div className=" p-4">
            {/* <h4 className="fw-700 mb-0">Settings</h4> */}
            <span className="settings-subtitle">Choose a setting</span>
          </div>
          <ChangeAvatar
            user={user}
            apiKey={apiKey}
            isUser={params?.slug !== 'company_profile'}
          />
          <div className="d-flex flex-column p-4 mt-3 overflow-y-scroll" style={{ height: '35vh' }}>
            {[
              ...menu,
              ...(user?.role === 'ADMIN' ? additionalMenu : filteredItems),
            ]?.map((item) => (
              <div key={item?.text}>
                <SettingsNavBar
                  url={item?.text?.toLowerCase()?.replaceAll(' ', '_')}
                  text={item?.text}
                  subText={item?.subText}
                  isRadius
                  settingIcon={item?.settingIcon}
                  menu={convertToPascalCase(
                    params?.slug?.replaceAll('_', ' ') ?? '',
                  )}
                />
              </div>
            ))}
          </div>
        </Col>
        <Col className="col-12 col-lg-9">{children}</Col>
      </Row>
    </PageHeaderWrapper>
  );
}
