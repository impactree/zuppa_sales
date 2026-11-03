import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { CustomAccordion } from '@/components/Accordion/CustomAccordion';

export default function GovernanceCommittee() {
  const committeeCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total number of Committees',
      cardValue: 18,
      cardColumn: 'col-lg-12',
    },
  ];
  const memmberCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Committee A Name Members',
      cardValue: 18,
      cardColumn: 'col-lg-12',
    },
  ];
  const committeeChartCategories = [
    'BOD Members',
    'KMP',
    'Employees other than KMP',
    'Workers',
  ];
  const committeeChartSeries = [
    {
      name: 'members',
      data: [10, 30, 20, 15],
    },
  ];

  return (
    <div>
      <NonOpsDataCard cardData={committeeCarddata} />

      <div className="mt-3">
        <CustomAccordion accordionText="Choose the Committee Name" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={memmberCarddata} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title=" "
                  categories={committeeChartCategories}
                  series={committeeChartSeries}
                  isFilters
                  isTimeFrequencyFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
    </div>
  );
}
