import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import SingleTextCard from '@/components/Cards/SingleTextCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import { CustomAccordion } from '@/components/Accordion/CustomAccordion';

export default function Finance() {
  const financialCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Revenue (in Rs.)',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Turnover (in Rs.)',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Net Worth (in Rs.)',
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Gross Profit (in Rs.)',
      cardValue: 5,
      cardColumn: 'col-lg-12',
    },
  ];
  const financialperformanceChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const financialperformanceChartSeries = [
    {
      name: 'Revenue',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Gross Profit',
      data: [15, 25, 20, 10],
    },
  ];
  const costincurredCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Operating costs (in Rs.)',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Employee wages and benefits (in Rs.)',
      cardValue: 15,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Payments to providers of capital (in Rs.)',
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Payments to government (in Rs.)',
      cardValue: 5,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Community investments (in Rs.)',
      cardValue: 5,
      cardColumn: 'col-lg-6',
    },
  ];

  const costincurredChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const costincurredChartSeries = [
    {
      name: 'Operating costs (in Rs.)',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Employee wages and benefits (in Rs.)',
      data: [15, 25, 20, 10],
    },
    {
      name: 'Payments to providers of capital (in Rs.)',
      data: [20, 35, 25, 20],
    },
    {
      name: 'Payments to government (in Rs.)',
      data: [20, 15, 30, 35],
    },
    {
      name: 'Community investments (in Rs.)',
      data: [35, 15, 10, 20],
    },
  ];

  const costrevenueChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];

  const costrevenueChartSeries = [
    {
      name: 'Cost',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Revenue',
      data: [15, 25, 20, 10],
    },
  ];
  const exportCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Amount of Exports  (in Rs.)',
      cardValue: 20,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Exports (% of Turnover)',
      cardValue: 15,
      cardColumn: 'col-lg-6',
    },
  ];

  const exportChartCategories = [
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
  const exportChartSeries = [
    {
      name: 'Exports',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
  ];

  const accountCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Days of accounts payable',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Accounts payable (Rs))',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Procurement cost (Rs)',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
  ];

  const accountPayableChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];

  const accountPayableChartSeries = [
    {
      name: 'Accounts Payable (in Rs.)',
      data: [10, 15, 10, 5],
    },
    {
      name: 'Cost of goods/services procured (in Rs.)',
      data: [20, 35, 25, 20],
    },
  ];
  const accountPayableDaysChartSeries = [
    {
      name: 'Number of days of Accounts Payable (in Rs.)',
      data: [10, 15, 10, 5],
    },
  ];

  const productCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Environmental & social parameters',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Safe and responsible usage',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Recycling and/or safe disposal',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
  ];

  const productChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const productChartSeries = [
    {
      name: 'Environmental & social parameters',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Safe and responsible usage',
      data: [15, 25, 20, 10],
    },
    {
      name: 'Recycling and/or safe disposal',
      data: [20, 35, 25, 20],
    },
  ];

  const purchaseCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Purchases (in Rs.)',
      cardValue: 12,
      cardColumn: 'col-lg-12',
    },
    {
      cardTitle: 'Purchases from trading houses (in Rs.)',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Number of trading houses',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Purchases from top 10 trading houses (in Rs.)',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
  ];
  const purchaseChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const purchaseChartSeries = [
    {
      name: 'Total Purchases (in Rs.)',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Purchases from trading houses',
      data: [15, 25, 20, 10],
    },
    {
      name: 'Purchases from top 10 trading houses ',
      data: [20, 35, 25, 20],
    },
  ];

  const salesCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Sales (in Rs.)',
      cardValue: 12,
      cardColumn: 'col-lg-12',
    },
    {
      cardTitle: 'Sales to dealers / distributors (in Rs.)',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Number of dealers / distributors',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Sales to top 10 dealers / distributors (in Rs.)',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
  ];
  const salesChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const salesChartSeries = [
    {
      name: 'Total Sales (in Rs.)',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Sales to dealers / distributors (in Rs.)',
      data: [15, 25, 20, 10],
    },
    {
      name: 'Number of dealers / distributors',
      data: [20, 35, 25, 20],
    },
    {
      name: 'Sales to top 10 dealers / distributors (in Rs.)',
      data: [10, 25, 15, 30],
    },
  ];

  const sharelatedCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Purchases with related parties',
      cardValue: 12,
      cardColumn: 'col-lg-3',
    },
    {
      cardTitle: '% of total purchases',
      cardValue: 12,
      cardColumn: 'col-lg-3',
    },
    {
      cardTitle: 'Sales with related parties',
      cardValue: 12,
      cardColumn: 'col-lg-3',
    },
    {
      cardTitle: '% of total Sales',
      cardValue: 12,
      cardColumn: 'col-lg-3',
    },
  ];

  const shareareaChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const shareareaChartSeries = [
    {
      name: 'Total Purchases',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Purchases with related parties',
      data: [15, 25, 20, 10],
    },
  ];

  const sharebarChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const sharebarChartSeries = [
    {
      name: 'Total Sales',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Sales to related parties',
      data: [15, 25, 20, 10],
    },
  ];

  const loansCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Loans & advances',
      cardValue: 12,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Total Investments',
      cardValue: 12,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Loans & advances Related parties',
      cardValue: 12,
      cardColumn: 'col-lg-3',
    },
    {
      cardTitle: '% of Loans & advances',
      cardValue: 12,
      cardColumn: 'col-lg-3',
    },
    {
      cardTitle: 'Investments Related parties',
      cardValue: 12,
      cardColumn: 'col-lg-3',
    },
    {
      cardTitle: '% of Investments',
      cardValue: 12,
      cardColumn: 'col-lg-3',
    },
  ];

  const loanChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const loanChartSeries = [
    {
      name: 'Total loans & advances',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Loans & advances given to related parties',
      data: [15, 25, 20, 10],
    },
  ];

  const investmentChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const investmentbarChartSeries = [
    {
      name: 'Total Investments',
      data: [25, 30, 15, 10],
    },
    {
      name: 'Investments in related parties',
      data: [15, 25, 20, 10],
    },
  ];

  const financialassistanceChartCategories = [
    'Input material',
    'Input material',
    'Input material',
    'Input material',
    'Input material',
    'Input material',
    'Input material',
    'Input material',
  ];
  const financialassistanceChartSeries = [
    {
      name: 'Input details',
      data: [25, 30, 15, 10, 20, 25, 15, 30],
    },
  ];
  const investmenttechnologiesCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total CAPEX',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Sustainable CAPEX',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% of Sustainable CAPEX',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
  ];

  const capexChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const capexChartSeries = [
    {
      name: 'Sustainable Investment',
      data: [25, 30, 15, 10],
    },
    {
      name: '% of Sustainable CAPEX',
      data: [15, 25, 20, 10],
    },
  ];

  const statementCardText = {
    cardTitle: 'Investments & Services',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const projectChartCategories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const projectChartSeries = [
    {
      name: 'Sustainable Investment',
      data: [25, 30, 15, 10],
    },
    {
      name: '% of Sustainable CAPEX',
      data: [15, 25, 20, 10],
    },
  ];

  const rdCardData: INonOpsDataCard[] = [
    {
      cardTitle: 'Total R&D',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Sustainable R&D',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% of Sustainable R&D',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
  ];

  return (
    <div>
      <IndicatorHeader title="Financial Performance" />
      <NonOpsDataCard cardData={financialCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title="Financial performance trend"
            categories={financialperformanceChartCategories}
            series={financialperformanceChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Cost Incurred" />
      <NonOpsDataCard cardData={costincurredCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title="Cost incurred trend"
            categories={costincurredChartCategories}
            series={costincurredChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={costrevenueChartCategories}
            series={costrevenueChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Exports Contribution" />
      <NonOpsDataCard cardData={exportCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={exportChartCategories}
            series={exportChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Accounts Payable" />
      <NonOpsDataCard cardData={accountCardData} />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="line"
            cardClass=""
            title="Accounts payable vs Procurement cost trend"
            categories={accountPayableChartCategories}
            series={accountPayableChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="line"
            cardClass=""
            title="Days of accounts payable trend"
            categories={accountPayableChartCategories}
            series={accountPayableDaysChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Product Communication" />
      <NonOpsDataCard cardData={productCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title=" "
            categories={productChartCategories}
            series={productChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Purchases from Trading houses" />
      <NonOpsDataCard cardData={purchaseCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="area"
            cardClass=""
            title=" "
            categories={purchaseChartCategories}
            series={purchaseChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Sales to dealers / distributors" />
      <NonOpsDataCard cardData={salesCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="area"
            cardClass=""
            title=" "
            categories={salesChartCategories}
            series={salesChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Share of Related Party Transactions" />
      <NonOpsDataCard cardData={sharelatedCardData} />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="area"
            cardClass=""
            title=" "
            categories={shareareaChartCategories}
            series={shareareaChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={sharebarChartCategories}
            series={sharebarChartSeries}
            isStacked
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <NonOpsDataCard cardData={loansCardData} />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="area"
            cardClass=""
            title=" "
            categories={loanChartCategories}
            series={loanChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={investmentChartCategories}
            series={investmentbarChartSeries}
            isStacked
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Financial Assistance" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Monetary value received from goverment"
            categories={financialassistanceChartCategories}
            series={financialassistanceChartSeries}
            isFilters
            isLocationFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Investments in technologies" />
      <NonOpsDataCard cardData={investmenttechnologiesCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title=" "
            categories={capexChartCategories}
            series={capexChartSeries}
            isFilters
            isLocationFilter
            isStacked
          />
        </div>
      </div>

      <div className="mt-3">
        <CustomAccordion accordionText="Project 1" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <SingleTextCard cardData={statementCardText} />
            <NonOpsDataCard cardData={rdCardData} />
            <div className="row">
              <div className="col-lg-12">
                <Chart
                  type="bar"
                  cardClass=""
                  title=" "
                  categories={projectChartCategories}
                  series={projectChartSeries}
                  isStacked
                  isFilters
                  isLocationFilter
                />
              </div>
            </div>
          </div>
        </CustomAccordion>
      </div>
      <div className="mt-3 mb-3">
        <CustomAccordion accordionText="Project 1" rightHeader>
          <div style={{ background: 'var(--bgColor)', padding: 20 }}>
            <SingleTextCard cardData={statementCardText} />
          </div>
        </CustomAccordion>
      </div>
      <IndicatorHeader title=" Investments & Services" />
      <SingleTextCard cardData={statementCardText} />
      <SingleTextCard cardData={statementCardText} />
      <SingleTextCard cardData={statementCardText} />
      <SingleTextCard cardData={statementCardText} />
      <IndicatorHeader title="Risks & Opportunities posed by climate change" />
      <SingleTextCard cardData={statementCardText} />
      <SingleTextCard cardData={statementCardText} />
      <SingleTextCard cardData={statementCardText} />
      <SingleTextCard cardData={statementCardText} />
      <SingleTextCard cardData={statementCardText} />
      <SingleTextCard cardData={statementCardText} />
    </div>
  );
}
