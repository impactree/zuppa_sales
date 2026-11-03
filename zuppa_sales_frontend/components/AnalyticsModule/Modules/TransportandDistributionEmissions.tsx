import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import OpsDataCard, { IOpsCardDta } from '@/components/Cards/OpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { SlEnergy } from 'react-icons/sl';

export default function PurchasedPower() {
  const FuelConsumptionTrendsChartCategories = [
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
  const FuelConsumptionTrendsChartSeries = [
    {
      name: 'Consumption Trends',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
  ];

  const metricCardData: IOpsCardDta[] = [
    {
      title: 'Overall Fuel Consumption',
      name: 'Petrol',
      value: 23756,
      suffixUnit: 'Litres',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
    {
      title: 'Overall Fuel Expenditure',
      name: 'Diesel',
      value: 113650,
      prefixUnit: '₹',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
  ];

  const upstreamMetricCardData: IOpsCardDta[] = [
    {
      title: 'Fuel Consumption',
      name: 'Petrol',
      value: 12756,
      suffixUnit: 'Litres',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
    {
      title: 'Fuel Expenditure',
      name: 'Diesel',
      value: 98700,
      prefixUnit: '₹',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
  ];

  const downstreamMetricCardData: IOpsCardDta[] = [
    {
      title: 'Fuel Consumption',
      name: 'Petrol',
      value: 18700,
      suffixUnit: 'Litres',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
    {
      title: 'Fuel Expenditure',
      name: 'Diesel',
      value: 90000,
      prefixUnit: '₹',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
  ];

  const travelMetricCardData: IOpsCardDta[] = [
    {
      title: 'Distance Travelled',
      name: 'By Air',
      value: 16500,
      suffixUnit: 'Km',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
    {
      title: 'Fuel Consumption',
      name: 'Petrol',
      value: 12000,
      suffixUnit: 'Litres',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
  ];

  const employeeMetricCardData: IOpsCardDta[] = [
    {
      title: 'Distance Travelled',
      name: 'By Air',
      value: 21000,
      suffixUnit: 'Km',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
    {
      title: 'Employee Information',
      name: 'By Air',
      value: 2457,
      suffixUnit: 'Employees',
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-6',
    },
  ];

  const pieCategories = ['Fuel 1', 'Fuel 2', 'Fuel 3', 'Fuel 4', 'Fuel 5'];
  const pieSeries = [50, 60, 30, 40, 70];

  return (
    <div>
      <OpsDataCard cardData={metricCardData} isFilters isValueFilter />
      <IndicatorHeader title="Upstream Transport and Distribution" />
      <OpsDataCard cardData={upstreamMetricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Fuel Consumption Trends"
            categories={FuelConsumptionTrendsChartCategories}
            series={FuelConsumptionTrendsChartSeries}
            isStacked
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Expenditure on Fuel Trends"
            categories={FuelConsumptionTrendsChartCategories}
            series={FuelConsumptionTrendsChartSeries}
            isStacked
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      {/* Pie Chart */}
      <div className="row">
        <div className="col-lg-4">
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
        <div className="col-lg-4">
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
        <div className="col-lg-4">
          <Chart
            type="pie"
            cardClass=""
            title="Fuel Expenditure Breakdown"
            categories={pieCategories}
            series={pieSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>

      <IndicatorHeader title="Downstream Transport and Distribution" />
      <OpsDataCard
        cardData={downstreamMetricCardData}
        isFilters
        isValueFilter
      />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Fuel Consumption Trends"
            categories={FuelConsumptionTrendsChartCategories}
            series={FuelConsumptionTrendsChartSeries}
            isStacked
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Expenditure on Fuel Trends"
            categories={FuelConsumptionTrendsChartCategories}
            series={FuelConsumptionTrendsChartSeries}
            isStacked
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
      {/* Pie Chart */}
      <div className="row">
        <div className="col-lg-4">
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
        <div className="col-lg-4">
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
        <div className="col-lg-4">
          <Chart
            type="pie"
            cardClass=""
            title="Fuel Expenditure Breakdown"
            categories={pieCategories}
            series={pieSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>

      <IndicatorHeader title="Business Travel" />
      <OpsDataCard cardData={travelMetricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Distance Travelled Trends"
            categories={FuelConsumptionTrendsChartCategories}
            series={FuelConsumptionTrendsChartSeries}
            isStacked
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Fuel Consumption Trends"
            categories={FuelConsumptionTrendsChartCategories}
            series={FuelConsumptionTrendsChartSeries}
            isStacked
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
            title="Fuel Consumption Breakdown (by Volume)"
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
            title="Fuel Consumption Breakdown (by Mass)"
            categories={pieCategories}
            series={pieSeries}
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>

      <IndicatorHeader title="Employee Commuting" />
      <OpsDataCard cardData={employeeMetricCardData} isFilters isValueFilter />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Employee Travelling Trends"
            categories={FuelConsumptionTrendsChartCategories}
            series={FuelConsumptionTrendsChartSeries}
            isStacked
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Distance Travelled Trends"
            categories={FuelConsumptionTrendsChartCategories}
            series={FuelConsumptionTrendsChartSeries}
            isStacked
            isFilters
            isTimeFrequencyFilter
            isValueFilter
          />
        </div>
      </div>
    </div>
  );
}
