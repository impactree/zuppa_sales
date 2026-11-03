'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Nav } from 'react-bootstrap';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { NavBarMenuItemsProps } from '../types';
import './SettingsNavBar.css';

export function SettingsNavBar({
  url,
  text,
  subText,
  subMenu,
  isRadius,
  icon,
  settingIcon,
}: NavBarMenuItemsProps) {
  let className = '';
  const pathname = usePathname();
  if (isRadius) {
    className = `is_radius ${pathname === `/settings/${url}` ? 'active' : ''}  mb-2`;
  } else {
    className = `header-css ${subMenu === text ? 'active' : ''}`;
  }
  return (
    <Link href={`/settings/${url}`} passHref legacyBehavior>
      <Nav.Link className={` mb-3 ${className}`} id={text}>
        {icon && <span className="nav-icon">{icon}</span>}
        <div className="d-flex justify-content-between align-items-center w-100 settings-select-container">
          <div className="d-flex align-items-center gap-3">
            {settingIcon}
            <div>
              <div className="settings-card-title fs-14 fw-600">{text}</div>
              <div className=" settings-card-subtitle fs-12">{subText}</div>
            </div>
          </div>
          <div>
            <MdOutlineKeyboardArrowRight size={24} color="var(--textprimary)" />
          </div>
        </div>
      </Nav.Link>
    </Link>
  );
}
