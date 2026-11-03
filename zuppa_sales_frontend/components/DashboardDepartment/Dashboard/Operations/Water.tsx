import OpsDataCard from '@/components/Cards/OpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { SlEnergy } from 'react-icons/sl';

export default function Water() {
  const waterChartCategories = [
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
  const waterChartSeries = [
    {
      name: 'water',
      data: [25, 30, 15, 10, 25, 30, 20, 15, 25, 30, 20, 15],
    },
  ];

  const metricCardData = [
    {
      title: 'Water Consumption Trends',
      name: 'Liters per year',
      value: 4750.41,
      suffixUnit: 'Liters',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-12',
    },
  ];

  const watermetricCardData = [
    {
      title: 'Water Withdrawal Trends',
      name: 'Liters per year',
      value: 4750.41,
      suffixUnit: 'Liters',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
    {
      title: 'Water Discharge Trends',
      name: 'Liters per year',
      value: 4750.41,
      suffixUnit: 'Liters',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
  ];

  const withdrawalChartCategories = [
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
  const withdrawalChartSeries = [
    {
      name: 'Withdrawal',
      data: [25, 30, 15, 10, 25, 30, 20, 15, 25, 30, 20, 15],
    },
  ];

  const dischargeChartCategories = [
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
  const dischargeChartSeries = [
    {
      name: 'Disposal',
      data: [25, 30, 15, 10, 25, 30, 20, 15, 25, 30, 20, 15],
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
            title=" "
            categories={waterChartCategories}
            series={waterChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <OpsDataCard cardData={watermetricCardData} isFilters isValueFilter />

      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="area"
            cardClass=""
            title=" "
            categories={withdrawalChartCategories}
            series={withdrawalChartSeries}
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
            categories={dischargeChartCategories}
            series={dischargeChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
    </div>
  );
}
