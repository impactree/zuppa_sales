import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import SingleTextCard from '@/components/Cards/SingleTextCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function CustomerExperience() {
  const customerComplaintsCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Complaints Received',
      cardValue: 16,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Total Complaints Resolved',
      cardValue: 12,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% Complaints Pending',
      cardValue: 20,
      cardColumn: 'col-lg-4',
    },
  ];
  const customerComplaintsByCategoryChartCategories = [
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
  const customerComplaintsByCategoryChartSeries = [
    {
      name: 'No. of complaints filed',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
    {
      name: 'No. of complaints resolved',
      data: [15, 25, 20, 10, 15, 25, 20, 10, 15, 25, 20, 10],
    },
  ];
  // Complaints Received vs Resolved Trends
  const customerComplaintsTrendChartCategories = [
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
  const customerComplaintsTrendChartSeries = [
    {
      name: 'Complaints filed',
      data: [25, 30, 15, 10, 25, 30, 22, 15, 25, 30, 20, 15],
    },
    {
      name: 'Complaints resolved',
      data: [15, 25, 20, 10, 15, 25, 20, 10, 15, 25, 20, 10],
    },
  ];

  const customerFeedbackCardText = {
    cardTitle: 'Customer Feedback Mechanisms',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const customerSatisfactionCardText = {
    cardTitle: 'Customer Satisfaction Survey',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  return (
    <div>
      <IndicatorHeader
        title="Complaints filed by Customers"
      />
      <NonOpsDataCard cardData={customerComplaintsCarddata} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            cardClass=""
            title="Complaints filed vs resolved Trend"
            categories={customerComplaintsByCategoryChartCategories}
            series={customerComplaintsByCategoryChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            cardClass=""
            title="Complaints filed vs resolved Trend"
            categories={customerComplaintsTrendChartCategories}
            series={customerComplaintsTrendChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <SingleTextCard cardData={customerFeedbackCardText} />
      <SingleTextCard cardData={customerSatisfactionCardText} />
    </div>
  );
}
