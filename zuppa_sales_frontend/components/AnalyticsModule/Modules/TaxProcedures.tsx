import { CustomAccordion } from '@/components/Accordion/CustomAccordion';
import NonOpsDataCard from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function TaxProcedures() {
  const taxProceduresCardData = [
    {
      cardTitle: 'Total Tax Jurisdictions',
      cardValue: 12,
    },
    {
      cardTitle: 'Total Manpower Count',
      cardValue: 50,
    },
    {
      cardTitle: 'Revenue from third-party sales (Rs.)',
      cardValue: 20,
    },
    {
      cardTitle: 'Revenue from Intra-group transactions (Rs.)',
      cardValue: 25,
    },
    {
      cardTitle: 'Profit / Loss before Tax (Rs.)',
      cardValue: 15,
    },
    {
      cardTitle: 'Tangible Assets other than cash (Rs.)',
      cardValue: 35,
    },
    {
      cardTitle: 'Corporate Income Tax (Cash Basis) (Rs.)',
      cardValue: 10,
    },
    {
      cardTitle: 'Income Tax Accrual (Profit / Loss) (Rs.)',
      cardValue: 30,
    },
  ];
  const taxJurisdictionCardData = [
    {
      cardTitle: 'Number of Employees',
      cardValue: 18,
    },
    {
      cardTitle: 'Profit / Loss before Tax (Rs.)',
      cardValue: 50,
    },
  ];
  const revenueCategoryChartCategories = [
    'Third party sales Revenue',
    'Intra-group transactions Revenue',
  ];
  const revenueCategoryChartSeries = [
    {
      name: 'Revenues',
      data: [10, 15],
    },
  ];
  const incomeTaxChartCategories = ['Cash Basis', 'Accrued on Profit/Loss'];
  const incomeTaxChartSeries = [
    {
      name: 'Income Tax',
      data: [10, 15],
    },
  ];
  return (
    <div>
      <NonOpsDataCard cardData={taxProceduresCardData} />
      <CustomAccordion accordionText="Tax Jurisdiction" rightHeader>
        <div className="p-3" style={{ background: 'var(--bgColor)' }}>
          <NonOpsDataCard cardData={taxJurisdictionCardData} />
          <div className="row">
            <div className="col-lg-6">
              <Chart
                type="bar"
                cardClass=""
                title="Revenue Category"
                categories={revenueCategoryChartCategories}
                series={revenueCategoryChartSeries}
              />
            </div>
            <div className="col-lg-6">
              <Chart
                type="bar"
                cardClass=""
                title="Income Tax Category"
                categories={incomeTaxChartCategories}
                series={incomeTaxChartSeries}
              />
            </div>
          </div>
        </div>
      </CustomAccordion>
    </div>
  );
}
