import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard from '@/components/Cards/NonOpsDataCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';
import SingleTextCard from '@/components/Cards/SingleTextCard';
import AnalyticsTable from '../AnalyticsTable';

export default function ProductManagement() {
  const productRecallCardData = [
    {
      cardTitle: 'No. of Voluntary Recall',
      cardValue: 5,
    },
    {
      cardTitle: 'No. of Forced Recalls',
      cardValue: 1,
    },
  ];
  const productRecallTrendChartCategories = [
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
  const productRecallTrendChartSeries = [
    {
      name: 'Voluntary Recalls',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Forced Recalls',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  const lifeCycleAssessmentCardData = [
    {
      cardTitle: 'Turnover contributed for LCA',
      cardValue: 1500000,
    },
    {
      cardTitle: '% of Turnover contributed',
      cardValue: 20,
    },
  ];

  const lifeCycleAssessmentData = [
    {
      'nic code': 'NIC Code',
      'name of product/service': 'Name of product/service',
      '% of total turnover contributed': '% of total turnover contributed',
      'boundary for which the life cycle perspective/assessment was conducted':
        'Boundary for which the life cycle perspective/assessment was conducted',
      'whether conducted by independent external agency(yes/no)':
        'Whether conducted by independent external agency(Yes/No)',
      'results communicated in public domain(yes/no) if yes, provide the web-link':
        'Results communicated in public domain(Yes/No) If yes, provide the web-link',
    },
    {
      'nic code': 'NIC Code',
      'name of product/service': 'Name of product/service',
      '% of total turnover contributed': '% of total turnover contributed',
      'boundary for which the life cycle perspective/assessment was conducted':
        'Boundary for which the life cycle perspective/assessment was conducted',
      'whether conducted by independent external agency(yes/no)':
        'Whether conducted by independent external agency(Yes/No)',
      'results communicated in public domain(yes/no) if yes, provide the web-link':
        'Results communicated in public domain(Yes/No) If yes, provide the web-link',
    },
    {
      'nic code': 'NIC Code',
      'name of product/service': 'Name of product/service',
      '% of total turnover contributed': '% of total turnover contributed',
      'boundary for which the life cycle perspective/assessment was conducted':
        'Boundary for which the life cycle perspective/assessment was conducted',
      'whether conducted by independent external agency(yes/no)':
        'Whether conducted by independent external agency(Yes/No)',
      'results communicated in public domain(yes/no) if yes, provide the web-link':
        'Results communicated in public domain(Yes/No) If yes, provide the web-link',
    },
  ];
  const lifeCycleAssessmentColumn = [
    {
      key: 'nic code',
      label: 'NIC Code',
    },
    {
      key: 'name of product/service',
      label: 'Name of product/service',
    },
    {
      key: '% of total turnover contributed',
      label: '% of total turnover contributed',
    },
    {
      key: 'boundary for which the life cycle perspective/assessment was conducted',
      label:
        'Boundary for which the life cycle perspective/assessment was conducted',
    },
    {
      key: 'whether conducted by independent external agency(yes/no)',
      label: 'Whether conducted by independent external agency(Yes/No)',
    },
    {
      key: 'results communicated in public domain(yes/no) if yes, provide the web-link',
      label:
        'Results communicated in public domain(Yes/No) If yes, provide the web-link',
    },
  ];
  const lifeCycleAssessmentConcernData = [
    {
      'description of the risk/concern': 'Description of the risk/concern',
      'action taken': 'Action taken',
    },
    {
      'description of the risk/concern': 'Description of the risk/concern',
      'action taken': 'Action taken',
    },
    {
      'description of the risk/concern': 'Description of the risk/concern',
      'action taken': 'Action taken',
    },
  ];
  const lifeCycleAssessmentConcernColumn = [
    {
      key: 'description of the risk/concern',
      label: 'Description of the risk/concern',
    },
    {
      key: 'action taken',
      label: 'Action taken',
    },
  ];

  const erpComplianceCardText = {
    cardTitle: 'EPR Compliance (Waste Collection)',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const productsReclaimedChartCategories = [
    'Product 1',
    'Product 2',
    'Product 3',
    'Product 4',
    'Product 5',
  ];
  const productsReclaimedChartSeries = [
    {
      name: 'Reclaimed',
      data: [10, 15, 10, 5, 10],
    },
    {
      name: 'Non-Reclaimed',
      data: [20, 30, 15, 10, 10],
    },
  ];

  const productsReclaimedTrendChartCategories = [
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
  const productsReclaimedTrendChartSeries = [
    {
      name: 'Reclaimed',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Non-Reclaimed',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  const reclaimedWasteTypeChartCategories = [
    'Product 1',
    'Product 2',
    'Product 3',
    'Product 4',
    'Product 5',
  ];
  const reclaimedWasteTypeChartSeries = [
    {
      name: 'Plastics',
      data: [10, 15, 10, 5, 10],
    },
    {
      name: 'E-waste',
      data: [20, 30, 15, 10, 10],
    },
    {
      name: 'Hazardous waste',
      data: [10, 15, 10, 5, 10],
    },
    {
      name: 'Bio-medical waste',
      data: [20, 30, 15, 10, 10],
    },
    {
      name: 'Construction and demolition waste',
      data: [20, 30, 15, 10, 10],
    },
    {
      name: 'Battery',
      data: [20, 30, 15, 10, 10],
    },
    {
      name: 'Other waste ',
      data: [20, 30, 15, 10, 10],
    },
  ];
  const reclaimedWasteTypeTrendChartCategories = [
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
  const reclaimedWasteTypeTrendChartSeries = [
    {
      name: 'Plastics',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'E-waste',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
    {
      name: 'Hazardous waste',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Bio-medical waste',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
    {
      name: 'Construction and demolition waste',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Battery',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
    {
      name: 'Other waste ',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
  ];

  const reclaimedProductRecoveryChartCategories = [
    'Product 1',
    'Product 2',
    'Product 3',
    'Product 4',
    'Product 5',
  ];
  const reclaimedProductRecoveryChartSeries = [
    {
      name: 'Recycle',
      data: [10, 15, 10, 5, 10],
    },
    {
      name: 'Re-Use',
      data: [20, 30, 15, 10, 10],
    },
    {
      name: 'Safe Disposal',
      data: [10, 15, 10, 5, 10],
    },
  ];
  const productReclaimedCardData = [
    {
      cardTitle: 'Recycle',
      cardValue: 5,
    },
    {
      cardTitle: 'Re-Use',
      cardValue: 2,
    },
    {
      cardTitle: 'Safe Disposal',
      cardValue: 3,
    },
  ];

  const reclaimedProductByTypeChartCategories = [
    'Plastics',
    'E-waste',
    'Hazardous waste',
    'Bio-medical waste',
    'Construction and demolition waste',
    'Battery waste',
    'Other waste',
  ];
  const reclaimedProductByTypeChartSeries = [
    {
      name: 'Recycle',
      data: [10, 15, 10, 5, 10, 8, 12],
    },
    {
      name: 'Re-Use',
      data: [20, 30, 15, 10, 10, 15, 18],
    },
    {
      name: 'Safe Disposal',
      data: [10, 15, 10, 5, 10, 4, 8],
    },
  ];
  const reclaimedProductByTypeTrendChartCategories = [
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
  const reclaimedProductByTypeTrendChartSeries = [
    {
      name: 'Recycle',
      data: [10, 15, 10, 5, 10, 8, 12, 20, 10, 5],
    },
    {
      name: 'Re-Use',
      data: [20, 30, 15, 10, 10, 15, 18, 10, 15, 20],
    },
    {
      name: 'Safe Disposal',
      data: [12, 25, 20, 15, 20, 4, 8, 10, 12, 15],
    },
  ];

  const productsReclaimedCardText1 = {
    cardTitle: 'Plastic Reclaim Process',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const productsReclaimedCardText2 = {
    cardTitle: 'E-Waste Reclaim Process',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const productsReclaimedCardText3 = {
    cardTitle: 'Bio-medical Waste Reclaim Process',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const productsReclaimedCardText4 = {
    cardTitle: 'Construction & Demolition Waste Reclaim Process',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const productsReclaimedCardText5 = {
    cardTitle: 'Battery Waste Reclaim Process',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const productsReclaimedCardText6 = {
    cardTitle: 'Hazardous Waste Reclaim Process',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const productsReclaimedCardText7 = {
    cardTitle: 'Other Waste Reclaim Process',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const productsInformationCardText1 = {
    cardTitle: 'Extended Product Labeling: Beyond Legal Compliance',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const productsInformationCardText2 = {
    cardTitle: 'Consumer Safety & Usage Guide for Product / Service',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const productsInformationCardText3 = {
    cardTitle: 'Consumer Notification for Service Disruption',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  return (
    <div>
      <IndicatorHeader title="Product Recall" />
      <NonOpsDataCard cardData={productRecallCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            title="Product Recall Breakup"
            categories={productRecallTrendChartCategories}
            series={productRecallTrendChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>

      <IndicatorHeader title="Life Cycle Assessments" />
      <NonOpsDataCard cardData={lifeCycleAssessmentCardData} />
      <AnalyticsTable
        columns={lifeCycleAssessmentColumn}
        data={lifeCycleAssessmentData}
      />
      <AnalyticsTable
        columns={lifeCycleAssessmentConcernColumn}
        data={lifeCycleAssessmentConcernData}
      />

      <IndicatorHeader title="Extended Producer Responsibility (EPR)" />
      <SingleTextCard cardData={erpComplianceCardText} />

      <IndicatorHeader title="Products and Packaging Reclaimed" />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Reclaimed vs Non-Reclaimed: By Product"
            categories={productsReclaimedChartCategories}
            series={productsReclaimedChartSeries}
            isStacked
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Trend Reclaimed vs Non-Reclaimed"
            categories={productsReclaimedTrendChartCategories}
            series={productsReclaimedTrendChartSeries}
            isStacked
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Reclaimed Waste: By Type & Process"
            categories={reclaimedWasteTypeChartCategories}
            series={reclaimedWasteTypeChartSeries}
            isStacked
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="area"
            title="Products & Packaging Reclaimed Trend"
            categories={reclaimedWasteTypeTrendChartCategories}
            series={reclaimedWasteTypeTrendChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Reclaimed Products: Recovery by Product Type"
            categories={reclaimedProductRecoveryChartCategories}
            series={reclaimedProductRecoveryChartSeries}
            isStacked
          />
        </div>
      </div>
      <NonOpsDataCard cardData={productReclaimedCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Products & Packaging Reclaimed"
            categories={reclaimedProductByTypeChartCategories}
            series={reclaimedProductByTypeChartSeries}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            title="Products Reclaimed: Recovery Method Trend"
            categories={reclaimedProductByTypeTrendChartCategories}
            series={reclaimedProductByTypeTrendChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <SingleTextCard cardData={productsReclaimedCardText1} />
      <SingleTextCard cardData={productsReclaimedCardText2} />
      <SingleTextCard cardData={productsReclaimedCardText3} />
      <SingleTextCard cardData={productsReclaimedCardText4} />
      <SingleTextCard cardData={productsReclaimedCardText5} />
      <SingleTextCard cardData={productsReclaimedCardText6} />
      <SingleTextCard cardData={productsReclaimedCardText7} />

      <IndicatorHeader title="Display of Product Information" />
      <SingleTextCard cardData={productsInformationCardText1} />
      <SingleTextCard cardData={productsInformationCardText2} />
      <SingleTextCard cardData={productsInformationCardText3} />
    </div>
  );
}
