import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import AnalyticsTable from '../AnalyticsTable';

export default function UnionAssociationMembership() {
  const unionMembershipCardData = [
    {
      cardTitle: 'Total Manpower',
      cardValue: 50,
    },
    {
      cardTitle: 'No. of Permanent Employees',
      cardValue: 30,
    },
    {
      cardTitle: 'No. of Permanent Workers',
      cardValue: 20,
    },
    {
      cardTitle: '% of BRSR Principles covered',
      cardValue: 90,
    },
  ];
  const unionMembersBreakupChartCategories = [
    'Permanent Employees',
    'Permanent Workers',
  ];
  const unionMembersBreakupChartSeries = [
    {
      name: 'Male',
      data: [20, 8],
    },
    {
      name: '  Female',
      data: [10, 12],
    },
  ];
  const unionMembersTrendChartCategories = [
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
  const unionMembersTrendChartSeries = [
    {
      name: 'Permanent Employees',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Permanent Workers',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  const industryAssociationMembershipCardData = [
    {
      cardTitle: 'State Associations',
      cardValue: 10,
    },
    {
      cardTitle: 'National Associations',
      cardValue: 20,
    },
    {
      cardTitle: 'International Associations',
      cardValue: 30,
    },
  ];
  const industryAssociationMembershipData = [
    {
      'name of the trade and industry chambers/associations ':
        'Name of the trade and industry chambers/associations ',
      reach: 'Reach',
    },
    {
      'name of the trade and industry chambers/associations ':
        'Name of the trade and industry chambers/associations ',
      reach: 'Reach',
    },
    {
      'name of the trade and industry chambers/associations ':
        'Name of the trade and industry chambers/associations ',
      reach: 'Reach',
    },
  ];
  const industryAssociationMembershipColumn = [
    {
      key: 'name of the trade and industry chambers/associations ',
      label: 'Name of the trade and industry chambers/associations ',
    },
    {
      key: 'reach',
      label: 'Reach',
    },
  ];
  return (
    <div>
      <IndicatorHeader title="Union Membership" />
      <NonOpsDataCard cardData={unionMembershipCardData} />
      <Chart
        type="bar"
        title="Breakup by Category & Gender"
        categories={unionMembersBreakupChartCategories}
        series={unionMembersBreakupChartSeries}
        isStacked
      />
      <Chart
        type="bar"
        title="Union Membership Trend"
        categories={unionMembersTrendChartCategories}
        series={unionMembersTrendChartSeries}
        isStacked
        isFilters
        isTimeFrequencyFilter
      />

      <IndicatorHeader title="Industry Association Membership" />
      <NonOpsDataCard
        cardData={industryAssociationMembershipCardData}
      />
      <AnalyticsTable
        columns={industryAssociationMembershipColumn}
        data={industryAssociationMembershipData}
      />
    </div>
  );
}
