import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import SingleTextCard from '@/components/Cards/SingleTextCard';

export default function HealthandSafety() {
  const healthCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Fatalities',
      cardValue: 1065,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Lost Time Injuries',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Recordable Work-related Injuries',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'High consequence work-related Injury',
      cardValue: 18,
      cardColumn: 'col-lg-12',
    },
  ];
  const safetyChartCategories = [
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
  const safetyChartSeries = [
    {
      name: 'Employees',
      data: [50, 60, 40, 50, 20, 10, 40, 50, 70, 60, 40, 20],
    },
    {
      name: 'Workers',
      data: [25, 40, 30, 20, 40, 15, 20, 30, 40, 30, 20, 10],
    },
  ];

  const safetyCardText = {
    cardTitle: 'Safety Management System Implementation',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const hazardCardText = {
    cardTitle: 'Hazard Identification & Risk Assessment',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const workerCardText = {
    cardTitle: 'Hazard Reporting & Worker Safety',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  return (
    <div>
      <NonOpsDataCard cardData={healthCarddata} />
      <IndicatorHeader title="Operations' impact on IUCN Red List species" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title="Workforce Safety Trends"
            categories={safetyChartCategories}
            series={safetyChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Health & Safety Management Systems" />
      <SingleTextCard cardData={safetyCardText} />
      <SingleTextCard cardData={hazardCardText} />
      <SingleTextCard cardData={workerCardText} />
    </div>
  );
}
