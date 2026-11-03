'use client';

import React, { Suspense, useState } from 'react';
import Select from 'react-select';
import {
  MdChevronRight,
  MdOutlineKeyboardDoubleArrowRight,
} from 'react-icons/md';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import { Option } from '../types';
import './AnalyticsModule.css';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import { Button } from '../Button/Button';
import PageNotFound from '../PageNotFound/PageNotFound';

const EmployeeMetrics = React.lazy(() => import('./Modules/EmployeeMetrics'));
const LegalComplaints = React.lazy(() => import('./Modules/LegalComplaints'));
const FuelAndRefrigerantUse = React.lazy(
  () => import('./Modules/FuelAndRefrigerantUse'),
);
const PurchasedPower = React.lazy(() => import('./Modules/PurchasedPower'));
const TransportandDistributionEmissions = React.lazy(
  () => import('./Modules/TransportandDistributionEmissions'),
);
const ProductBasedEmissions = React.lazy(
  () => import('./Modules/ProductBasedEmissions'),
);
const OtherEmissionsandManagement = React.lazy(
  () => import('./Modules/OtherEmissionsandManagement'),
);
const CustomerExperience = React.lazy(
  () => import('./Modules/CustomerExperience'),
);
const ITComplaints = React.lazy(() => import('./Modules/ITComplaints'));
const BioDiversity = React.lazy(() => import('./Modules/BioDiversity'));
const HealthandSafety = React.lazy(() => import('./Modules/HealthandSafety'));
const CSRandCommunityRelations = React.lazy(
  () => import('./Modules/CSRandCommunityRelations'),
);
const ValueChainPartners = React.lazy(
  () => import('./Modules/ValueChainPartners'),
);
const BoardandExecutiveManagement = React.lazy(
  () => import('./Modules/BoardandExecutiveManagement'),
);

const ImpactAssessment = React.lazy(() => import('./Modules/ImpactAssessment'));
const StakeholderIdentification = React.lazy(
  () => import('./Modules/StakeholderIdentification'),
);
const UnionAssociationMembership = React.lazy(
  () => import('./Modules/UnionAssociationMembership'),
);
const ProductManagement = React.lazy(
  () => import('./Modules/ProductManagement'),
);
const TaxProcedures = React.lazy(() => import('./Modules/TaxProcedures'));
const EmployeeGrievanceRedressal = React.lazy(
  () => import('./Modules/EmployeeGrievanceRedressal'),
);
const InputSourcing = React.lazy(() => import('./Modules/InputSourcing'));
const TrainingPrograms = React.lazy(() => import('./Modules/TrainingPrograms'));
const Waste = React.lazy(() => import('./Modules/Waste'));
const Water = React.lazy(() => import('./Modules/Water'));
const Finance = React.lazy(() => import('./Modules/Finance'));

const moduleComponents: Record<string, React.ComponentType> = {
  'Legal Complaints': LegalComplaints,
  'Employee Metrics': EmployeeMetrics,
  'Fuel and Refrigerant Use': FuelAndRefrigerantUse,
  'Purchased Power': PurchasedPower,
  'Transport and Distribution Emissions': TransportandDistributionEmissions,
  'Product Based Emissions': ProductBasedEmissions,
  'Other Emissions and Management': OtherEmissionsandManagement,
  'Customer Experience': CustomerExperience,
  'IT Complaints': ITComplaints,
  'Impact Assessment': ImpactAssessment,
  'Stakeholder Identification': StakeholderIdentification,
  'Union & Association Membership': UnionAssociationMembership,
  'Product Management': ProductManagement,
  'Tax Procedures': TaxProcedures,
  'Employee Grievance Redressal': EmployeeGrievanceRedressal,
  'Input Sourcing': InputSourcing,
  'Training Programs': TrainingPrograms,
  Waste,
  Water,
  Biodiversity: BioDiversity,
  'Health & Safety': HealthandSafety,
  'CSR & Community Relations': CSRandCommunityRelations,
  'Value Chain Partners': ValueChainPartners,
  'Board & Executive Management': BoardandExecutiveManagement,
  Finance,
};

export default function AnalyticsModule() {
  const [chooseFinalYr, setChooseFinalYr] = useState('');
  const [selectedModule, setSelectedModule] = useState<string | null>(
    'Biodiversity',
  );
  const SelectedComponent = selectedModule
    ? moduleComponents[selectedModule]
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

  const moduleList = [
    {
      moduleName: 'Biodiversity',
    },
    {
      moduleName: 'Employee Metrics',
    },
    {
      moduleName: 'IT Complaints',
    },
    {
      moduleName: 'Customer Experience',
    },
    {
      moduleName: 'Employee Grievance Redressal',
    },
    {
      moduleName: 'Legal Complaints',
    },
    {
      moduleName: 'Miscellaneous',
    },
    {
      moduleName: 'CSR & Community Relations',
    },
    {
      moduleName: 'Union & Association Membership',
    },
    {
      moduleName: 'Value Chain Partners',
    },
    {
      moduleName: 'Finance',
    },
    {
      moduleName: 'Tax Procedures',
    },
    {
      moduleName: 'Input Sourcing',
    },
    {
      moduleName: 'Impact Assessment',
    },
    {
      moduleName: 'Stakeholder Identification',
    },
    {
      moduleName: 'Training Programs',
    },
    {
      moduleName: 'Product Management',
    },
    {
      moduleName: 'Board & Executive Management',
    },
    {
      moduleName: 'Health & Safety',
    },
    {
      moduleName: 'Fuel and Refrigerant Use',
    },
    {
      moduleName: 'Purchased Power',
    },
    {
      moduleName: 'Transport and Distribution Emissions',
    },
    {
      moduleName: 'Product Based Emissions',
    },
    {
      moduleName: 'Other Emissions and Management',
    },
    {
      moduleName: 'Waste',
    },
    {
      moduleName: 'Water',
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
      title="Analytics"
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
              <h6>Modules</h6>
              {moduleList?.map((module) => (
                <div
                  key={module?.moduleName}
                  className={`d-flex justify-content-between gap-2 mt-3 is_radius ${
                    selectedModule === module?.moduleName ? 'active' : ''
                  }`}
                >
                  <div
                    className="p-2 py-3 d-flex flex-column gap-2 flex-grow-1"
                    aria-hidden
                    onClick={() => setSelectedModule(module?.moduleName)}
                    // onClick={() => {
                    //   getTask();
                    //   router.push(`?indicator=${indicator?.name}`);
                    // }}
                  >
                    <h6 className="fs-14 fw-600 mb-0 letter-spacing text-capitalize">
                      {module?.moduleName}
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
                <h4 className="fs-18 fw-700 mb-3">{selectedModule}</h4>
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
