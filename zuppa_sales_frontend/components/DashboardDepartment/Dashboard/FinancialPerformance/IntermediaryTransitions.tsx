import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { CustomAccordion } from '@/components/Accordion/CustomAccordion';

export default function CSRProjects() {
  const purchaseCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Purchases (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-12',
    },
    {
      cardTitle: 'Purchases from trading houses (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Number of trading houses',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Purchases from top 10 trading houses (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
  ];

  const purchaseChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];

  const purchaseChartSeries = [
    {
      name: 'Total Purchases (in Rs.)',
      data: [10, 15, 10, 5],
    },
    {
      name: 'Purchases from trading houses',
      data: [20, 30, 15, 10],
    },
    {
      name: 'Purchases from top 10 trading houses ',
      data: [5, 20, 25, 15],
    },
  ];

  const salesChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];

  const salesChartSeries = [
    {
      name: 'Total Sales (in Rs.)',
      data: [10, 15, 10, 5],
    },
    {
      name: 'Sales to dealers / distributors',
      data: [20, 30, 15, 10],
    },
    {
      name: 'Sales to top 10 dealers / distributors',
      data: [5, 20, 25, 15],
    },
  ];

  const salesCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Sales (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-12',
    },
    {
      cardTitle: 'Sales to dealers / distributors (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Number of dealers / distributors',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Sales to top 10 dealers / distributors (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
  ];

  const purchasesrelatedCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Purchases with related parties',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: '% of total purchases',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
  ];

  const purchasesrelatedChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];

  const purchasesrelatedChartSeries = [
    {
      name: 'Total Purchases',
      data: [10, 15, 10, 5],
    },
    {
      name: 'Purchases with related parties',
      data: [20, 30, 15, 10],
    },
  ];

  const salesrelatedCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Sales with related parties',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: '% of total Sales',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
  ];

  const salesrelatedChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];

  const salesrelatedChartSeries = [
    {
      name: 'Total Sales',
      data: [10, 15, 10, 5],
    },
    {
      name: 'Sales to related parties',
      data: [20, 30, 15, 10],
    },
  ];

  const loanCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Loans & advances',
      cardValue: 18,
      cardColumn: 'col-lg-12',
    },
    {
      cardTitle: 'Loans & advances Related parties',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: '% of Loans & advances',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
  ];

  const loanChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];

  const loanChartSeries = [
    {
      name: 'Total loans & advances',
      data: [10, 15, 10, 5],
    },
    {
      name: 'Loans & advances given to related parties',
      data: [20, 30, 15, 10],
    },
  ];

  const investmentCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Investments',
      cardValue: 18,
      cardColumn: 'col-lg-12',
    },
    {
      cardTitle: 'Investments Related parties',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: '% of Investments',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
  ];

  const investmentChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];

  const investmentChartSeries = [
    {
      name: 'Total Investments',
      data: [10, 15, 10, 5],
    },
    {
      name: 'Investments in related parties',
      data: [20, 30, 15, 10],
    },
  ];

  return (
    <div>
      <div className="mt-3">
        <CustomAccordion
          accordionText="Purchases from Trading houses"
          rightHeader
        >
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={purchaseCarddata} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="area"
                  cardClass=""
                  title=" "
                  categories={purchaseChartCategories}
                  series={purchaseChartSeries}
                  isFilters
                  isTimeFrequencyFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
      <div className="mt-3 mb-3">
        <CustomAccordion
          accordionText="Sales to dealers / distributors"
          rightHeader
        >
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={salesCarddata} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="area"
                  cardClass=""
                  title=" "
                  categories={salesChartCategories}
                  series={salesChartSeries}
                  isFilters
                  isTimeFrequencyFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
      <IndicatorHeader title="Share of Related Party Transactions" />
      <div className="mt-3">
        <CustomAccordion accordionText="Purchases" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={purchasesrelatedCarddata} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="area"
                  cardClass=""
                  title=" "
                  categories={purchasesrelatedChartCategories}
                  series={purchasesrelatedChartSeries}
                  isFilters
                  isTimeFrequencyFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>

      <div className="mt-3">
        <CustomAccordion accordionText="Sales" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={salesrelatedCarddata} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title=" "
                  categories={salesrelatedChartCategories}
                  series={salesrelatedChartSeries}
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
        <CustomAccordion accordionText=" Loans & advances" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={loanCarddata} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="area"
                  cardClass=""
                  title=" "
                  categories={loanChartCategories}
                  series={loanChartSeries}
                  isFilters
                  isTimeFrequencyFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>

      <div className="mt-3">
        <CustomAccordion accordionText="Investments" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <NonOpsDataCard cardData={investmentCarddata} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title=" "
                  categories={investmentChartCategories}
                  series={investmentChartSeries}
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
