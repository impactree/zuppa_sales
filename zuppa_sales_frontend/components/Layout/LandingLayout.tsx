'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineLogout } from 'react-icons/md';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useUser } from '../Context/userProvider';
import Header, { IMenuItem, IProfileItem } from '../Header/Header';

export default function LandingLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const context = useUser();
  const pathname = usePathname();
  useEffect(() => {
    if (context) {
      context?.getCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rootMenu: IMenuItem[] = [
    {
      label: 'Home',
      path: '/home',
    },
    {
      label: 'Data Cubes',
      path: '/data_cubes',
    },
    {
      label: 'Users',
      path: '/users',
    },
    {
      label: 'Tasks',
      path: '/tasks',
    },
    {
      label: 'Reports',
      path: '/report',
    },
    {
      label: 'Insights',
      path: '',
    },
    {
      label: 'Disclosure',
      path: '',
    },
    // {
    //   label: 'Analytics',
    //   path: '/analytics',
    // },
    // {
    //   label: 'Dept Dashboard',
    //   path: '/department_dashboard',
    // },
  ];

  // const insightsMenu: IMenuItem[] = [
  //   {
  //     label: 'Analytics',
  //     path: '/insights/analytics',
  //   },
  //   {
  //     label: 'Department Dashboard',
  //     path: '/insights/department_dashboard',
  //   },
  //   {
  //     label: 'Custom Dashboard',
  //     path: '/insights/custom_dashboard',
  //   },
  // ];

  const insightsMenu: IMenuItem[] = [
    { label: 'Analytics', path: '/insights/analytics' },
    {
      label: 'Dashboard',
      path: '', // no direct path, it opens dropdown
      icon: <HiOutlineChevronDown />,
      menuItems: [
        {
          label: 'Department',
          path: '/insights/department_dashboard',
          isActive: false,
        },
        {
          label: 'Standard',
          path: '/insights/standard_dashboard',
          isActive: false,
        },
      ],
    },
    { label: 'Custom Dashboard', path: '/insights/custom_dashboard/view' },
  ];

  const disclosureMenu: IMenuItem[] = [
    {
      label: 'General',
      path: '/disclosure/general',
    },
    {
      label: 'Management',
      path: '/disclosure/management',
    },
    {
      label: 'Miscellaneous',
      path: '/disclosure/miscellaneous',
    },
    {
      label: 'Stakeholder Identification',
      path: '/disclosure/stakeholder_identification',
    },
    {
      label: 'Impact Assessment',
      path: '/disclosure/impact_assessment',
    },
  ];

  const profileMenu: IProfileItem[] = [
    {
      label: 'Settings',
      path: '/settings/profile',
      icon: <AiOutlineSetting size={20} />,
    },
    {
      label: 'Logout',
      path: '/sign_in',
      icon: <MdOutlineLogout size={20} />,
    },
  ];
  const hasAccess = (feature: string) => context?.currentRole?.HEADER?.includes(feature);

  const filteredItems = rootMenu.filter((item) => hasAccess(item.label?.toLocaleUpperCase()?.replaceAll(' ', '_')));
  if (
    context?.currentUser?.role === 'SUSTAINABILITY_MANAGER'
    // context?.currentUser?.role === 'OWNER'
    || context?.currentUser?.role === 'ADMIN'
  ) {
    // filteredItems.unshift(rootMenu[0]);
    // filteredItems.push(rootMenu[4]);
    // filteredItems.push(rootMenu[5]);
    // filteredItems.push(rootMenu[6]);
    // filteredItems.push(rootMenu[7]);
    // filteredItems.push(rootMenu[8]);
  }

  return (
    <div>
      <Header
        user={context?.currentUser}
        menuItems={filteredItems}
        profileMenu={profileMenu}
        insightsMenu={insightsMenu}
        disclosureMenu={disclosureMenu}
        pathname={pathname}
      />
      <div
        className="pb-5 px-3 px-md-5"
        style={{
          background: 'var(--bgColor)',
          minHeight: 'calc(100vh - 10.2vh)',
          maxHeight: 'calc(100% - 10.2%)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
