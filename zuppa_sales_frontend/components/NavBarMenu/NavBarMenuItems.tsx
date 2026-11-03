'use client';

import { Nav } from 'react-bootstrap';
import { NavBarMenuItemsProps } from '../types';
import './NavBarMenu.css';

export function NavBarMenuItems({
  url,
  text,
  subMenu,
  isRadius,
  menu,
  icon,
}: NavBarMenuItemsProps) {
  let className = '';

  if (isRadius) {
    className = `is_radius ${menu === text ? 'active' : ''}`;
  } else {
    className = `header-css ${subMenu === text ? 'active' : ''}`;
  }

  return (
    <Nav.Link
      href={url}
      className={className}
      id={text}
    >
      {icon && <span className="nav-icon">{icon}</span>}
      &nbsp;
      {text}
    </Nav.Link>
  );
}
