import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import OpsDataCard, { IOpsCardDta } from '@/components/Cards/OpsDataCard';
import Chart, { IMetricData } from '@/components/Charts/Chart';
import React from 'react';
import { SlEnergy } from 'react-icons/sl';

export default function ProductBasedEmissions() {
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

  const metricChartData: IMetricData = {
    name: 'Emissions',
    value: 23450,
    suffixUnit: 'tCO2e',
    icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
  };

  const metricChartData2: IMetricData = {
    name: 'Emissions',
    value: 12450,
    suffixUnit: 'tCO2e',
    icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
  };

  const ExpendituremetricChartData: IMetricData = {
    name: 'Expenditure',
    value: 1523004,
    prefixUnit: '₹',
    icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
  };

  const GoodsmetricChartData1: IMetricData = {
    name: 'Emissions',
    value: 12000,
    suffixUnit: 'tCO2e',
    icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
  };
  const GoodsmetricChartData2: IMetricData = {
    name: 'Emissions',
    value: 4000,
    suffixUnit: 'tCO2e',
    icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
  };

  const ExpenditureCapitalGoodsmetricChartData: IMetricData = {
    name: 'Expenditure',
    value: 1023000,
    prefixUnit: '₹',
    icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
  };

  const processingOfSoldEmissionmetricChartData: IMetricData = {
    name: 'Emissions',
    value: 10000,
    suffixUnit: 'tCO2e',
    icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
  };

  const UseOfSoldmetricChartData: IMetricData = {
    name: 'Emissions',
    value: 2000,
    suffixUnit: 'tCO2e',
    icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
  };

  const EolmetricChartData1: IMetricData = {
    name: 'Emissions',
    value: 5000,
    suffixUnit: 'tCO2e',
    icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
  };
  const EolmetricChartData2: IMetricData = {
    name: 'Emissions',
    value: 1500,
    suffixUnit: 'tCO2e',
    icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
  };

  const wastemetricCardData: IOpsCardDta[] = [
    {
      title: 'Waste Generation Trends',
      name: 'Tonnes per year',
      value: 4750.41,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Waste Disposal Trends',
      name: 'Tonnes per year',
      value: 4150,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Waste Recovery Trends',
      name: 'Tonnes per year',
      value: 3500,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
  ];

  const pieCategories = ['Fuel 1', 'Fuel 2', 'Fuel 3'];
  const pieSeries = [50, 60, 30];

  return (
    <div>
      <IndicatorHeader title=" Purchased Goods and Services" />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Total Emissions from Goods and Services"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isMetric
            metricData={metricChartData}
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Supplier-wise Breakdown of Emissions"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isMetric
            metricData={metricChartData2}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Total Expenditure for Goods and Services"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isMetric
            metricData={ExpendituremetricChartData}
          />
        </div>
      </div>

      <IndicatorHeader title="Capital Goods" />

      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Total Emissions from Capital Goods"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isMetric
            metricData={GoodsmetricChartData1}
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Supplier-wise Breakdown of Emissions"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isMetric
            metricData={GoodsmetricChartData2}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Total Expenditure for Capital Goods"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isMetric
            metricData={ExpenditureCapitalGoodsmetricChartData}
          />
        </div>
      </div>

      <IndicatorHeader title="Waste Generated in Operations" />

      <OpsDataCard cardData={wastemetricCardData} isFilters isValueFilter />

      <IndicatorHeader title="Processing of Sold Products" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Total Processing Emissions Trends"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isMetric
            metricData={processingOfSoldEmissionmetricChartData}
          />
        </div>
      </div>

      <IndicatorHeader title="Use of Sold Products" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Total Emissions from Product Use Trends"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isMetric
            metricData={UseOfSoldmetricChartData}
          />
        </div>
      </div>

      <IndicatorHeader title="End of Life Treatment of Products" />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="pie"
            cardClass=""
            title="EOL Treatment Methods Breakdown"
            categories={pieCategories}
            series={pieSeries}
            isMetric
            metricData={EolmetricChartData1}
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Total Emissions from Product Disposal Over Time"
            categories={UnitsPurchasedTrendsChartCategories}
            series={UnitsPurchasedTrendsChartSeries}
            isMetric
            metricData={EolmetricChartData2}
          />
        </div>
      </div>
    </div>
  );
}
