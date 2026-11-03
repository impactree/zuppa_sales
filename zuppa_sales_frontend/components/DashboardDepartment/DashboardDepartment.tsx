'use client';

import React, { Suspense, useState } from 'react';
import Select from 'react-select';
import {
  MdChevronRight,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import { Option } from '../types';
import './DashboardDepartment.css';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import { Button } from '../Button/Button';
import PageNotFound from '../PageNotFound/PageNotFound';

const HR = React.lazy(() => import('./Dashboard/HR'));
const BoardandPolicyManagement = React.lazy(
  () => import('./Dashboard/BoardandPolicyManagement'),
);
const LearningandDevelopment = React.lazy(
  () => import('./Dashboard/LearningandDevelopment'),
);
const HealthandSafety = React.lazy(() => import('./Dashboard/HealthandSafety'));
const Procurement = React.lazy(() => import('./Dashboard/Procurement'));
const FinancialPerformance = React.lazy(
  () => import('./Dashboard/FinancialPerformance'),
);
const Grievances = React.lazy(() => import('./Dashboard/Grievances'));
const Legal = React.lazy(() => import('./Dashboard/Legal'));
const Operations = React.lazy(() => import('./Dashboard/Operations'));

const departmentComponents: Record<string, React.ComponentType> = {
  HR,
  Grievances,
  Procurement,
  'Learning & Development': LearningandDevelopment,
  Legal,
  'Board & Policy Management': BoardandPolicyManagement,
  'Health & Safety': HealthandSafety,
  'Financial Performance': FinancialPerformance,
  Operations,
};

export default function DashboardDepartment() {
  const [chooseFinalYr, setChooseFinalYr] = useState('');
  const [selectDashoard, setselectDashoard] = useState<string | null>('HR');
  const SelectedComponent = selectDashoard
    ? departmentComponents[selectDashoard]
    : null;
  // const breadCrumbMenu = useMemo<BreadCrumbProps[]>(
  //   () => [
  //     {
  //       title: 'Analytics',
  //       breadCrumb: [
  //         {
  //           title: 'Analytics',
  //           url: '/analytics',
  //         },
  //       ],
  //     },
  //   ],
  //   [],
  // );

  const departmentList = [
    {
      departmentName: 'HR',
    },
    {
      departmentName: 'Grievances',
    },
    {
      departmentName: 'Procurement',
    },
    {
      departmentName: 'Learning & Development',
    },
    {
      departmentName: 'Legal',
    },
    {
      departmentName: 'Board & Policy Management',
    },
    {
      departmentName: 'Health & Safety',
    },
    {
      departmentName: 'Financial Performance',
    },
    {
      departmentName: 'Operations',
    },
  ];

  const getFinancialYears = (years: number) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const finalYear = currentMonth >= 3 ? currentYear : currentYear - 1;
    return Array.from({ length: years }, (_, i) => {
      const startYear = finalYear - i;
      const endYear = startYear + 1;
      const label = `${startYear}_${endYear}`;
      return { label, value: label };
    });
  };

  const getValues = () => getFinancialYears(10)
    .filter((opt): opt is Option => !('options' in opt))
    .find((item) => chooseFinalYr?.includes(item?.value));
  return (
    <PageHeaderWrapper
      //   breadCrumbMenu={breadCrumbMenu}
      extraClassName="px-3"
      iswhite
      title="Department Dashboard"
      stackComponent={(
        <div className="d-flex align-items-center gap-3">
          <div className="">
            {/* <label className="form_label mb-3">Choose Financial Year *</label> */}
            <Select
              id="sector"
              value={getValues()}
              onChange={(e) => setChooseFinalYr(e?.value as string)}
              placeholder="Financial year"
              options={[
                {
                  label: '2023-2024',
                  value: '2023-2024',
                },
                {
                  label: '2024-2025',
                  value: '2024-2025',
                },
                {
                  label: '2025-2026',
                  value: '2025-2026',
                },
              ]}
              isMulti={false}
              //   isDisabled={isDisabled}
              styles={CustomStyles}
              classNamePrefix="custom_select_input"
              data-testid="customSelect"
              inputId="sector"
            />
            {/* {error?.final_year && (
                    <div className="error-message">{error?.final_year}</div>
                  )} */}
          </div>
          <div className="">
            {/* <label className="form_label mb-3">Choose Financial Year *</label> */}
            <Select
              id="sector"
              value={getValues()}
              onChange={(e) => setChooseFinalYr(e?.value as string)}
              placeholder="Time frame"
              options={[
                {
                  label: 'Monthly',
                  value: 'Monthly',
                },
                {
                  label: 'Quarterly',
                  value: 'Quarterly',
                },
                // {
                //   label: 'Tata JLR',
                //   value: 'Tata JLR',
                // },
              ]}
              isMulti={false}
              //   isDisabled={isDisabled}
              styles={CustomStyles}
              classNamePrefix="custom_select_input"
              data-testid="customSelect"
              inputId="sector"
            />
            {/* {error?.final_year && (
                    <div className="error-message">{error?.final_year}</div>
                  )} */}
          </div>
          <div className="">
            {/* <label className="form_label mb-3">Choose Financial Year *</label> */}
            <Select
              id="sector"
              value={getValues()}
              onChange={(e) => setChooseFinalYr(e?.value as string)}
              placeholder="Business unit"
              options={[
                {
                  label: 'Tata Passenger Vehicles',
                  value: 'Tata Passenger Vehicles',
                },
                {
                  label: 'Tata Commercial Vehicles',
                  value: 'Tata Commercial Vehicles',
                },
                {
                  label: 'Tata JLR',
                  value: 'Tata JLR',
                },
              ]}
              isMulti={false}
              //   isDisabled={isDisabled}
              styles={CustomStyles}
              classNamePrefix="custom_select_input"
              data-testid="customSelect"
              inputId="sector"
            />
            {/* {error?.final_year && (
                    <div className="error-message">{error?.final_year}</div>
                  )} */}
          </div>
          <div className="">
            {/* <label className="form_label mb-3">Choose Financial Year *</label> */}
            <Select
              id="sector"
              value={getValues()}
              onChange={(e) => setChooseFinalYr(e?.value as string)}
              placeholder="Site/Location"
              options={[
                {
                  label: 'Chennai',
                  value: 'Chennai',
                },
                {
                  label: 'Bengaluru',
                  value: 'Bengaluru',
                },
                {
                  label: 'Mumbai',
                  value: 'Mumbai',
                },
              ]}
              isMulti={false}
              //   isDisabled={isDisabled}
              styles={CustomStyles}
              classNamePrefix="custom_select_input"
              data-testid="customSelect"
              inputId="sector"
            />
            {/* {error?.final_year && (
                    <div className="error-message">{error?.final_year}</div>
                  )} */}
          </div>
          <div>
            <Button
              text="Filter"
              type="submit"
              isSolid
              className="w-100 mt-0 mb-0"
              sufixIconChildren={(
                <MdChevronRight
                  size={22}
                  color="var(--icon-color)"
                  className="ms-3"
                />
              )}
            />
          </div>
        </div>
      )}
    >
      <div className="row">
        <div className="col-12 col-md-3">
          <div
            className="analytics_module_container py-4"
            // style={{ minHeight: '75vh', maxHeight: '100%' }}
          >
            <div className="px-3">
              <h6>Department</h6>
              {departmentList?.map((department) => (
                <div
                  key={department?.departmentName}
                  className={`d-flex justify-content-between gap-2 mt-3 is_radius ${
                    selectDashoard === department?.departmentName
                      ? 'active'
                      : ''
                  }`}
                >
                  <div
                    className="p-2 py-3 d-flex flex-column gap-2 flex-grow-1"
                    aria-hidden
                    onClick={() => setselectDashoard(department?.departmentName)}
                    // onClick={() => {
                    //   getTask();
                    //   router.push(`?indicator=${indicator?.name}`);
                    // }}
                  >
                    <h6 className="fs-14 fw-600 mb-0 letter-spacing text-capitalize">
                      {department?.departmentName}
                    </h6>
                  </div>
                  <div>
                    <MdOutlineKeyboardDoubleArrowRight
                      size={24}
                      className="me-4"
                      color="#757575"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-12 col-md-9">
          <Suspense fallback={<div>Loading...</div>}>
            {SelectedComponent ? (
              <>
                <h4 className="fs-18 fw-700 mb-3">{selectDashoard}</h4>
                <SelectedComponent />
              </>
            ) : (
              <div className="bg-white">
                <PageNotFound />
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </PageHeaderWrapper>
  );
}
