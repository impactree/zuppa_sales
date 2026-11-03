import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function Manpower() {
  const manpowerCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Manpower',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Employees',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Workers',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Male Coverage',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Female Coverage',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
  ];
  const manpowerChartCategories = [
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

  const manpowerChartSeries = [
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

  const turnoverChartCategories = [
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

  const turnoverChartSeries = [
    {
      name: 'Workers',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Employees',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  return (
    <div>
      <NonOpsDataCard cardData={manpowerCarddata} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={manpowerChartCategories}
            series={manpowerChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={hiringvsChartCategories}
            series={hiringvsChartSeries}
            isFilters
            isTimeFrequencyFilter
            isStacked
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title="Turnover Rate"
            categories={turnoverChartCategories}
            series={turnoverChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
    </div>
  );
}
