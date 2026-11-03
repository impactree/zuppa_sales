import OpsDataCard from '@/components/Cards/OpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { SlEnergy } from 'react-icons/sl';

export default function Scope1() {
  const scope1ChartCategories = [
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
  const scope1ChartSeries = [
    {
      name: 'Stationary Combustion',
      data: [25, 30, 15, 10, 25, 30, 20, 15, 25, 30, 20, 15],
    },
    {
      name: 'Mobile Combustion',
      data: [15, 20, 5, 30, 15, 20, 10, 20, 10, 20, 40, 35],
    },
    {
      name: 'Fugitive Emissions',
      data: [5, 10, 25, 30, 20, 10, 30, 10, 20, 10, 20, 45],
    },
  ];

  const metricCardData = [
    {
      title: 'Total Scope 1 Emissions',
      name: 'Emissions per year',
      value: 23450,
      suffixUnit: 'tCO2e',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-12',
    },
  ];

  const fuelmetricCardData = [
    {
      title: 'Total Fuel Usage',
      name: 'Petrol per year',
      value: 23450,
      suffixUnit: 'Liters',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
    {
      title: 'Total Fuel Expenditure',
      name: 'Petrol per year',
      value: 1523004,
      suffixUnit: '₹',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
  ];

  const fuelusageChartCategories = [
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
  const fuelusageChartSeries = [
    {
      name: 'Diesel',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
    {
      name: 'Petrol',
      data: [15, 20, 5, 30, 15, 20, 10, 20, 10, 20, 40, 35],
    },
    {
      name: 'CNG',
      data: [5, 10, 25, 30, 20, 10, 30, 10, 20, 10, 20, 45],
    },
    {
      name: 'LPG',
      data: [20, 15, 35, 40, 15, 40, 45, 25, 15, 10, 20, 15],
    },
  ];

  const fuelexpendChartCategories = [
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
  const fuelexpendChartSeries = [
    {
      name: 'Diesel',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
    {
      name: 'Petrol',
      data: [15, 20, 5, 30, 15, 20, 10, 20, 10, 20, 40, 35],
    },
    {
      name: 'CNG',
      data: [5, 10, 25, 30, 20, 10, 30, 10, 20, 10, 20, 45],
    },
    {
      name: 'LPG',
      data: [20, 15, 35, 40, 15, 40, 45, 25, 15, 10, 20, 15],
    },
  ];

  const pieCategories = [
    'Diesel',
    'Petrol',
    'CNG',
    'LPG',
    'Fuel 5',
    'Fuel 6',
    'Fuel 7',
  ];
  const pieSeries = [30, 20, 50, 60, 30, 40, 70];

  return (
    <div>
      <OpsDataCard cardData={metricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={scope1ChartCategories}
            series={scope1ChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>

      <OpsDataCard cardData={fuelmetricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="area"
            cardClass=""
            title=" "
            categories={fuelusageChartCategories}
            series={fuelusageChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={fuelexpendChartCategories}
            series={fuelexpendChartSeries}
            isFilters
            isStacked
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="pie"
            cardClass=""
            title="Fuel Usage Breakdown"
            categories={pieCategories}
            series={pieSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="donut"
            cardClass=""
            title="Fuel Expenditure Breakdown"
            categories={pieCategories}
            series={pieSeries}
            isFilters
            isStacked
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
    </div>
  );
}
