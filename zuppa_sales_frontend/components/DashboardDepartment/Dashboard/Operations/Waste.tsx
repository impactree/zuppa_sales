import OpsDataCard from '@/components/Cards/OpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { SlEnergy } from 'react-icons/sl';

export default function Waste() {
  const wasteChartCategories = [
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
  const wasteChartSeries = [
    {
      name: 'Scope 3 Data',
      data: [25, 30, 15, 10, 25, 30, 20, 15, 25, 30, 20, 15],
    },
  ];

  const metricCardData = [
    {
      title: 'Waste Generation Trends',
      name: 'tonnes per year',
      value: 4750.41,
      suffixUnit: 'tonnes',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-12',
    },
  ];

  const wastemetricCardData = [
    {
      title: 'Waste Disposal Trends',
      name: 'tonnes per year',
      value: 4750.41,
      suffixUnit: 'tonnes',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
    {
      title: 'Waste Recovery Trends',
      name: 'tonnes per year',
      value: 4750.41,
      suffixUnit: 'tonnes',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
  ];

  const disposalChartCategories = [
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
  const disposalChartSeries = [
    {
      name: 'Disposal',
      data: [25, 30, 15, 10, 25, 30, 20, 15, 25, 30, 20, 15],
    },
  ];

  const recoveryChartCategories = [
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
  const recoveryChartSeries = [
    {
      name: 'Recovery',
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
            categories={wasteChartCategories}
            series={wasteChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <OpsDataCard cardData={wastemetricCardData} isFilters isValueFilter />

      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={disposalChartCategories}
            series={disposalChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={recoveryChartCategories}
            series={recoveryChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
    </div>
  );
}
