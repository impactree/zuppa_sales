import React from 'react';
import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';

export default function ValueChainPartners() {
  const valueChainCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total No. of Complaints',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Total Complaints Resolved',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% Complaints Pending Resolution',
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
  ];
  const vcpCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'No. of VCP Assessed',
      cardValue: 20,
      cardColumn: 'col-lg-12',
    },
  ];
  const unionChartCategories = [
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
  const unionChartSeries = [
    {
      name: 'No. of complaints filed',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
    {
      name: 'No. of complaints resolved',
      data: [15, 25, 20, 10, 15, 25, 20, 10, 15, 25, 20, 10],
    },
  ];

  const vcpChartCategories = [
    'Health & Safety Audits',
    'Working condition audits',
    'Sexual Harassment',
    'Discrimination at Workplace',
    'Child Labor',
    'Forced / Involuntary Labour',
    'Wages',
    'Other',
  ];

  const vcpChartSeries = [
    {
      name: 'No. of complaints filed',
      data: [25, 30, 15, 10, 25, 30, 22, 15],
    },
  ];
  const vcpTimeChartCategories = [
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
  const vcpTimeChartSeries = [
    {
      name: 'Assessment',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
  ];

  const awarenessCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total number of Training Programs',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Sessions conducted',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Training Coverage (%)',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% of BRSR Principles covered',
      cardValue: 20,
      cardColumn: 'col-lg-12',
    },
  ];

  const trainingCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'No. of Sessions conducted',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Sessions conducted',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Sessions conducted',
      cardValue: 20,
      cardColumn: 'col-lg-4',
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
      name: 'No of Sessions',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
  ];

  return (
    <div>
      <IndicatorHeader title="Value Chain Partner Grievances" />
      <NonOpsDataCard cardData={valueChainCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Union Membership Trend"
            categories={unionChartCategories}
            series={unionChartSeries}
            isStacked
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Value Chain Partner Assessment" />
      <NonOpsDataCard cardData={vcpCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={vcpChartCategories}
            series={vcpChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <NonOpsDataCard cardData={vcpCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={vcpTimeChartCategories}
            series={vcpTimeChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Awareness Programmes" />
      <NonOpsDataCard cardData={awarenessCardData} />
      <IndicatorHeader title=" Training Program Participation Trend" />
      <NonOpsDataCard cardData={trainingCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={lineCategories}
            series={lineSeries}
          />
        </div>
      </div>
    </div>
  );
}
