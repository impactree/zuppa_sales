import OpsDataCard from '@/components/Cards/OpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { SlEnergy } from 'react-icons/sl';

export default function Scope2() {
  const scope2ChartCategories = [
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
  const scope2ChartSeries = [
    {
      name: 'Scope 2 Data',
      data: [25, 30, 15, 10, 25, 30, 20, 15, 25, 30, 20, 15],
    },
  ];

  const metricCardData = [
    {
      title: 'Total Scope 2 Emissions',
      name: 'Emissions per year',
      value: 23450,
      suffixUnit: 'tCO2e',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-12',
    },
  ];

  const energymetricCardData = [
    {
      title: 'Total Energy Consumption',
      name: 'Electricity per year',
      value: 123456,
      suffixUnit: 'kWh',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-12',
    },
  ];

  const energyChartCategories = [
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
  const energyChartSeries = [
    {
      name: 'Electricity',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
    {
      name: 'Energy type 1',
      data: [15, 20, 5, 30, 15, 20, 10, 20, 10, 20, 40, 35],
    },
    {
      name: 'Energy type 2',
      data: [5, 10, 25, 30, 20, 10, 30, 10, 20, 10, 20, 45],
    },
    {
      name: 'Energy type 3',
      data: [20, 15, 35, 40, 15, 40, 45, 25, 15, 10, 20, 15],
    },
  ];

  const electrimetricCardData = [
    {
      title: 'Total Energy Expenditure',
      name: 'Electricity per year',
      value: 1523004,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-12',
    },
  ];

  const expendChartCategories = [
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
  const expendChartSeries = [
    {
      name: 'Electricity',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
    {
      name: 'Energy type 1',
      data: [15, 20, 5, 30, 15, 20, 10, 20, 10, 20, 40, 35],
    },
    {
      name: 'Energy type 2',
      data: [5, 10, 25, 30, 20, 10, 30, 10, 20, 10, 20, 45],
    },
    {
      name: 'Energy type 3',
      data: [20, 15, 35, 40, 15, 40, 45, 25, 15, 10, 20, 15],
    },
  ];

  const siteChartCategories = [
    'Site 1',
    'Site 2',
    'Site 3',
    'Site 4',
    'Site 5',
  ];
  const siteChartSeries = [30, 20, 50, 60, 30];

  return (
    <div>
      <OpsDataCard cardData={metricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="area"
            cardClass=""
            title=" "
            categories={scope2ChartCategories}
            series={scope2ChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>

      <OpsDataCard cardData={energymetricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={energyChartCategories}
            series={energyChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <OpsDataCard cardData={electrimetricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={expendChartCategories}
            series={expendChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
            isStacked
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="pie"
            cardClass=""
            title="Site-wise breakdown"
            categories={siteChartCategories}
            series={siteChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
    </div>
  );
}
