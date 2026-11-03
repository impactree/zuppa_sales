import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function Wellbeing() {
  const projectChartCategories = ['Employees', 'Workers'];

  const projectChartSeries = [
    {
      name: 'Employees',
      data: [10, 15],
    },
  ];

  const wellbeingChartCategories = [
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

  const wellbeingChartSeries = [
    {
      name: 'Health Insurance',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Accident Insurance',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
    {
      name: 'Maternity Benefits',
      data: [25, 10, 25, 30, 40, 25, 20, 15, 20, 10, 30, 25],
    },
    {
      name: 'Paternity Benefits',
      data: [5, 35, 5, 30, 30, 25, 40, 50, 15, 5, 20, 20],
    },
    {
      name: 'Death based Compensation',
      data: [10, 50, 45, 20, 30, 25, 30, 10, 15, 25, 20, 15],
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="col-lg-4">
          <Chart
            type="radialBar"
            cardClass=""
            title=""
            categories={['Health Insurance']}
            series={[70]}
            isFilters
          />
        </div>
        <div className="col-lg-4">
          <Chart
            type="radialBar"
            cardClass=""
            title=" "
            categories={['Accident Insurance']}
            series={[70]}
            isFilters
          />
        </div>
        <div className="col-lg-4">
          <Chart
            type="radialBar"
            cardClass=""
            title=" "
            categories={['Maternity Benefit']}
            series={[65]}
            isFilters
          />
        </div>
        <div className="col-lg-4">
          <Chart
            type="radialBar"
            cardClass=""
            title=" "
            categories={['Paternity Benefits']}
            series={[70]}
            isFilters
          />
        </div>
        <div className="col-lg-4">
          <Chart
            type="radialBar"
            cardClass=""
            title=" "
            categories={['Daycare Benefits']}
            series={[70]}
            isFilters
          />
        </div>
        <div className="col-lg-4">
          <Chart
            type="radialBar"
            cardClass=""
            title=" "
            categories={['Death Compensation']}
            series={[70]}
            isFilters
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={projectChartCategories}
            series={projectChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Well-Being Cost Incurred"
            categories={wellbeingChartCategories}
            series={wellbeingChartSeries}
            isFilters
            isTimeFrequencyFilter
            isStacked
          />
        </div>
      </div>
    </div>
  );
}
