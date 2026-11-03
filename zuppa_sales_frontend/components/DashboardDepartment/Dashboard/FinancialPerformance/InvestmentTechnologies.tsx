import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { CustomAccordion } from '@/components/Accordion/CustomAccordion';

export default function InvestmentTechnologies() {
  const capexCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total CAPEX',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Sustainable CAPEX',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% of Sustainable CAPEX',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
  ];

  const capexChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];

  const capexChartSeries = [
    {
      name: 'Sustainable Investment',
      data: [10, 15, 10, 5],
    },
    {
      name: 'Capex',
      data: [20, 30, 15, 10],
    },
  ];

  const rdCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total R&D',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Sustainable R&D',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% of Sustainable R&D',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
  ];

  const rdChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];

  const rdChartSeries = [
    {
      name: 'Sustainable Investment',
      data: [10, 15, 10, 5],
    },
    {
      name: 'R&D',
      data: [20, 30, 15, 10],
    },
  ];

  return (
    <div>
      <div className="mt-3">
        <CustomAccordion accordionText="CAPEX" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={capexCarddata} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title=" "
                  categories={capexChartCategories}
                  series={capexChartSeries}
                  isFilters
                  isTimeFrequencyFilter
                  isStacked
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>

      <div className="mt-3">
        <CustomAccordion accordionText="R&D" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={rdCarddata} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title=" "
                  categories={rdChartCategories}
                  series={rdChartSeries}
                  isFilters
                  isTimeFrequencyFilter
                  isStacked
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
    </div>
  );
}
