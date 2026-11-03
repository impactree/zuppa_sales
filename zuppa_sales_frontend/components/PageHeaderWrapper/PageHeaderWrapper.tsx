'use client';

import React, { ReactElement } from 'react';
import { BreadCrumb } from '../BreadCrumb/BreadCrumb';
import { BreadCrumbProps } from '../types';
import './PageHeaderWrapper.css';

export interface BreadCrumbsItem {
  title: string;
  url: string | undefined;
  tag?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
type PageWrapperProps = React.PropsWithChildren<{
  stackComponent?: ReactElement;
  iswhite?: boolean;
  isDataEntry?: boolean;
  extraClassName?: string;
  breadCrumbMenu?: BreadCrumbProps[];
  title?: string | ReactElement;
}>;

export default function PageHeaderWrapper({
  children,
  stackComponent,
  breadCrumbMenu,
  title,
  iswhite,
  extraClassName,
  isDataEntry,
}: PageWrapperProps) {
  return (
    <div>
      <div
        className={`pb-3 mb-3 ${iswhite ? 'page-header-white' : 'page-header-container'} ${extraClassName}`}
      >
        <div className="bread-crumb-wrapper">
          {breadCrumbMenu && breadCrumbMenu.length > 0 ? (
            <BreadCrumb breadCrumb={breadCrumbMenu} />
          ) : (
            <div className="empty-breadcrumb" />
          )}
        </div>
        {/* {breadCrumbMenu && (
          <BreadCrumb breadCrumb={breadCrumbMenu} />
        )} */}
        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
          {title && (
            <div className="d-flex  align-items-center flex-wrap">
              <h5
                className={`mb-0 fw-semibold ${isDataEntry ? 'fs-14' : ''}`}
                style={{
                  fontSize: '22px',
                  letterSpacing: '1.2px',
                }}
              >
                {title}
              </h5>
            </div>
          )}
          <div className="d-flex flex-row-reverse flex-grow-1 ">
            {stackComponent}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column">{children}</div>
    </div>
  );
}
