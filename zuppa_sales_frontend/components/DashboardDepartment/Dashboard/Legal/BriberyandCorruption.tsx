import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import SingleTextCard from '@/components/Cards/SingleTextCard';

export default function BriberyandCorruption() {
  const behaviorCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Bribery / Corruption Cases ',
      cardValue: 18,
      cardColumn: 'col-lg-12',
    },
  ];
  const behaviorChartCategories = [
    'BOD Members',
    'KMP',
    'Employees',
    'Workers',
  ];
  const behaviorChartSeries = [
    {
      name: 'Members',
      data: [10, 30, 25, 40],
    },
  ];

  const antiCardText = {
    cardTitle: 'Anti-Corruption product',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  return (
    <div>
      <NonOpsDataCard cardData={behaviorCarddata} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={behaviorChartCategories}
            series={behaviorChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <SingleTextCard cardData={antiCardText} />
    </div>
  );
}
