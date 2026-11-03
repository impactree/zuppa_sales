import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function BioDiversity() {
  const operationsCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'No. of Locations',
      cardValue: 1065,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Locations with Environmental Clearance',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
  ];
  const operationsImpactChartCategories = [
    'Critically Endangered',
    'Endangered',
    'Vulnerable ',
    'Near threatened',
    'Least concerned',
  ];
  const operationsImpactChartSeries = [
    {
      name: 'Operations Impact',
      data: [100000, 140000, 180000, 60000, 120000],
    },
  ];

  return (
    <div>
      <IndicatorHeader title="Operations in Ecologically Sensitive Areas" />
      <NonOpsDataCard cardData={operationsCarddata} />
      <IndicatorHeader title="Operations' impact on IUCN Red List species" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Customer Complaints By Category"
            categories={operationsImpactChartCategories}
            series={operationsImpactChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
    </div>
  );
}
