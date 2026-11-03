import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import OpsDataCard, { IOpsCardDta } from '@/components/Cards/OpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { SlEnergy } from 'react-icons/sl';

export default function FuelAndRefrigerantUse() {
  const fuelExpenditureCombustionChartCategories = [
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
  const fuelExpenditureCombustionChartSeries = [
    {
      name: 'Combussion',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
  ];

  const metricCardData: IOpsCardDta[] = [
    {
      title: 'Overall Fuel Consumption',
      name: 'Petrol',
      value: 23450,
      suffixUnit: 'Liters',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Overall Fuel Expenditure',
      name: 'Diesel',
      value: 1523004,
      prefixUnit: '₹',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Overall Fugitive Emissions',
      name: 'R134-a',
      value: 1450,
      suffixUnit: 'tCO2e',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
  ];

  const pieCategories = ['Fuel 1', 'Fuel 2', 'Fuel 3'];
  const pieSeries = [50, 60, 30];
  const pieCategories2 = ['Fuel 1', 'Fuel 2', 'Fuel 3', 'Fuel 4'];
  const pieSeries2 = [50, 60, 30, 20];
  return (
    <div>
      <OpsDataCard cardData={metricCardData} isFilters isValueFilter />
      <IndicatorHeader title="Stationary Combustion" />
      <div className="row">
        <div className="col-lg-9">
          <Chart
            type="bar"
            cardClass=""
            title="Fuel Expenditure Combustion"
            categories={fuelExpenditureCombustionChartCategories}
            series={fuelExpenditureCombustionChartSeries}
            isFilters
            isLocationFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-3">
          <Chart
            type="pie"
            cardClass=""
            title="Fuel expenditure breakdown"
            categories={pieCategories}
            series={pieSeries}
            isFilters
            isLocationFilter
            isValueFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Fuel Expenditure Combustion"
            categories={fuelExpenditureCombustionChartCategories}
            series={fuelExpenditureCombustionChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Fuel Expenditure Combustion"
            categories={fuelExpenditureCombustionChartCategories}
            series={fuelExpenditureCombustionChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      {/* Pie Chart */}
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="pie"
            cardClass=""
            title="Fuel Consumption Breakdown (by Mass)"
            categories={pieCategories}
            series={pieSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="pie"
            cardClass=""
            title="Fuel Consumption Breakdown (by Volume)"
            categories={pieCategories}
            series={pieSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Fugitive Emissions" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Fuel Expenditure Combustion"
            categories={fuelExpenditureCombustionChartCategories}
            series={fuelExpenditureCombustionChartSeries}
            isFilters
            isLocationFilter
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Mobile Combustion" />
      <div className="row">
        <div className="col-lg-9">
          <Chart
            type="bar"
            cardClass=""
            title="Fuel Expenditure Combustion"
            categories={fuelExpenditureCombustionChartCategories}
            series={fuelExpenditureCombustionChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-3">
          <Chart
            type="pie"
            cardClass=""
            title="Fuel expenditure breakdown"
            categories={pieCategories}
            series={pieSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Fuel Expenditure Combustion"
            categories={fuelExpenditureCombustionChartCategories}
            series={fuelExpenditureCombustionChartSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Fuel Expenditure Combustion"
            categories={fuelExpenditureCombustionChartCategories}
            series={fuelExpenditureCombustionChartSeries}
            isFilters
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
            title="Fuel Consumption Breakdown (by Mass)"
            categories={pieCategories2}
            series={pieSeries2}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="pie"
            cardClass=""
            title="Fuel Consumption Breakdown (by Volume)"
            categories={pieCategories2}
            series={pieSeries2}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
    </div>
  );
}
