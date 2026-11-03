import Link from 'next/link';
import React from 'react';
import { MdOutlineChevronRight } from 'react-icons/md';
import { BreadCrumbProps, IBreadCrumbProps } from '../types';
import './BreadCrumb.css';

export function BreadCrumb({ breadCrumb }: IBreadCrumbProps) {
  return (
    <div className="breadcrumb-link-container d-flex gap-2 align-items-center flex-wrap">
      {breadCrumb?.map((item: BreadCrumbProps) => (
        <React.Fragment key={item?.title}>
          {item?.isTitle && (
            <h4 className="fw-semibold Bread_crumb_title cursor-pointer mb-1">
              {item.title}
            </h4>
          )}
          {item?.isSubTitle && (
            <h6 className="fw-semibold Bread_crumb_title mb-0 cursor-pointer">
              {item.title}
            </h6>
          )}
          {item?.breadCrumb?.length
            && item?.breadCrumb?.map((data: BreadCrumbProps, index) => {
              const isLast = index === (item.breadCrumb?.length ?? 0) - 1;
              return (
                data.url && (
                  <div className=" d-flex gap-2 align-items-center flex-wrap">
                    {data?.onClick ? (
                      <Link
                        key={data?.title}
                        href={data.url}
                        className={`link_title pb-1 text-decoration-none ${
                          isLast ? 'active-breadcrumb' : ''
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          data?.onClick?.(
                            e as unknown as React.MouseEvent<
                              HTMLButtonElement,
                              MouseEvent
                            >,
                          );
                        }}
                      >
                        {data?.title}
                      </Link>
                    ) : (
                      <Link
                        key={data?.title}
                        href={data.url}
                        className={`link_title pb-1 text-decoration-none ${
                          isLast ? 'active-breadcrumb' : ''
                        }`}
                      >
                        {data.title}
                      </Link>
                    )}
                    {!isLast && (
                      <span>
                        <MdOutlineChevronRight size={22} />
                      </span>
                    )}
                  </div>
                )
              );
              // : (
              //   <div className="link_title" key={item?.title}>
              //     {data.title}
              //     <span className="ps-1 pe-1">/</span>
              //   </div>
              // );
            })}
        </React.Fragment>
      ))}
    </div>
  );
}
