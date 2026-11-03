import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import SingleTextCard from '@/components/Cards/SingleTextCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function ITComplaints() {
  const dataBreachComplaintsCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Instances of Data Breaches',
      cardValue: 10,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Customer Data Breaches',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'External Privacy Complaints',
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Regulatory Privacy Complaints',
      cardValue: 10,
      cardColumn: 'col-lg-12',
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
      name: 'Customer Data Breaches',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'External Privacy Complaints',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
    {
      name: 'Regulatory Privacy Complaints',
      data: [50, 60, 40, 50, 20, 10, 40, 50, 70, 60, 40, 20],
    },
  ];

  const dataPrivacyCardText = {
    cardTitle: 'Details of Data Privacy Policy',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const webLinkCardText = {
    cardTitle: 'Web link of the policy',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  return (
    <div>
      <IndicatorHeader title="Data Breaches" />
      <NonOpsDataCard cardData={dataBreachComplaintsCarddata} />
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
      <SingleTextCard cardData={dataPrivacyCardText} />
      <SingleTextCard cardData={webLinkCardText} />
    </div>
  );
}
