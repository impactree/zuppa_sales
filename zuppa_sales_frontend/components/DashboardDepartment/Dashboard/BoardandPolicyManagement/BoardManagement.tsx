import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function BoardManagement() {
  const boardCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Board of Directors (BoD)',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Key Management Personnel (KMP)',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
  ];
  const boardChartCategories = ['2022', '2023'];
  const boardChartSeries = [
    {
      name: 'Board of Directors',
      data: [10, 30],
    },
    {
      name: 'Key Management Personnel',
      data: [15, 25],
    },
  ];

  return (
    <div>
      <NonOpsDataCard cardData={boardCarddata} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="BoD and KMP Trend"
            categories={boardChartCategories}
            series={boardChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
    </div>
  );
}
