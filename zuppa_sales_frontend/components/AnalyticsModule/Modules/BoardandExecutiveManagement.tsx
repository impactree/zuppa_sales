/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unstable-nested-components */
import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import SingleTextCard from '@/components/Cards/SingleTextCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import Table from '@/components/Table/Table';
import { TableColumn } from 'react-data-table-component';
import { CustomAccordion } from '@/components/Accordion/CustomAccordion';

export default function BoardandExecutiveManagement() {
  const boardCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Board of Directors (BoD)',
      cardValue: 10,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Key Management Personnel (KMP)',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
  ];

  const governanceCarddata: INonOpsDataCard[] = [
    {
      cardTitle: ' Total number of Committees',
      cardValue: 10,
      cardColumn: 'col-lg-12',
    },
  ];

  const committeecardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Committee A Name Members',
      cardValue: 10,
      cardColumn: 'col-lg-12',
    },
  ];

  const committeeChartCategories = [
    'BOD Members',
    'KMP',
    'Employees other than KMP',
    'Workers',
  ];

  const committeeChartSeries = [
    {
      name: 'Committee data',
      data: [25, 30, 15, 10],
    },
  ];

  const pieCategories = [
    'BOD Members',
    'KMP',
    'Employees other than KMP',
    'Workers',
  ];
  const pieSeries = [50, 60, 30, 40];

  // Complaint Filed vs Resolved

  const breakupChartCategories = [
    'Board of Directors',
    'Key Management Personnel',
  ];

  const breakupChartSeries = [
    {
      name: 'Male',
      data: [25, 30],
    },
    {
      name: 'Female',
      data: [15, 25],
    },
  ];

  const kmpChartCategories = ['2022', '2023'];

  const kmpChartSeries = [
    {
      name: 'Board of Directors',
      data: [25, 30],
    },
    {
      name: 'Key Management Personnel',
      data: [15, 25],
    },
  ];

  const bodMedianChartCategories = [
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

  const bodMedianChartSeries = [
    {
      name: 'Male',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
    {
      name: 'Female',
      data: [15, 25, 20, 10, 15, 25, 20, 10, 15, 25, 20, 10],
    },
  ];

  const kmpMedianChartCategories = ['2022', '2023'];

  const kmpMedianChartSeries = [
    {
      name: 'Male',
      data: [25, 30],
    },
    {
      name: 'Female',
      data: [15, 25],
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

  const levelindependenceCardText = {
    cardTitle: 'Level of independence exercised',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const tenureCardText = {
    cardTitle: 'Tenure of the members',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const significantCardText = {
    cardTitle: 'Significant positions held by the members',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const underSocialCardText = {
    cardTitle: 'Under-represented social groups',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const competenciesCardText = {
    cardTitle: 'Competencies relevant to the impacts of the entity',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const statementCardText = {
    cardTitle:
      'Statement by director responsible for the Business Responsibility Report',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const authorityCardText = {
    cardTitle:
      'Highest authority responsible for Business Responsibility policy implementation',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const decisionsCardText = {
    cardTitle:
      'Committee / Director responsible for sustainability related decisions',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  return (
    <div>
      <IndicatorHeader title="Board & Management" />
      <NonOpsDataCard cardData={boardCarddata} />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Breakup by Gender"
            categories={breakupChartCategories}
            series={breakupChartSeries}
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="BoD and KMP Trend"
            categories={kmpChartCategories}
            series={kmpChartSeries}
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Median Pay" />
      <div className="row mb-3">
        <div className="col-md-12">
          <div style={{ height: '200px' }}>
            <Table<any> data={tableData} columns={columns} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="BoD Median Pay Trend"
            categories={bodMedianChartCategories}
            series={bodMedianChartSeries}
            isTimeFrequencyFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="KMP Median Pay Trend"
            categories={kmpMedianChartCategories}
            series={kmpMedianChartSeries}
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <IndicatorHeader title=" Governance Committees" />
      <NonOpsDataCard cardData={governanceCarddata} />

      <div className="mt-3">
        <CustomAccordion accordionText="Choose the Committee Name" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={committeecardData} />
            <div className="row">
              <div className="col-lg-6">
                <Chart
                  type="bar"
                  cardClass=""
                  title=" "
                  categories={committeeChartCategories}
                  series={committeeChartSeries}
                  isFilters
                  isLocationFilter
                />
              </div>
              <div className="col-lg-6">
                <Chart
                  type="pie"
                  cardClass=""
                  title="Breakup by Age Group"
                  categories={pieCategories}
                  series={pieSeries}
                  isFilters
                  isLocationFilter
                  isValueFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
      <SingleTextCard cardData={levelindependenceCardText} />
      <SingleTextCard cardData={tenureCardText} />
      <SingleTextCard cardData={significantCardText} />
      <SingleTextCard cardData={underSocialCardText} />
      <SingleTextCard cardData={competenciesCardText} />
      <IndicatorHeader title="Governance, Leadership & Oversight" />
      <SingleTextCard cardData={statementCardText} />
      <SingleTextCard cardData={authorityCardText} />
      <SingleTextCard cardData={decisionsCardText} />
    </div>
  );
}
