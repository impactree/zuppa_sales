import OpsDataCard from '@/components/Cards/OpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { SlEnergy } from 'react-icons/sl';

export default function OrganizationOverview() {
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
      name: 'Scope 1 emissions',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
  ];

  const metricCardData = [
    {
      name: 'Stationary Combustion',
      title: 'Direct Emissions (Scope 1)',
      value: 23675,
      suffixUnit: 'tCO2e',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      name: 'Mobile Combustion',
      title: 'Direct Emissions (Scope 1)',
      value: 145343,
      suffixUnit: 'tCO2e',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      name: 'Fugitive Emissions',
      title: 'Direct Emissions (Scope 1)',
      value: 2000,
      suffixUnit: 'tCO2e',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
  ];

  const scope2metricCardData = [
    {
      title: 'Indirect Emissions (Scope 2)',
      name: 'Energy Consumption',
      value: 23675,
      suffixUnit: 'tCO2e',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-12',
    },
  ];

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
      name: 'Scope 2 emissions',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
  ];

  const scope3metricCardData = [
    {
      title: 'Indirect Emissions (Scope 3)',
      name: 'Transport based emissions',
      value: 23675,
      suffixUnit: 'tCO2e',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
    {
      title: 'Indirect Emissions (Scope 3)',
      name: 'Product based emissions',
      value: 23675,
      suffixUnit: 'tCO2e',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
  ];

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
      name: 'Scope 3 emissions',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
  ];

  const otheremissionsmetricCardData = [
    {
      title: 'Other Emissions',
      name: 'Air Emissions (NOx)',
      value: 202300,
      suffixUnit: 'tons',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-12',
    },
  ];

  const watermetricCardData = [
    {
      title: 'Water',
      name: 'Water withdrawal',
      value: 23675,
      suffixUnit: 'Liters',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Water',
      name: 'Water consumption',
      value: 23675,
      suffixUnit: 'Liters',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Water',
      name: 'Water discharge',
      value: 23675,
      suffixUnit: 'Liters',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
  ];

  const wastemetricCardData = [
    {
      title: 'Waste',
      name: 'Waste generation',
      value: 23675,
      suffixUnit: 'tonnes',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Waste',
      name: 'Waste discharge',
      value: 23675,
      suffixUnit: 'tonnes',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Waste',
      name: 'Waste recovery',
      value: 23675,
      suffixUnit: 'tonnes',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
  ];

  return (
    <div>
      <OpsDataCard cardData={metricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Scope 1 Historical Trends"
            categories={scope1ChartCategories}
            series={scope1ChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <OpsDataCard cardData={scope2metricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title="Scope 2 Historical Trends"
            categories={scope2ChartCategories}
            series={scope2ChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <OpsDataCard cardData={scope3metricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title="Scope 3 Historical Trends"
            categories={scope3ChartCategories}
            series={scope3ChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <OpsDataCard
        cardData={otheremissionsmetricCardData}
        isFilters
        isValueFilter
      />
      <OpsDataCard cardData={watermetricCardData} isFilters isValueFilter />
      <OpsDataCard cardData={wastemetricCardData} isFilters isValueFilter />
    </div>
  );
}
