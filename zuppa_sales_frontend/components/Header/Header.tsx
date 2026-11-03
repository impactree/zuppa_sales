/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable react/destructuring-assignment */

'use client';

import rubicrDashboardLogo from '@/assests/rubic-logo-white 2.png';
import { IUser } from '@/lib/interface/IUser.interface';
import { signOut, useSession } from 'next-auth/react';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, {
  ReactNode, useEffect, useRef, useState,
} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import toast from 'react-hot-toast';
import { FaRegBell } from 'react-icons/fa';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { TiWarning } from 'react-icons/ti';
import Avatar from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { useUser } from '../Context/userProvider';
import { useModal } from '../Modal/Context';

// export interface IMenuItem {
//   label: string;
//   path: string;
//   icon?: ReactNode;
//   isActive?: boolean;
//   featureName?: string;
//   menuItems?: { label: string; path: string; isActive: boolean }[];
// }

export interface IMenuItem {
  label: string;
  path: string;
  icon?: ReactNode;
  isActive?: boolean;
  featureName?: string;
  menuItems?: IMenuItem[]; // recursive type
}

export interface IProfileItem {
  label: string;
  path: string;
  icon: ReactNode;
  isActive?: boolean;
  menuItems?: { label: string; path: string; isActive: boolean }[];
}

export interface HeaderProps {
  user: IUser | undefined;
  menuItems: IMenuItem[];
  profileMenu: IProfileItem[];
  insightsMenu?: IMenuItem[];
  disclosureMenu?: IMenuItem[];
  pathname: string; // ✅ ADD THIS
}

const getCurrentUrlActive = (item: IMenuItem, pathname: string): string => {
  switch (item.label) {
    case 'Home':
      return pathname?.startsWith('/home') ? 'active' : '';
    case 'Data Cubes':
      return pathname?.startsWith('/data_cubes') ? 'active' : '';
    case 'Tasks':
      return pathname?.startsWith('/tasks') ? 'active' : '';
    case 'Users':
      return pathname?.startsWith('/users') ? 'active' : '';
    case 'Reports':
      return pathname?.startsWith('/report') ? 'active' : '';
    case 'Insights':
      return pathname?.startsWith('/insights/analytics')
        || pathname?.startsWith('/insights/department_dashboard')
        || pathname?.startsWith('/insights/standard_dashboard')
        || pathname?.startsWith('/insights/custom_dashboard')
        ? 'active'
        : '';
    case 'Disclosure':
      return pathname?.startsWith('/disclosure/general')
        || pathname?.startsWith('/disclosure/management')
        || pathname?.startsWith('/disclosure/miscellaneous')
        ? 'active'
        : '';
    // case 'Analytics':
    //   return pathname?.startsWith('/analytics') ? 'active' : '';
    // case 'Dept Dashboard':
    //   return pathname?.startsWith('/department_dashboard') ? 'active' : '';
    default:
      return '';
  }
};

const getCurrentProfileUrlActive = (
  item: IMenuItem,
  pathname: string,
): string => {
  switch (item.label) {
    case 'Settings':
      return pathname === '/settings/profile'
        || pathname === '/settings/change_password'
        || pathname === '/settings/company_profile'
        || pathname === '/settings/business_unit'
        ? 'active'
        : '';
    case 'Users':
      return pathname === '/users' || pathname === '/users/invite'
        ? 'active'
        : '';
    default:
      return '';
  }
};

// function InsightNavbarItem({
//   item,
//   router,
//   pathname,
// }: {
//   item: IMenuItem;
//   router: AppRouterInstance;
//   pathname: string;
// }) {
//   return (
//     <div>
//       <li
//         aria-hidden
//         className={`sub_item d-flex justify-content-between align-items-center ${getCurrentProfileUrlActive(item, pathname)}`}
//         onClick={() => router.push(item?.path)}
//       >
//         <p className="fs-14 fw-500 mb-0" style={{ letterSpacing: '1.1px' }}>
//           {item.label}
//         </p>
//         {item.icon}
//       </li>
//     </div>
//   );
// }

// function InsightsMenu({
//   insightsMenu,
//   router,
//   pathname,
// }: {
//   insightsMenu: IMenuItem[];
//   router: AppRouterInstance;
//   pathname: string;
// }) {
//   return (
//     <ul className="user-dropdown-submenusection p-2 pb-3">
//       {insightsMenu.map((item: IMenuItem) => (
//         <InsightNavbarItem
//           item={item}
//           key={item.label}
//           router={router}
//           pathname={item.path || pathname}
//         />
//       ))}
//     </ul>
//   );
// }

function InsightNavbarItem({
  item,
  router,
  pathname,
  setShowInsightsMenu,
}: {
  item: IMenuItem;
  router: AppRouterInstance;
  pathname: string;
  setShowInsightsMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleParentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.menuItems?.length) {
      setShowSubMenu((prev) => !prev);
    } else if (item.path) {
      router.push(item.path);
      setShowInsightsMenu(false);
    }
  };

  const handleSubItemClick = (e: React.MouseEvent, path: string) => {
    e.stopPropagation();
    router.push(path);
    setShowInsightsMenu(false);
  };

  return (
    <div>
      <li
        aria-hidden
        className={`sub_item d-flex justify-content-between align-items-center ${getCurrentUrlActive(item, pathname)}`}
        onClick={handleParentClick}
        style={{ cursor: 'pointer' }}
      >
        <p className="fs-14 fw-500 mb-0" style={{ letterSpacing: '1.1px' }}>
          {item.label}
        </p>
        {item.icon}
      </li>

      {/* Nested submenu */}
      {item.menuItems && showSubMenu && (
        <div>
          {item.menuItems.map((subItem) => (
            <li
              key={subItem.label}
              aria-hidden
              className={`sub_item d-flex justify-content-between align-items-center px-5 ${getCurrentProfileUrlActive(subItem, pathname)}`}
              onClick={(e) => handleSubItemClick(e, subItem.path)}
              style={{ cursor: 'pointer' }}
            >
              <p
                className="fs-14 fw-500 mb-0"
                style={{ letterSpacing: '1.1px' }}
              >
                {subItem.label}
              </p>
              {subItem.icon}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

function InsightsMenu({
  insightsMenu,
  router,
  pathname,
  setShowInsightsMenu,
}: {
  insightsMenu: IMenuItem[];
  router: AppRouterInstance;
  pathname: string;
  setShowInsightsMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <ul className="user-dropdown-submenusection p-2 pb-3">
      {insightsMenu.map((item) => (
        <InsightNavbarItem
          item={item}
          key={item.label}
          router={router}
          pathname={pathname}
          setShowInsightsMenu={setShowInsightsMenu}
        />
      ))}
    </ul>
  );
}

function DisclosureNavbarItem({
  item,
  router,
  pathname,
}: {
  item: IMenuItem;
  router: AppRouterInstance;
  pathname: string;
}) {
  return (
    <div>
      <li
        aria-hidden
        className={`sub_item d-flex justify-content-between align-items-center ${getCurrentProfileUrlActive(item, pathname)}`}
        onClick={() => router.push(item?.path)}
      >
        <p className="fs-14 fw-500 mb-0" style={{ letterSpacing: '1.1px' }}>
          {item.label}
        </p>
        {item.icon}
      </li>
    </div>
  );
}

function DisclosureMenu({
  disclosureMenu,
  router,
  pathname,
}: {
  disclosureMenu: IMenuItem[];
  router: AppRouterInstance;
  pathname: string;
}) {
  return (
    <ul className="user-dropdown-submenusection p-2 pb-3">
      {disclosureMenu.map((item: IMenuItem) => (
        <DisclosureNavbarItem
          item={item}
          key={item.label}
          router={router}
          pathname={item.path || pathname}
        />
      ))}
    </ul>
  );
}

function NavbarItem({
  item,
  pathname,
  insightsMenu,
  disclosureMenu,
  showInsightsMenu,
  setShowInsightsMenu,
  showDisclosureMenu,
  setShowDisclosureMenu,
}: {
  item: IMenuItem;
  pathname: string;
  insightsMenu?: IMenuItem[];
  disclosureMenu?: IMenuItem[];
  showInsightsMenu: boolean;
  setShowInsightsMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showDisclosureMenu: boolean;
  setShowDisclosureMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const handleNavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!item.path) return;

    // prevent navigation for dropdown parents
    if (item.label === 'Insights' || item.label === 'Disclosure') return;

    router.push(item.path);
    setShowInsightsMenu(false);
    setShowDisclosureMenu(false);
  };

  return (
    <Nav.Link as="span">
      <span
        className={`menu_item_routes ${getCurrentUrlActive(item, pathname)}`}
        style={{ cursor: 'pointer' }}
        onClick={handleNavigate}
      >
        {item.label === 'Insights' && insightsMenu ? (
          <div className="d-flex align-items-center position-relative">
            {/* Label */}
            <span className="me-2">{item.label}</span>

            {/* Chevron */}
            <HiOutlineChevronDown
              size={20}
              color="var(--white)"
              className={`cursor-pointer ${
                insightsMenu.some((menu) => (menu.path
                  ? pathname.startsWith(menu.path)
                  : menu.menuItems?.some((sub) => pathname.startsWith(sub.path))))
                  ? 'active'
                  : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowInsightsMenu((prev) => !prev);
                setShowDisclosureMenu(false);
              }}
            />

            {showInsightsMenu && (
              <div className="show-insights-menu">
                <InsightsMenu
                  insightsMenu={insightsMenu}
                  router={router}
                  pathname={pathname}
                  setShowInsightsMenu={setShowInsightsMenu}
                />
              </div>
            )}
          </div>
        ) : item.label === 'Disclosure' && disclosureMenu ? (
          <div className="d-flex align-items-center position-relative">
            <span className="me-2">{item.label}</span>

            <HiOutlineChevronDown
              size={20}
              color="var(--white)"
              className={`cursor-pointer ${
                disclosureMenu.some((menu) => pathname.startsWith(menu.path))
                  ? 'active'
                  : ''
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDisclosureMenu((prev) => !prev);
                setShowInsightsMenu(false);
              }}
            />

            {showDisclosureMenu && (
              <div className="show-insights-menu">
                <DisclosureMenu
                  disclosureMenu={disclosureMenu}
                  router={router}
                  pathname={pathname}
                />
              </div>
            )}
          </div>
        ) : (
          <span>{item.label}</span>
        )}
      </span>
    </Nav.Link>
  );
}

function ProfileNavbarItem({
  item,
  router,
  pathname,
}: {
  item: IMenuItem;
  router: AppRouterInstance;
  pathname: string;
}) {
  const hideModal = useModal({});
  const logoutModal = useModal({
    content: (
      <div className="text-center">
        <div className="d-flex align-items-center justify-content-center">
          <TiWarning color="var(--danger)" size={40} className="me-2" />
          <h5 className="fw-bold text-dark mb-0">
            Are you sure you want to logout?
          </h5>
        </div>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button text="Cancel" onClick={hideModal} />
          <Button
            text="Confirm"
            // isDisabled={actionType === 'Block' && !reason}
            onClick={() => {
              router.push(item?.path);
              signOut({ redirect: false });
              hideModal();
            }}
            isSolid
          />
        </div>
      </div>
    ),
  });
  return (
    <div>
      <li
        aria-hidden
        className={`sub_item d-flex justify-content-between align-items-center ${getCurrentProfileUrlActive(item, pathname)}`}
        onClick={() => {
          if (item.label === 'Logout') {
            logoutModal();
            // signOut({ redirect: false });
          } else {
            router.push(item?.path);
          }
        }}
      >
        <p className="fs-14 fw-500 mb-0" style={{ letterSpacing: '1.1px' }}>
          {item.label}
        </p>
        {item.icon}
      </li>
    </div>
  );
}

function Profile({
  profileMenu,
  router,
  pathname,
}: {
  profileMenu: IProfileItem[];
  router: AppRouterInstance;
  pathname: string;
}) {
  return (
    <ul className="user-dropdown-submenusection p-2 pb-3">
      {profileMenu.map((item: IMenuItem) => (
        <ProfileNavbarItem
          item={item}
          key={item.label}
          router={router}
          pathname={pathname}
        />
      ))}
    </ul>
  );
}

function Header(props: HeaderProps) {
  const [isProfileActive, setProfileActive] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showInsightsMenu, setShowInsightsMenu] = useState(false);
  const [showDisclosureMenu, setShowDisclosureMenu] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const timeoutId = useRef<any>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const INACTIVITYTIMEOUT = 30 * 60 * 1000;
  const context = useUser();

  const notifySignout = () => toast.success('Signed Out', { duration: 3000 });

  const handleLogout = () => {
    // ✅ clear persisted user data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');

    notifySignout();
    signOut({ redirect: false });
    router.push('/sign_in');
  };

  useEffect(() => {
    const handleLogoutOnTimeout = () => handleLogout();
    const handleUserActivity = () => {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(handleLogoutOnTimeout, INACTIVITYTIMEOUT);
    };
    if (session) {
      timeoutId.current = setTimeout(handleLogoutOnTimeout, INACTIVITYTIMEOUT);
      document.addEventListener('click', handleUserActivity);
      document.addEventListener('mousemove', handleUserActivity);
      document.addEventListener('keydown', handleUserActivity);
    }
    return () => {
      clearTimeout(timeoutId.current);
      document.removeEventListener('click', handleUserActivity);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div className="sticky-top container-fluid p-0">
      <Navbar expand="lg" className="header_bg p-3">
        <Navbar.Brand
          href={
            context?.currentRole?.HEADER
              ? `/${context?.currentRole.HEADER[0]?.toLowerCase() || 'access_denied'}`
              : '/home'
          }
          className="p-0"
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center fw-semibold">
              <Image src={rubicrDashboardLogo} alt="logo" />
            </div>
          </div>
        </Navbar.Brand>
        <div className="d-lg-none d-md-block hamburger">
          <input type="checkbox" id="active" style={{ display: 'none' }} />
          <label
            aria-hidden
            htmlFor="active"
            className="menu-btn"
            onClick={() => setIsActive(true)}
          >
            <span />
          </label>
          {isActive && (
            <label
              aria-hidden
              htmlFor="active"
              className="close"
              onClick={() => setIsActive(false)}
            />
          )}
          {isActive && (
            <div className="wrapper">
              <div
                className="d-flex justify-content-center"
                style={{ height: '80px', background: 'var(--bgHeader)' }}
              >
                <div className="d-flex align-items-center">
                  <h5
                    aria-hidden
                    className={`mx-3 fw-semibold menu_item_routes cursor-pointer ${isProfileActive ? 'active' : ''}`}
                    onClick={() => setProfileActive(true)}
                  >
                    Home
                  </h5>
                  <h5
                    aria-hidden
                    className={`mx-3 fw-semibold menu_item_routes cursor-pointer ${!isProfileActive ? 'active' : ''}`}
                    onClick={() => setProfileActive(false)}
                  >
                    Profile
                  </h5>
                </div>
              </div>
              {isProfileActive ? (
                <ul
                  style={{
                    backgroundColor: 'var(--bgHeader)',
                    borderTop: '1px solid var(--bgColor)',
                    padding: '20px',
                    margin: '0px',
                  }}
                  data-testid="profile"
                >
                  {props?.menuItems?.map((item: IMenuItem) => (
                    <li key={item.label} className="mb-3 list-unstyled">
                      <NavbarItem
                        item={item}
                        pathname={props.pathname}
                        showInsightsMenu={showInsightsMenu}
                        setShowInsightsMenu={setShowInsightsMenu}
                        showDisclosureMenu={showDisclosureMenu}
                        setShowDisclosureMenu={setShowDisclosureMenu}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <Profile
                  profileMenu={props?.profileMenu}
                  router={router}
                  pathname={props.pathname}
                />
              )}
            </div>
          )}
        </div>
        <Navbar.Collapse role="button" id="navbarScroll">
          <div className={`custom-nav-container ${isActive ? 'open' : ''}`}>
            <div className="d-flex justify-content-between align-items-center flex-grow-1">
              <Nav className="flex-grow-1 d-flex justify-content-center gap-5">
                {props?.menuItems.map((item: IMenuItem) => (
                  <NavbarItem
                    item={item}
                    key={item?.label}
                    pathname={props.pathname}
                    insightsMenu={props?.insightsMenu}
                    disclosureMenu={props?.disclosureMenu}
                    showInsightsMenu={showInsightsMenu}
                    setShowInsightsMenu={setShowInsightsMenu}
                    showDisclosureMenu={showDisclosureMenu}
                    setShowDisclosureMenu={setShowDisclosureMenu}
                  />
                ))}
              </Nav>
              <div className="d-flex align-items-center gap-3">
                <div>
                  <FaRegBell size={22} color="var(--white)" />
                </div>
                <div
                  className=" position-relative"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div
                    className="d-flex align-items-center gap-3"
                    title={props?.user?.name}
                  >
                    <Avatar
                      name={
                        props?.user?.name?.charAt(0)?.toLocaleUpperCase() || ''
                      }
                      size="40px"
                      className="rounded-circle"
                      avator={props?.user?.avatar_url || ''}
                    />
                    <div>
                      <HiOutlineChevronDown size={22} color="var(--white)" />
                    </div>
                  </div>

                  {showProfileMenu && (
                    <div className="show-profile-menu">
                      <Profile
                        profileMenu={props?.profileMenu}
                        router={router}
                        pathname={props.pathname}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default React.memo(Header);
