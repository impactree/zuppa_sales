import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import SingleTextCard from '@/components/Cards/SingleTextCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function HealthandSafety() {
  const safetyMetricsCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Fatalities',
      cardValue: 10,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Lost Time Injuries',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Recordable Work-related Injuries',
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'High consequence work-related Injury',
      cardValue: 10,
      cardColumn: 'col-lg-12',
    },
  ];

  const rehabilitationMetricsCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'No. of employees rehabilitated',
      cardValue: 10,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'No. of workers rehabilitated',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: "Employee's Family Job Placements",
      cardValue: 5,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: "Worker's Family Job Placements",
      cardValue: 10,
      cardColumn: 'col-lg-12',
    },
  ];

  // Safety metrics vs Employees

  const safetyMetricsTimeTrendChartCategories = [
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

  const safetyMetricsTrendChartCategories = [
    'Fatalities',
    'Lost Time Injuries',
    'Recordable Work-related Injuries',
    'High consequence work-related Injury',
  ];
  const safetyMetricsTrendChartSeries = [
    {
      name: 'Employees',
      data: [10, 15, 10, 5],
    },
  ];

  const safetyMetricsEmployeeTimeTrendChartSeries = [
    {
      name: 'Employees',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Workers',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];

  const safetyMetricsTimeTrendChartSeries = [
    {
      name: 'Fatalities',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Lost Time Injuries',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
    {
      name: 'Recordable Work-related Injuries',
      data: [5, 20, 25, 15, 20, 30, 10, 20, 15, 10, 15, 20],
    },
    {
      name: 'High consequence work-related Injury',
      data: [15, 10, 5, 20, 25, 25, 5, 30, 5, 20, 30, 15],
    },
  ];

  const safetyManagementCardText = {
    cardTitle: 'Safety Management System Implementation',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const safetySystemCardText = {
    cardTitle: 'Safety System Coverage',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const hazardRiskCardText = {
    cardTitle: 'Hazard Identification & Risk Assessment',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const hazardSafetyCardText = {
    cardTitle: 'Hazard Reporting & Worker Safety',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const healthcareAccessCardText = {
    cardTitle: 'Non-Occupational Healthcare Access',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const workplaceCardText = {
    cardTitle: 'Workplace Health & Safety Measures',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const healthAuditCardText = {
    cardTitle: 'Health & Safety Practices Audit',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const safetyActionCardText = {
    cardTitle: 'Safety Incident Corrective Actions',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const workingAuditCardText = {
    cardTitle: 'Working Conditions Audit',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  const workingActionCardText = {
    cardTitle: 'Working Conditions: Corrective Actions',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  return (
    <div>
      <IndicatorHeader title="Safety Metrics" />
      <NonOpsDataCard cardData={safetyMetricsCarddata} />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Employee Safety Metrics"
            categories={safetyMetricsTrendChartCategories}
            series={safetyMetricsTrendChartSeries}
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="bar"
            cardClass=""
            title="Worker Safety Metrics"
            categories={safetyMetricsTrendChartCategories}
            series={safetyMetricsTrendChartSeries}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="line"
            cardClass=""
            title=""
            categories={safetyMetricsTimeTrendChartCategories}
            series={safetyMetricsEmployeeTimeTrendChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="line"
            cardClass=""
            title=""
            categories={safetyMetricsTimeTrendChartCategories}
            series={safetyMetricsTimeTrendChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Work Rehabilitation" />
      <NonOpsDataCard cardData={rehabilitationMetricsCarddata} />
      <SingleTextCard cardData={safetyManagementCardText} />
      <SingleTextCard cardData={safetySystemCardText} />
      <SingleTextCard cardData={hazardRiskCardText} />
      <SingleTextCard cardData={hazardSafetyCardText} />
      <SingleTextCard cardData={healthcareAccessCardText} />
      <SingleTextCard cardData={workplaceCardText} />
      <IndicatorHeader title="Health & Safety Assessments" />
      <SingleTextCard cardData={healthAuditCardText} />
      <SingleTextCard cardData={safetyActionCardText} />
      <SingleTextCard cardData={workingAuditCardText} />
      <SingleTextCard cardData={workingActionCardText} />
    </div>
  );
}
