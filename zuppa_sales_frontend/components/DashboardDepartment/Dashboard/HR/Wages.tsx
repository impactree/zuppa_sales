/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unstable-nested-components */
import Chart from '@/components/Charts/Chart';
import React from 'react';
import Table from '@/components/Table/Table';
import { TableColumn } from 'react-data-table-component';
import { CustomAccordion } from '@/components/Accordion/CustomAccordion';

export default function CSRProjects() {
  const wageChartCategories = [
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

  const wageChartSeries = [
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
      data: [5, 20, 5, 20, 30, 15, 20, 10, 15, 25, 20, 15],
    },
  ];

  const tableData = [
    {
      category_name: 'Board of Director',
      male_count: '5',
      male: '3.2 Crores',
      female_count: '1',
      female: '32 lakhs',
    },
    {
      category_name: 'Key Management Personnel',
      male_count: '1',
      male: '21 lakhs',
      female_count: '0',
      female: 'Not Applicable',
    },
    {
      category_name: 'Employees other than KMP',
      male_count: '1',
      male: '21 lakhs',
      female_count: '0',
      female: 'Not Applicable',
    },
    {
      category_name: 'Workers',
      male_count: '1',
      male: '21 lakhs',
      female_count: '0',
      female: 'Not Applicable',
    },
  ];

  const columns: TableColumn<any>[] = [
    {
      name: <div className="fs-13 fw-semibold letter-spacing">Category</div>,
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">
          {row?.category_name}
        </div>
      ),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: <div className="fs-13 fw-semibold letter-spacing">Count</div>,
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">{row?.male_count}</div>
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
      name: <div className="fs-13 fw-semibold letter-spacing">Count</div>,
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">
          {row?.female_count}
        </div>
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

  const pfChartCategories = ['Employees', 'Workers'];

  const pfChartSeries = [
    {
      name: 'Employees',
      data: [10, 15],
    },
  ];

  const donutCategories = ['PF Coverage'];
  const donutSeries = [82];

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="area"
            cardClass=""
            title=" "
            categories={wageChartCategories}
            series={wageChartSeries}
            isFilters
            isTimeFrequencyFilter
            isStacked
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-12">
          <div style={{ height: '300px' }}>
            <Table<any> data={tableData} columns={columns} />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <CustomAccordion accordionText="PF Payments" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <div className="row">
              <div className="col-lg-6">
                <Chart
                  type="bar"
                  cardClass=""
                  title="Breakup by Category "
                  categories={pfChartCategories}
                  series={pfChartSeries}
                  isFilters
                  isTimeFrequencyFilter
                  isStacked
                />
              </div>
              <div className="col-lg-6">
                <Chart
                  type="donut"
                  cardClass=""
                  title="PF Coverage"
                  categories={donutCategories}
                  series={donutSeries}
                  isFilters
                  isTimeFrequencyFilter
                  isStacked
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
    </div>
  );
}
