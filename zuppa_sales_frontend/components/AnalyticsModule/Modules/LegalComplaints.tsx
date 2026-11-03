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
import '../AnalyticsModule.css';

export default function LegalComplaints() {
  const shareHolderCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total No. of Complaints',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Complaints resolved',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Pending No. of Complaints',
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
  ];
  const shareHolderChartCategories = [
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
  const shareHolderChartSeries = [
    {
      name: 'No. of complaints filed',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
    {
      name: 'No. of complaints resolved',
      data: [15, 25, 20, 10, 15, 25, 20, 10, 15, 25, 20, 10],
    },
  ];
  const briberyCasesCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Bribery / Corruption Cases',
      cardValue: 20,
      cardColumn: 'col-lg-12',
    },
  ];
  const briberyCasesChartCategories = [
    'BOD Members',
    'KMP',
    'Employees ',
    'Workers',
  ];
  const briberyCasesChartSeries = [
    {
      name: 'No. of complaints',
      data: [25, 30, 15, 10],
    },
  ];

  const lineCategories = [
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
  const lineSeries = [
    {
      name: 'BOD Members',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'KMP',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
    {
      name: 'Employees',
      data: [50, 60, 40, 50, 20, 10, 40, 50, 70, 60, 40, 20],
    },
    {
      name: 'Workers',
      data: [40, 50, 30, 20, 40, 20, 30, 40, 60, 50, 50, 30],
    },
  ];

  const briberyCasesCardData2: INonOpsDataCard[] = [
    {
      cardTitle: 'Terminated Contracts (Corruption)',
      cardValue: 12,
      cardColumn: 'col-lg-12',
    },
  ];

  const conflictOfInterestCasesCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Complaints',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Complaints by Directors',
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Complaints by KMP',
      cardValue: 7,
      cardColumn: 'col-lg-4',
    },
  ];

  const conflictCasesChartCategories = [
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
  const conflictCasesChartSeries = [
    {
      name: 'BOD Members',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'KMP',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  const antiCompetetiveCasesCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'No. of Legal actions',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Legal actions resolved',
      cardValue: 6,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% Legal actions pending resolution',
      cardValue: 50,
      cardColumn: 'col-lg-4',
    },
  ];

  const tableData = [
    {
      case_name: 'Name of the authority 1',
      case_brief: 'Brief of the case 1',
      case_action: 'Details of corrective actions taken 1',
    },
    {
      case_name: 'Name of the authority 2',
      case_brief: 'Brief of the case 2',
      case_action: 'Details of corrective actions taken 2',
    },
    {
      case_name: 'Name of the authority 3',
      case_brief: 'Brief of the case 3',
      case_action: 'Details of corrective actions taken 3',
    },
    {
      case_name: 'Name of the authority 4',
      case_brief: 'Brief of the case 4',
      case_action: 'Details of corrective actions taken 4',
    },
  ];
  const columns: TableColumn<any>[] = [
    {
      name: <div className="fs-13 fw-semibold letter-spacing">S.No</div>,
      cell: (row, index) => (
        <div className="fs-12 fw-semibold letter-spacing text-capitalize">
          {index + 1}
        </div>
      ),
      sortable: true,
      maxWidth: '50px',
    },
    {
      name: (
        <div className="fs-13 fw-semibold letter-spacing">
          Name of the authority
        </div>
      ),
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">{row?.case_name}</div>
      ),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: (
        <div className="fs-13 fw-semibold letter-spacing">
          Brief of the case
        </div>
      ),
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">{row?.case_brief}</div>
      ),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: (
        <div className="fs-13 fw-semibold letter-spacing">
          Details of corrective actions taken
        </div>
      ),
      cell: (row) => (
        <div className="fs-12 fw-medium letter-spacing">{row?.case_action}</div>
      ),
      sortable: true,
      minWidth: '200px',
    },
  ];

  const monetaryCasesCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Cases Appealed',
      cardValue: 12,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Total Monetary Charges',
      cardValue: 1200000,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Amount of Penalties (in Rs.)',
      cardValue: 1500000,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Amount of Settlement (in Rs.)',
      cardValue: 1000000,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Amount of Compounding Fee (in Rs.)',
      cardValue: 5000000,
      cardColumn: 'col-lg-4',
    },
  ];

  const shareholderGrievanceMechanismCardText = {
    cardTitle: 'Shareholder Grievance Mechanism',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const investorGrievanceMechanismCardText = {
    cardTitle: 'Investor Grievance Mechanism',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const publicLegalCasesCardText = {
    cardTitle: 'Public Legal Cases against Corruption',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const managingConflictofInterestsCardText = {
    cardTitle: 'Managing Conflict of Interests',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  return (
    <div>
      <IndicatorHeader title="Shareholder Grievances" />
      <NonOpsDataCard cardData={shareHolderCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Shareholder Complaints"
            categories={shareHolderChartCategories}
            series={shareHolderChartSeries}
            isStacked
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <SingleTextCard cardData={shareholderGrievanceMechanismCardText} />
      <IndicatorHeader title="Investor Grievances (Other than Shareholders)" />
      <NonOpsDataCard cardData={shareHolderCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Investor Complaints"
            categories={shareHolderChartCategories}
            series={shareHolderChartSeries}
            isStacked
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <SingleTextCard cardData={investorGrievanceMechanismCardText} />
      <IndicatorHeader title="Disciplinary Action against Bribery/Corruption" />
      <NonOpsDataCard cardData={briberyCasesCardData} />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Disciplinary Action"
            categories={briberyCasesChartCategories}
            series={briberyCasesChartSeries}
            isStacked
            isFilters
            isLocationFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="line"
            cardClass=""
            title="Disciplinary Action Braekup by Employee Type"
            categories={lineCategories}
            series={lineSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <NonOpsDataCard cardData={briberyCasesCardData2} />
      <SingleTextCard cardData={publicLegalCasesCardText} />
      <IndicatorHeader title="Conflict of Interest Cases" />
      <NonOpsDataCard cardData={conflictOfInterestCasesCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title="Conflict of Interest Cases Braekup by Employee Type"
            categories={conflictCasesChartCategories}
            series={conflictCasesChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <SingleTextCard cardData={managingConflictofInterestsCardText} />
      <IndicatorHeader title="Anti-Competitive Behaviour Cases" />
      <NonOpsDataCard cardData={antiCompetetiveCasesCardData} />
      <div className="row mb-3">
        <div className="col-md-12">
          <div style={{ height: '300px' }}>
            <Table<any> data={tableData} columns={columns} />
          </div>
        </div>
      </div>
      <IndicatorHeader title="Anti-Competitive Behaviour Cases" />
      <NonOpsDataCard cardData={monetaryCasesCardData} />
    </div>
  );
}
