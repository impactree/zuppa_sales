import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function Investor() {
  const shareCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total No. of Complaints',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Complaints resolved',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Pending No. of Complaints',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
  ];
  const shareChartCategories = [
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

  const shareChartSeries = [
    {
      name: 'No. of complaints filed',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'No. of complaints resolved ',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  return (
    <div>
      <NonOpsDataCard cardData={shareCarddata} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={shareChartCategories}
            series={shareChartSeries}
            isFilters
            isTimeFrequencyFilter
            isStacked
          />
        </div>
      </div>
    </div>
  );
}
