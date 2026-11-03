import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function CSRProjects() {
  const financialCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Revenue (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Turnover (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Net Worth (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Gross Profit (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-12',
    },
  ];

  const exportCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Amount of Exports  (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Exports (% of Turnover)',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
  ];

  const exportChartCategories = [
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

  const exportChartSeries = [
    {
      name: 'Exports',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
  ];

  const financialChartCategories = [
    'Q1',
    'Q2',
    'Q3',
    'Q4',
  ];

  const financialChartSeries = [
    {
      name: 'Revenue',
      data: [10, 15, 10, 5],
    },
    {
      name: 'Gross Profit ',
      data: [20, 30, 15, 10],
    },
  ];

  const costChartCategories = [
    'Q1',
    'Q2',
    'Q3',
    'Q4',
  ];

  const costChartSeries = [
    {
      name: 'Revenue',
      data: [10, 15, 10, 5],
    },
    {
      name: 'Cost',
      data: [20, 30, 15, 10],
    },
  ];

  return (
    <div>
      <NonOpsDataCard cardData={financialCarddata} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title="Financial performance trend"
            categories={financialChartCategories}
            series={financialChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Cost Incurred" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={costChartCategories}
            series={costChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Exports Contribution" />
      <NonOpsDataCard cardData={exportCarddata} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={exportChartCategories}
            series={exportChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
    </div>
  );
}
