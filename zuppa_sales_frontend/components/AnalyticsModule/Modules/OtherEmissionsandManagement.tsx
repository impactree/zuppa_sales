import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import OpsDataCard, { IOpsCardDta } from '@/components/Cards/OpsDataCard';
import Chart, { IMetricData } from '@/components/Charts/Chart';
import React from 'react';
import { SlEnergy } from 'react-icons/sl';

export default function OtherEmissionsandManagement() {
  const UnitsPurchasedTrendsChartCategories = [
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
  const UnitsPurchasedTrendsChartSeries = [
    {
      name: 'Purchased Trends',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
  ];

  const metricCardData: IOpsCardDta[] = [
    {
      title: 'ODS Produced',
      name: 'Tonnes per year',
      value: 4750.41,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
    {
      title: 'ODS Destroyed',
      name: 'Tonnes per year',
      value: 4150,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
    {
      title: 'ODS Used as Feedstock',
      name: 'Tonnes per year',
      value: 3500,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'ODS Exported',
      name: 'Tonnes per year',
      value: 3150,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'ODS Imported',
      name: 'Tonnes per year',
      value: 2500,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
  ];

  const metricChartData: IMetricData = {
    name: 'NOx',
    value: 31556952,
    suffixUnit: 'm3 per year',
    icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
  };

  return (
    <div>
      <IndicatorHeader title="Ozone Depleting Substances" />
      <OpsDataCard cardData={metricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Ozone Depleting Substances Trends"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isStacked
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Air Emissions" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Total Emissions from Product Disposal Over Time"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isMetric
            metricData={metricChartData}
          />
        </div>
      </div>
    </div>
  );
}
