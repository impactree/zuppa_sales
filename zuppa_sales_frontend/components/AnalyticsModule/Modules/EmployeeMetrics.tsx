/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import SingleTextCard from '@/components/Cards/SingleTextCard';
import Chart from '@/components/Charts/Chart';
import Table from '@/components/Table/Table';
import { TableColumn } from 'react-data-table-component';
import { CustomAccordion } from '@/components/Accordion/CustomAccordion';

export default function EmployeeMetrics() {
  const manpowerCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Manpower',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Employees',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Workers',
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Male Coverage',
      cardValue: 82,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Female Coverage',
      cardValue: 82,
      cardColumn: 'col-lg-6',
    },
  ];
  const breakupCategoryChartCategories = [
    'Permanent Employees',
    'Other than Permanent Employees',
    'Permanent Workers',
    'Other than Permanent Workers',
  ];
  const breakupCategoryChartSeries = [
    {
      name: 'Male',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Female',
      data: [15, 25, 20, 10],
    },
  ];

  const pieCategories = ['Male', 'Female'];
  const pieSeries = [50, 60];

  const employeeCategoryChartCategories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const employeeCategoryChartSeries = [
    {
      name: 'Workers',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Employees',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  const maleCategoryChartCategories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const maleCategoryChartSeries = [
    {
      name: 'Male',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Female',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  const abledCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Male',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Female',
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
  ];

  const abledChartCategories = ['Employees', 'Workers'];
  const abledChartSeries = [
    {
      name: 'Male',
      data: [25, 30],
    },
    {
      name: 'Female',
      data: [15, 25],
    },
  ];

  const employeecCoverageChartCategories = ['Male', 'Female'];
  const empoyeeCoverageategoryChartSeries = [50, 60];

  const hiringCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Male',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Female',
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
  ];

  const hiringChartCategories = ['Permanent Employees', 'Permanent Workers'];
  const hiringChartSeries = [
    {
      name: 'Male',
      data: [25, 30],
    },
    {
      name: 'Female',
      data: [15, 25],
    },
  ];

  const hiringageChartCategories = [
    '<30 years old',
    '30-50 years old',
    'Over 50 years old',
  ];
  const hiringageChartSeries = [50, 60, 40];

  const hiringlineChartCategories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const hiringlineChartSeries = [
    {
      name: 'Workers',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Employees',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  const attritionCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Male',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Female',
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
  ];

  const attritionChartCategories = ['Permanent Employees', 'Permanent Workers'];
  const attritionChartSeries = [
    {
      name: 'Male',
      data: [25, 30],
    },
    {
      name: 'Female',
      data: [15, 25],
    },
  ];

  const attritionageChartCategories = [
    '<30 years old',
    '30-50 years old',
    'Over 50 years old',
  ];
  const attritionageChartSeries = [50, 60, 40];

  const attritionlineChartCategories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const attritionlineChartSeries = [
    {
      name: 'Workers',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Employees',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  const hiringvsChartCategories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const hiringvsChartSeries = [
    {
      name: 'Hiring',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Attrition',
      data: [-20, -30, -15, -10, -10, -5, -10, -20, -25, -15, -10, -5],
    },
  ];

  const turnoverCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Permanent Employees',
      cardValue: 20,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Permanent Workers',
      cardValue: 15,
      cardColumn: 'col-lg-6',
    },
  ];

  const turnoverChartCategories = ['Permanent Employees', 'Permanent Workers'];
  const turnoverChartSeries = [
    {
      name: 'Male',
      data: [25, 30],
    },
    {
      name: 'Female',
      data: [15, 25],
    },
  ];

  const turnoverlineChartCategories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const turnoverlineChartSeries = [
    {
      name: 'Workers',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Employees',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  const wagesCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total',
      cardValue: 20,
      cardColumn: 'col-lg-1',
    },
    {
      cardTitle: 'Employees',
      cardValue: 15,
      cardColumn: 'col-lg-1',
    },
    {
      cardTitle: 'Workers',
      cardValue: 20,
      cardColumn: 'col-lg-1',
    },
    {
      cardTitle: '% Equal to Minimum Wage',
      cardValue: 15,
      cardColumn: 'col-lg-3',
    },
    {
      cardTitle: 'Total',
      cardValue: 20,
      cardColumn: 'col-lg-1',
    },
    {
      cardTitle: 'Employees',
      cardValue: 15,
      cardColumn: 'col-lg-1',
    },
    {
      cardTitle: 'Workers',
      cardValue: 20,
      cardColumn: 'col-lg-1',
    },
    {
      cardTitle: '% More than Minimum Wage',
      cardValue: 15,
      cardColumn: 'col-lg-3',
    },
  ];

  const wagesCategoryCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Male',
      cardValue: 20,
      cardColumn: 'col-lg-3',
    },
    {
      cardTitle: 'Female',
      cardValue: 15,
      cardColumn: 'col-lg-3',
    },
    {
      cardTitle: 'Male',
      cardValue: 20,
      cardColumn: 'col-lg-3',
    },
    {
      cardTitle: 'Female',
      cardValue: 15,
      cardColumn: 'col-lg-3',
    },
  ];

  const wagescategoryChartCategories = [
    'Permanent Employees',
    'Other than Permanent Employees',
    'Permanent Workers',
    'Other than Permanent Workers',
  ];
  const wagescategoryChartSeries = [
    {
      name: 'Male',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Female',
      data: [15, 25, 20, 10],
    },
  ];
  const wageareaChartCategories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const wageareaChartSeries = [
    {
      name: 'Less than Minimum Wages',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Equal to Minimum Wages',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
    {
      name: 'More than Minimum Wages',
      data: [5, 20, 25, 15, 15, 20, 30, 15, 20, 10, 20, 25],
    },
  ];

  const tableData = [
    {
      category: 'Board of Director',
      male: '32 lakhs',
      female: 'nil',
    },
    {
      category: 'Key Management Personnel',
      male: '21 lakhs',
      female: 'nil',
    },
    {
      category: 'Employees other than KMP',
      male: '3.6 lakhs',
      female: 'nil',
    },
    {
      category: 'Workers',
      male: '2.8 lakhs',
      female: 'nil',
    },
  ];
  const columns: TableColumn<any>[] = [
    {
      name: <div className="fs-13 fw-semibold letter-spacing">Category</div>,
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">{row?.category}</div>
      ),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: <div className="fs-13 fw-semibold letter-spacing">Male</div>,
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">{row?.male}</div>
      ),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: <div className="fs-13 fw-semibold letter-spacing">Female</div>,
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">{row?.female}</div>
      ),
      sortable: true,
      minWidth: '200px',
    },
  ];

  const wagespaidCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Wages paid',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Rural Wage (%)',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Semi-Urban Wage (%)',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Urban Wage (%)',
      cardValue: 15,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Metropolitan Wage (%)',
      cardValue: 15,
      cardColumn: 'col-lg-6',
    },
  ];

  const wagespaidChartCategories = [
    'Permanent Employees',
    'Other than Permanent Employees',
    'Permanent Workers',
    'Other than Permanent Workers',
  ];
  const wagespaidChartSeries = [
    {
      name: 'Rural',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Semi-Urban',
      data: [15, 25, 20, 10],
    },
    {
      name: 'Urban',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Metropolitan',
      data: [15, 25, 20, 10],
    },
  ];

  const wagespaidareaChartCategories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const wagespaidareaChartSeries = [
    {
      name: 'Permanent Employees',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Other than Permanent Employees',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
    {
      name: 'Permanent Workers',
      data: [5, 20, 25, 15, 15, 20, 30, 15, 20, 10, 20, 25],
    },
    {
      name: 'Permanent Workers',
      data: [15, 5, 20, 25, 20, 20, 25, 5, 10, 30, 15, 5],
    },
  ];

  const pfCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Under Scope',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Employees',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Workers',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% Coverage',
      cardValue: 15,
      cardColumn: 'col-lg-12',
    },
  ];

  const pfbreakupCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Male',
      cardValue: 20,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Female',
      cardValue: 15,
      cardColumn: 'col-lg-6',
    },
  ];

  const wellbeingChartCategories = [
    'Health Insurance',
    'Accident Insurance',
    'Maternity Benefits',
    'Paternity Benefits',
    'Death based Compensation',
  ];
  const wellbeingChartSeries = [
    {
      name: 'Permanent Employees',
      data: [10, 15, 10, 5, 10],
    },
  ];

  const wellbeingcostChartCategories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const wellbeingcosChartSeries = [
    {
      name: 'Health Insurance',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Accident Insurance',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
    {
      name: 'Maternity Benefits',
      data: [5, 20, 25, 15, 15, 20, 30, 15, 20, 10, 20, 25],
    },
    {
      name: 'Paternity Benefits',
      data: [15, 5, 20, 25, 20, 20, 25, 5, 10, 30, 15, 5],
    },
    {
      name: 'Death based Compensation',
      data: [30, 35, 5, 20, 10, 15, 15, 30, 5, 10, 25, 15],
    },
  ];

  const healthCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Coverage of Health Insurance',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Male Coverage',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Female Coverage',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
  ];

  const accidentCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Coverage of Accident Insurance',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Male Coverage',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Female Coverage',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
  ];

  const daycareCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Coverage of Daycare Benefits',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Male Coverage',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Female Coverage',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
  ];

  const statutoryChartCategories = [
    'Permanent Employees',
    'Other than Permanent Employees',
    'Permanent Workers',
    'Other than Permanent Workers',
  ];
  const statutoryChartSeries = [
    {
      name: 'Male',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Female',
      data: [15, 25, 20, 10],
    },
  ];

  const maternityChartCategories = [
    'Permanent Employees',
    'Other than Permanent Employees',
    'Permanent Workers',
    'Other than Permanent Workers',
  ];
  const maternityChartSeries = [
    {
      name: 'Male',
      data: [25, 30, 15, 10],
    },
  ];

  const maternityworkChartCategories = ['Employees', 'Workers'];
  const maternityworkChartSeries = [
    {
      name: 'Under Scope',
      data: [25, 30],
    },
    {
      name: 'Availed Maternity',
      data: [25, 30],
    },
    {
      name: 'Returned to Work',
      data: [25, 30],
    },
    {
      name: 'Retained 12 month',
      data: [25, 30],
    },
  ];

  const paternityChartCategories = [
    'Permanent Employees',
    'Other than Permanent Employees',
    'Permanent Workers',
    'Other than Permanent Workers',
  ];
  const paternityChartSeries = [
    {
      name: 'Male',
      data: [25, 30, 15, 10],
    },
  ];

  const paternityworkChartCategories = ['Employees', 'Workers'];
  const paternityworkChartSeries = [
    {
      name: 'Under Scope',
      data: [25, 30],
    },
    {
      name: 'Availed Maternity',
      data: [25, 30],
    },
    {
      name: 'Returned to Work',
      data: [25, 30],
    },
    {
      name: 'Retained 12 month',
      data: [25, 30],
    },
  ];

  const maternityCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Women Under Scope',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Employees Coverage',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Workers Coverage',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Return to Work Rate',
      cardValue: 15,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Retention Rate',
      cardValue: 15,
      cardColumn: 'col-lg-6',
    },
  ];

  const paternityCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Men Under Scope',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Employees Coverage',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Workers Coverage',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Return to Work Rate',
      cardValue: 15,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Retention Rate',
      cardValue: 15,
      cardColumn: 'col-lg-6',
    },
  ];

  const deathCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Employee Coverage (%) ',
      cardValue: 20,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Worker Coverage (%)',
      cardValue: 15,
      cardColumn: 'col-lg-6',
    },
  ];

  const deathChartCategories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const deathChartSeries = [
    {
      name: 'Workers',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Employees',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];
  const workplaceCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'No. of Audit Types',
      cardValue: 20,
      cardColumn: 'col-lg-12',
    },
  ];

  const assessmentCardText = {
    cardTitle: 'Assessment Risks/Concerns',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const correctiveCardText = {
    cardTitle: 'Corrective Actions for Significant Risks',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  return (
    <div>
      <IndicatorHeader title="Manpower Count" />
      <NonOpsDataCard cardData={manpowerCardData} />
      <div className="row">
        <div className="col-lg-9">
          <Chart
            type="bar"
            cardClass=""
            title="Breakup by Category"
            categories={breakupCategoryChartCategories}
            series={breakupCategoryChartSeries}
            isStacked
            isFilters
            isLocationFilter
          />
        </div>
        <div className="col-lg-3">
          <Chart
            type="pie"
            cardClass=""
            title="Overall Gender Coverage"
            categories={pieCategories}
            series={pieSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={employeeCategoryChartCategories}
            series={employeeCategoryChartSeries}
            isStacked
            isFilters
            isLocationFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={maleCategoryChartCategories}
            series={maleCategoryChartSeries}
            isFilters
            isStacked
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Differently-abled Count" />
      <NonOpsDataCard cardData={abledCardData} />
      <div className="row">
        <div className="col-lg-9">
          <Chart
            type="bar"
            cardClass=""
            title="Differently-abled by Category & Gender"
            categories={abledChartCategories}
            series={abledChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
        <div className="col-lg-3">
          <Chart
            type="pie"
            cardClass=""
            title="Employees & Workers Coverage"
            categories={employeecCoverageChartCategories}
            series={empoyeeCoverageategoryChartSeries}
            isFilters
            isStacked
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Hiring" />
      <NonOpsDataCard cardData={hiringCardData} />
      <div className="row">
        <div className="col-lg-9">
          <Chart
            type="bar"
            cardClass=""
            title="Breakup by Category"
            categories={hiringChartCategories}
            series={hiringChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
        <div className="col-lg-3">
          <Chart
            type="pie"
            cardClass=""
            title="Breakup by Age Group "
            categories={hiringageChartCategories}
            series={hiringageChartSeries}
            isFilters
            isStacked
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={hiringlineChartCategories}
            series={hiringlineChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Attrition" />
      <NonOpsDataCard cardData={attritionCardData} />
      <div className="row">
        <div className="col-lg-9">
          <Chart
            type="bar"
            cardClass=""
            title="Breakup by Category"
            categories={attritionChartCategories}
            series={attritionChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
        <div className="col-lg-3">
          <Chart
            type="pie"
            cardClass=""
            title="Breakup by Age Group "
            categories={attritionageChartCategories}
            series={attritionageChartSeries}
            isFilters
            isStacked
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={attritionlineChartCategories}
            series={attritionlineChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Hiring vs Attrition" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={hiringvsChartCategories}
            series={hiringvsChartSeries}
            isFilters
            isStacked
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Turnover Rate" />
      <NonOpsDataCard cardData={turnoverCardData} />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={turnoverChartCategories}
            series={turnoverChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={turnoverlineChartCategories}
            series={turnoverlineChartSeries}
            isFilters
            isStacked
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Minimum Wages" />
      <NonOpsDataCard cardData={wagesCardData} />
      <NonOpsDataCard cardData={wagesCategoryCardData} />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={wagescategoryChartCategories}
            series={wagescategoryChartSeries}
            isFilters
            isStacked
            isLocationFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={wagescategoryChartCategories}
            series={wagescategoryChartSeries}
            isFilters
            isStacked
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="area"
            cardClass=""
            title=" "
            categories={wageareaChartCategories}
            series={wageareaChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Median Pay" />
      <div className="row mb-3">
        <div className="col-md-12">
          <div style={{ height: '300px' }}>
            <Table<any> data={tableData} columns={columns} />
          </div>
        </div>
      </div>
      <IndicatorHeader title="Wages paid to persons (by location)" />
      <NonOpsDataCard cardData={wagespaidCardData} />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Breakup by Category"
            categories={wagespaidChartCategories}
            series={wagespaidChartSeries}
            isFilters
            isStacked
            isLocationFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="area"
            cardClass=""
            title=" "
            categories={wagespaidareaChartCategories}
            series={wagespaidareaChartSeries}
            isFilters
            isStacked
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Statutory Payments" />
      <div className="mt-3">
        <CustomAccordion accordionText="PF Payments" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={pfCardData} />
            <NonOpsDataCard cardData={pfbreakupCardData} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title="Breakup by Category"
                  categories={statutoryChartCategories}
                  series={statutoryChartSeries}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title="Breakup by Category"
                  categories={['Permanent Employees']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Other than Permanent Employees']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Permanent Workers']}
                  series={[65]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Other than Permanent Workers']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
      <div className="mt-3">
        <CustomAccordion accordionText="ESI Payments" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={pfCardData} />
            <NonOpsDataCard cardData={pfbreakupCardData} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title="Breakup by Category"
                  categories={statutoryChartCategories}
                  series={statutoryChartSeries}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title="Breakup by Category"
                  categories={['Permanent Employees']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Other than Permanent Employees']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Permanent Workers']}
                  series={[65]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Other than Permanent Workers']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
      <div className="mt-3 mb-3">
        <CustomAccordion accordionText="Gratuity" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={pfCardData} />
            <NonOpsDataCard cardData={pfbreakupCardData} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title="Breakup by Category"
                  categories={statutoryChartCategories}
                  series={statutoryChartSeries}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title="Breakup by Category"
                  categories={['Permanent Employees']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Other than Permanent Employees']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Permanent Workers']}
                  series={[65]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Other than Permanent Workers']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
      <IndicatorHeader title="Well-Being Cost Incurred" />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={wellbeingChartCategories}
            series={wellbeingChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={wellbeingcostChartCategories}
            series={wellbeingcosChartSeries}
            isFilters
            isStacked
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>

      <div className="mt-3">
        <CustomAccordion accordionText="Health Insurance" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={healthCardData} />

            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title="Breakup by Category"
                  categories={statutoryChartCategories}
                  series={statutoryChartSeries}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title="Breakup by Category"
                  categories={['Permanent Employees']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Other than Permanent Employees']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Permanent Workers']}
                  series={[65]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Other than Permanent Workers']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>

      <div className="mt-3">
        <CustomAccordion accordionText="Accident Insurance" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={accidentCardData} />

            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title="Breakup by Category"
                  categories={statutoryChartCategories}
                  series={statutoryChartSeries}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title="Breakup by Category"
                  categories={['Permanent Employees']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Other than Permanent Employees']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Permanent Workers']}
                  series={[65]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Other than Permanent Workers']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>

      <div className="mt-3 mb-3">
        <CustomAccordion accordionText="Daycare Benefits Insurance" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={daycareCardData} />

            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title="Breakup by Category"
                  categories={statutoryChartCategories}
                  series={statutoryChartSeries}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title="Breakup by Category"
                  categories={['Permanent Employees']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Other than Permanent Employees']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Permanent Workers']}
                  series={[65]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
              <div className="col-lg-3">
                <Chart
                  type="radialBar"
                  cardClass=""
                  title=" "
                  categories={['Other than Permanent Workers']}
                  series={[70]}
                  isFilters
                  isStacked
                  isLocationFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
      <IndicatorHeader title="Parental Leave" />
      <div className="mt-3">
        <CustomAccordion accordionText="Maternity Benefits" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={maternityCardData} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title="Women Under Scope - Breakup by Category"
                  categories={maternityChartCategories}
                  series={maternityChartSeries}
                  isFilters
                  isLocationFilter
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title="Return to Work and Retention Rate"
                  categories={maternityworkChartCategories}
                  series={maternityworkChartSeries}
                  isFilters
                  isLocationFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>

      <div className="mt-3 mb-3">
        <CustomAccordion accordionText="Paternity Benefits" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={paternityCardData} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title="Men Under Scope - Breakup by Category"
                  categories={paternityChartCategories}
                  series={paternityChartSeries}
                  isFilters
                  isLocationFilter
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title="Return to Work and Retention Rate"
                  categories={paternityworkChartCategories}
                  series={paternityworkChartSeries}
                  isFilters
                  isLocationFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
      <IndicatorHeader title="Death Based Compensation" />
      <NonOpsDataCard cardData={deathCardData} />

      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Men Under Scope - Breakup by Category"
            categories={deathChartCategories}
            series={deathChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Workplace Audit" />
      <NonOpsDataCard cardData={workplaceCardData} />

      <div className="mt-3">
        <CustomAccordion accordionText="Choose Audit Category" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <SingleTextCard cardData={assessmentCardText} />
            <SingleTextCard cardData={correctiveCardText} />
          </div>
        </CustomAccordion>
      </div>
    </div>
  );
}
