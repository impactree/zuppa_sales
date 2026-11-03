import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard from '@/components/Cards/NonOpsDataCard';
import SingleTextCard from '@/components/Cards/SingleTextCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function InputSourcing() {
  const materialSourcingCardData = [
    {
      cardTitle: 'Total Raw Materials (Rs.)',
      cardValue: 1500000,
    },
    {
      cardTitle: 'MSMEs / Small producers Raw Materials (Rs.)',
      cardValue: 1200000,
    },
    {
      cardTitle: 'Raw Materials sourced in India (Rs.)',
      cardValue: 1300000,
    },
  ];
  const materialSourcingTrendChartCategories = [
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
  const materialSourcingTrendChartSeries = [
    {
      name: 'MSMEs / small producers',
      data: [
        100000, 150000, 100000, 50000, 100000, 150000, 200000, 100000, 100000,
        200000, 300000, 100000,
      ],
    },
    {
      name: 'Sourced within India',
      data: [
        200000, 300000, 150000, 100000, 100000, 50000, 100000, 200000, 250000,
        150000, 100000, 50000,
      ],
    },
    {
      name: 'Total Raw Materials',
      data: [
        500000, 600000, 400000, 500000, 200000, 100000, 400000, 500000, 700000,
        600000, 400000, 200000,
      ],
    },
  ];
  const sustainableSourcingCardData = [
    {
      cardTitle: 'Amount of Sustainable Sourcing (Rs.)',
      cardValue: 1800000,
    },
    {
      cardTitle: '% of Sustainable Sourcing',
      cardValue: 90,
    },
  ];
  const sustainableSourcingTrendChartCategories = [
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
  const sustainableSourcingTrendChartSeries = [
    {
      name: 'Total Raw Materials',
      data: [
        100000, 150000, 100000, 50000, 100000, 150000, 200000, 100000, 100000,
        200000, 300000, 100000,
      ],
    },
    {
      name: 'Sustainable sourcing',
      data: [
        200000, 300000, 150000, 100000, 100000, 50000, 100000, 200000, 250000,
        150000, 100000, 50000,
      ],
    },
  ];
  const sustainableSourcingCardText = {
    cardTitle: 'Sustainable Sourcing Policy',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const preferentialProcurementCardData = [
    {
      cardTitle: 'Marginalized Groups Procurement (Rs.)',
      cardValue: 1800000,
    },
    {
      cardTitle: '% of Preferential Procurement',
      cardValue: 90,
    },
  ];
  const preferentialProcurementTrendChartCategories = [
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
  const preferentialProcurementTrendChartSeries = [
    {
      name: 'Total Raw Materials',
      data: [
        100000, 150000, 100000, 50000, 100000, 150000, 200000, 100000, 100000,
        200000, 300000, 100000,
      ],
    },
    {
      name: 'Marginalized groups procurement',
      data: [
        200000, 300000, 150000, 100000, 100000, 50000, 100000, 200000, 250000,
        150000, 100000, 50000,
      ],
    },
  ];
  const preferentialProcurementCardText = {
    cardTitle: 'Procurement from Marginalized / Vulnerable groups',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const recycleReusedCardData = [
    {
      cardTitle: 'Material Input Types',
      cardValue: 1800000,
    },
    {
      cardTitle: 'Recycled Input Value (in Rs.)',
      cardValue: 90,
    },
  ];
  const recycleReusedInputChartCategories = [
    'Input material 1',
    'Input material 2',
    'Input material 3',
    'Input material 4',
    'Input material 5',
    'Input material 5',
  ];
  const recycleReusedInputChartSeries = [
    {
      name: 'Recycled Input Materials',
      data: [100000, 150000, 100000, 50000, 100000, 150000],
    },
  ];
  const recycleReusedTrendChartCategories = [
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
  const recycleReusedTrendChartSeries = [
    {
      name: 'Recycled Input Materials',
      data: [
        100000, 150000, 100000, 50000, 100000, 150000, 200000, 100000, 100000,
        200000, 300000, 100000,
      ],
    },
  ];
  return (
    <div>
      <IndicatorHeader title="Material Sourcing" />
      <NonOpsDataCard cardData={materialSourcingCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="area"
            title="Material Sourcing Trend"
            categories={materialSourcingTrendChartCategories}
            series={materialSourcingTrendChartSeries}
          />
        </div>
      </div>

      <IndicatorHeader title="Sustainable Sourcing" />
      <NonOpsDataCard cardData={sustainableSourcingCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="area"
            title="Material Sourcing Trend"
            categories={sustainableSourcingTrendChartCategories}
            series={sustainableSourcingTrendChartSeries}
          />
        </div>
      </div>
      <SingleTextCard cardData={sustainableSourcingCardText} />

      <IndicatorHeader title="Preferential Procurement" />
      <NonOpsDataCard
        cardData={preferentialProcurementCardData}
      />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="area"
            title="Material Sourcing Trend"
            categories={preferentialProcurementTrendChartCategories}
            series={preferentialProcurementTrendChartSeries}
          />
        </div>
      </div>
      <SingleTextCard
        cardData={preferentialProcurementCardText}
      />

      <IndicatorHeader title="Recycled / Reused Input Material usage in Production" />
      <NonOpsDataCard cardData={recycleReusedCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Value of Input Material Breakup"
            categories={recycleReusedInputChartCategories}
            series={recycleReusedInputChartSeries}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Input Material Usage Trend"
            categories={recycleReusedTrendChartCategories}
            series={recycleReusedTrendChartSeries}
          />
        </div>
      </div>
    </div>
  );
}
