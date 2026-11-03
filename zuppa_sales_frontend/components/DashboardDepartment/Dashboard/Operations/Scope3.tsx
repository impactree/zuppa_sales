import OpsDataCard from '@/components/Cards/OpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { SlEnergy } from 'react-icons/sl';

export default function Scope3() {
  const scope3ChartCategories = [
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
  const scope3ChartSeries = [
    {
      name: 'Scope 3 Data',
      data: [25, 30, 15, 10, 25, 30, 20, 15, 25, 30, 20, 15],
    },
  ];

  const metricCardData = [
    {
      title: 'Total Scope 3 Emissions',
      name: 'Emissions per year',
      value: 23450,
      suffixUnit: 'tCO2e',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-12',
    },
  ];

  const siteChartCategories = [
    'Site 1',
    'Site 2',
    'Site 3',
    'Site 4',
    'Site 5',
    'Site 6',
    'Site 7',
  ];
  const siteChartSeries = [30, 20, 50, 60, 30, 40, 25];

  const emissionChartCategories = [
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
  const emissionChartSeries = [
    {
      name: 'emission',
      data: [25, 30, 15, 10, 25, 30, 20, 15, 25, 30, 20, 15],
    },
  ];

  return (
    <div>
      <OpsDataCard cardData={metricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="area"
            cardClass=""
            title=" "
            categories={scope3ChartCategories}
            series={scope3ChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="donut"
            cardClass=""
            title="Site-wise breakdown"
            categories={siteChartCategories}
            series={siteChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Emission Trends"
            categories={emissionChartCategories}
            series={emissionChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
    </div>
  );
}
