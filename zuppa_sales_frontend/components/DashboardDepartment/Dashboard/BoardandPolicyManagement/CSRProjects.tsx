import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function CSRProjects() {
  const projectCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'No. of CSR Projects',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Total No. of Beneficiaries',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% of Vulnerable Beneficiaries',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
  ];
  const projectChartCategories = [
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

  const projectChartSeries = [
    {
      name: 'Total beneficiaries',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Marginalized beneficiaries ',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  return (
    <div>
      <NonOpsDataCard cardData={projectCarddata} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Training Participation Rate"
            categories={projectChartCategories}
            series={projectChartSeries}
            isFilters
            isTimeFrequencyFilter
            isStacked
          />
        </div>
      </div>
    </div>
  );
}
