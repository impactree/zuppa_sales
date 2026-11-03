import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function Procurement() {
  const materialCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Raw Materials (Rs.)',
      cardValue: 1065,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'MSMEs / Small producers Raw Materials (Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Raw Materials sourced in India (Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
  ];

  const materialChartCategories = [
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
  const materialChartSeries = [

    {
      name: 'MSMEs / small producers',
      data: [50, 60, 40, 50, 20, 10, 40, 50, 70, 60, 40, 20],
    },
    {
      name: 'Sourced within India',
      data: [25, 40, 30, 20, 40, 15, 20, 30, 40, 30, 20, 10],
    },
    {
      name: 'STotal Raw Materials',
      data: [15, 20, 10, 15, 25, 25, 30, 20, 30, 20, 10, 30],
    },
  ];
  const inputChartCategories = [
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
  const inputChartSeries = [

    {
      name: 'Input Material',
      data: [50, 60, 40, 50, 20, 10, 40, 50, 70, 60, 40, 20],
    },
  ];

  const valueCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'No. of VCP Assessed',
      cardValue: 1065,
      cardColumn: 'col-lg-12',
    },

  ];

  const valueChartCategories = [
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
  const valueChartSeries = [

    {
      name: 'Value cahin partners',
      data: [50, 60, 40, 50, 20, 10, 40, 50, 70, 60, 40, 20],
    },

  ];

  return (
    <div>

      <IndicatorHeader title="Material Sourcing" />
      <NonOpsDataCard cardData={materialCarddata} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="area"
            cardClass=""
            title="Workforce Safety Trends"
            categories={materialChartCategories}
            series={materialChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Recycled / Reused Input Material usage in Production" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Input Material Usage Trend"
            categories={inputChartCategories}
            series={inputChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Value Chain Partner Assessment" />
      <NonOpsDataCard cardData={valueCarddata} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={valueChartCategories}
            series={valueChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
    </div>
  );
}
