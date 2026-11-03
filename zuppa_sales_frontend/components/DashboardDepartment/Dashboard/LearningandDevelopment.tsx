import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function LearningandDevelopment() {
  const trainingCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total number of Training Programs',
      cardValue: 1065,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Sessions conducted',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Training Coverage (%)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
  ];
  const trainingChartCategories = [
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
  const trainingChartSeries = [
    {
      name: 'BOD',
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
      data: [25, 40, 30, 20, 40, 15, 20, 30, 40, 30, 20, 10],
    },
  ];
  const trainingDurationChartCategories = [
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
  const trainingDurationChartSeries = [
    {
      name: 'BOD',
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
      data: [25, 40, 30, 20, 40, 15, 20, 30, 40, 30, 20, 10],
    },
  ];

  const awarenessCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total number of Training Programs',
      cardValue: 1065,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of Sessions conducted',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Training Coverage (%)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% of BRSR Principles covered',
      cardValue: 18,
      cardColumn: 'col-lg-12',
    },
  ];
  const trainingTrendChartCategories = [
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
  const trainingTrendChartSeries = [
    {
      name: 'BOD',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
  ];

  return (
    <div>
      <IndicatorHeader title="Training Programmes Conducted" />
      <NonOpsDataCard cardData={trainingCarddata} />
      <IndicatorHeader title="Operations' impact on IUCN Red List species" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title="Training Participation Rate"
            categories={trainingChartCategories}
            series={trainingChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Training Program Duration" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title="Training Participation Rate"
            categories={trainingDurationChartCategories}
            series={trainingDurationChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Awareness Programmes" />
      <NonOpsDataCard cardData={awarenessCarddata} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title="Training Program Participation Trend"
            categories={trainingTrendChartCategories}
            series={trainingTrendChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
    </div>
  );
}
