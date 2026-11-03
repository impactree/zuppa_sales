/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unstable-nested-components */
import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import SingleTextCard from '@/components/Cards/SingleTextCard';
import Chart from '@/components/Charts/Chart';
import Table from '@/components/Table/Table';
import React from 'react';
import { TableColumn } from 'react-data-table-component';

export default function CSRandCommunityRelations() {
  const beneficiariesCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'No. of CSR Projects',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Total No. of Beneficiaries',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% of Vulnerable Beneficiaries',
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
  ];
  const cSRChartCategories = [
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
  const cSRChartSeries = [
    {
      name: 'Total beneficiaries',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
    {
      name: 'Marginalized beneficiaries ',
      data: [15, 25, 20, 10, 15, 25, 20, 10, 15, 25, 20, 10],
    },
  ];
  const aspirationalCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'No. of States',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Aspirational Districts',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Amount spent (in lakh Rs.)',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
  ];

  const tableData = [
    {
      details: 'Details of CSR Projects',
      beneficiaries_no: 'No. of beneficiaries',
      beneficiaries_groups:
        '% of beneficiaries from vulnerable & marginalized groups',
    },
    {
      details: 'Details of CSR Projects',
      beneficiaries_no: 'No. of beneficiaries',
      beneficiaries_groups:
        '% of beneficiaries from vulnerable & marginalized groups',
    },
    {
      details: 'Details of CSR Projects',
      beneficiaries_no: 'No. of beneficiaries',
      beneficiaries_groups:
        '% of beneficiaries from vulnerable & marginalized groups',
    },
    {
      details: 'Details of CSR Projects',
      beneficiaries_no: 'No. of beneficiaries',
      beneficiaries_groups:
        '% of beneficiaries from vulnerable & marginalized groups',
    },
  ];
  const columns: TableColumn<any>[] = [
    {
      name: (
        <div className="fs-13 fw-semibold letter-spacing">
          Details of CSR Projects
        </div>
      ),
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">{row?.details}</div>
      ),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: (
        <div className="fs-13 fw-semibold letter-spacing">
          No. of beneficiaries
        </div>
      ),
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">
          {row?.beneficiaries_no}
        </div>
      ),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: (
        <div className="fs-13 fw-semibold letter-spacing">
          % of beneficiaries from vulnerable & marginalized groups
        </div>
      ),
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">
          {row?.beneficiaries_groups}
        </div>
      ),
      sortable: true,
      minWidth: '200px',
    },
  ];

  const tableData1 = [
    {
      state: 'State',
      district: 'Aspirational District',
      amount: 'Amount spent in Rs',
    },
    {
      state: 'State',
      district: 'Aspirational District',
      amount: 'Amount spent in Rs',
    },
    {
      state: 'State',
      district: 'Aspirational District',
      amount: 'Amount spent in Rs',
    },
    {
      state: 'State',
      district: 'Aspirational District',
      amount: 'Amount spent in Rs',
    },
  ];
  const columns1: TableColumn<any>[] = [
    {
      name: <div className="fs-13 fw-semibold letter-spacing">State</div>,
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">{row?.state}</div>
      ),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: (
        <div className="fs-13 fw-semibold letter-spacing">
          Aspirational District
        </div>
      ),
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">{row?.district}</div>
      ),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: (
        <div className="fs-13 fw-semibold letter-spacing">
          Amount spent in Rs
        </div>
      ),
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">{row?.amount}</div>
      ),
      sortable: true,
      minWidth: '200px',
    },
  ];

  const aspirationalChartCategories = [
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
  const aspirationalChartSeries = [
    {
      name: 'Aspirational District',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
  ];

  const communityCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Complaints Filed',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Total Complaints Resolved',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% Complaints Pending Resolution',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
  ];

  const communityChartCategories = [
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

  const communityChartSeries = [
    {
      name: 'No. of complaints filed',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
    {
      name: 'No. of complaints resolved',
      data: [15, 25, 20, 10, 15, 25, 20, 10, 15, 25, 20, 10],
    },
  ];
  const mechanismCardText = {
    cardTitle: 'Mechanism to address community grievances',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const rrCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'No. of R&R Projects',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of States',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Districts',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
  ];

  const projectCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Project Affected Families (PAFs)',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% of PAFs covered by R&R',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Amount paid to PAFs',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
  ];
  const projectChartCategories = [
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

  const projectChartSeries = [
    {
      name: 'Project Affected Families (PAFs)',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
    {
      name: 'PAFs covered by R&R',
      data: [15, 25, 20, 10, 15, 25, 20, 10, 15, 25, 20, 10],
    },
  ];

  const projectwiseChartCategories = [
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
  const projectwiseChartSeries = [
    {
      name: 'Project wise Data',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
  ];

  return (
    <div>
      <IndicatorHeader title="Beneficiaries of CSR Projects" />
      <NonOpsDataCard cardData={beneficiariesCardData} />
      <div className="row mb-3">
        <div className="col-md-12">
          <div style={{ height: '300px' }}>
            <Table<any> data={tableData} columns={columns} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={cSRChartCategories}
            series={cSRChartSeries}
            isStacked
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="CSR Projects in Aspirational Districts" />
      <NonOpsDataCard cardData={aspirationalCardData} />
      <div className="row mb-3">
        <div className="col-md-12">
          <div style={{ height: '300px' }}>
            <Table<any> data={tableData1} columns={columns1} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={aspirationalChartCategories}
            series={aspirationalChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Community Grievances" />
      <NonOpsDataCard cardData={communityCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={communityChartCategories}
            series={communityChartSeries}
            isStacked
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <SingleTextCard cardData={mechanismCardText} />
      <IndicatorHeader title="Rehabilitation & Resettlement (R&R)" />
      <NonOpsDataCard cardData={rrCardData} />
      <div>
        <NonOpsDataCard cardData={projectCardData} />
        <div className="row">
          <div className="col-lg-12">
            <Chart
              type="bar"
              cardClass=""
              title=" "
              categories={projectChartCategories}
              series={projectChartSeries}
              isStacked
              isFilters
              isLocationFilter
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={projectwiseChartCategories}
            series={projectwiseChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
    </div>
  );
}
