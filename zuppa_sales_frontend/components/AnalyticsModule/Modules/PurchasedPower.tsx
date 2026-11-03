import OpsDataCard, { IOpsCardDta } from '@/components/Cards/OpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { SlEnergy } from 'react-icons/sl';

export default function PurchasedPower() {
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
      title: 'Total Units of Energy Purchased',
      name: 'Electricity',
      value: 133756,
      suffixUnit: 'kWh',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
    {
      title: 'Total Expenditure on Purchased Energy',
      name: 'Steam',
      value: 23650,
      prefixUnit: '₹',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
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
            title="Units Purchased Trends"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isStacked
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Expenditure on Energy Trends"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
    </div>
  );
}
