import { CustomAccordion } from '@/components/Accordion/CustomAccordion';
import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard from '@/components/Cards/NonOpsDataCard';
import SingleTextCard from '@/components/Cards/SingleTextCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

export default function EmployeeGrievanceRedressal() {
  const totalCompliantsCardData = [
    {
      cardTitle: 'Total No. of Complaints Received',
      cardValue: 15,
    },
    {
      cardTitle: 'Total No. of Complaints Resolved',
      cardValue: 5,
    },
    {
      cardTitle: 'Total No. of Complaints Pending',
      cardValue: 10,
    },
  ];
  const employeeCompliantsCardData = [
    {
      cardTitle: 'Total No. of Complaints Received',
      cardValue: 10,
    },
    {
      cardTitle: 'Total No. of Complaints Resolved',
      cardValue: 5,
    },
    {
      cardTitle: '% Complaints Pending Resolution',
      cardValue: 50,
    },
  ];
  const employeeCompliantsChartCategories = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
  ];
  const employeeCompliantsChartSeries = [
    {
      name: 'No. of complaints filed',
      data: [10, 15, 10, 5, 10],
    },
    {
      name: 'No. of complaints resolved',
      data: [20, 30, 15, 10, 10],
    },
  ];
  const workerCompliantsCardData = [
    {
      cardTitle: 'Total No. of Complaints Received',
      cardValue: 15,
    },
    {
      cardTitle: 'Total No. of Complaints Resolved',
      cardValue: 5,
    },
    {
      cardTitle: '% Complaints Pending Resolution',
      cardValue: 35,
    },
  ];
  const workerCompliantsChartCategories = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
  ];
  const workerCompliantsChartSeries = [
    {
      name: 'No. of complaints filed',
      data: [10, 15, 10, 5, 10],
    },
    {
      name: 'No. of complaints resolved',
      data: [20, 30, 15, 10, 10],
    },
  ];
  const compliantsByEmployeeTypeChartCategories = [
    'Complaints filed by Employees',
    'Complaints filed by Workers',
  ];
  const compliantsByEmployeeTypeChartSeries = [
    {
      name: 'No. of complaints filed',
      data: [20, 35],
    },
    {
      name: 'No. of complaints resolved',
      data: [10, 30],
    },
  ];
  const complaintsTrendChartCategories = [
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
  const complaintsTrendChartSeries = [
    {
      name: 'Reclaimed',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'Non-Reclaimed',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];
  const grievanceRedressalMechanismCardText = {
    cardTitle: 'Employees & Workers Grievance Redressal Mechanism',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const poshCompliantsCardData = [
    {
      cardTitle: 'Complaints Received',
      cardValue: 2,
    },
    {
      cardTitle: 'Complaints Upheld',
      cardValue: 1,
    },
    {
      cardTitle: 'Female Complaint Rate',
      cardValue: 100,
    },
  ];
  const poshComplaintsTrendChartCategories = [
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
  const poshComplaintsTrendChartSeries = [
    {
      name: 'No. of complaints filed',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'No. of complaints upheld',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
  ];
  const humanRightsRequirementsCardText1 = {
    cardTitle: 'Human Rights in Business Agreements',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const humanRightsRequirementsCardText2 = {
    cardTitle: 'Human Rights Due Diligence (Scope & Coverage)',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const humanRightsRequirementsCardText3 = {
    cardTitle: 'Human Rights Issues Committee/Contact',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const humanRightsRequirementsCardText4 = {
    cardTitle: 'Human Rights Grievance Mechanisms',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const humanRightsRequirementsCardText5 = {
    cardTitle: 'Business Impact: Human Rights Grievances',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  return (
    <div>
      <IndicatorHeader title="Complaints filed by Employee & Workers " />
      <NonOpsDataCard cardData={totalCompliantsCardData} />
      <p>Complaints filed by Employees</p>
      <NonOpsDataCard cardData={employeeCompliantsCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Complaints filed by Employees"
            categories={employeeCompliantsChartCategories}
            series={employeeCompliantsChartSeries}
          />
        </div>
      </div>
      <p>Complaints filed by Workers</p>
      <NonOpsDataCard cardData={workerCompliantsCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Complaints filed by Workers"
            categories={workerCompliantsChartCategories}
            series={workerCompliantsChartSeries}
          />
        </div>
      </div>
      <div className="row mb-3">
        <CustomAccordion accordionText="Category 1" rightHeader>
          <div className="p-3" style={{ background: 'var(--bgColor)' }}>
            <Chart
              type="bar"
              title="Complaints filed by Employee Type"
              categories={compliantsByEmployeeTypeChartCategories}
              series={compliantsByEmployeeTypeChartSeries}
            />
          </div>
        </CustomAccordion>
      </div>
      <div className="row mb-3">
        <CustomAccordion accordionText="Category 2" rightHeader>
          <div className="p-3" style={{ background: 'var(--bgColor)' }}>
            <Chart
              type="bar"
              title="Complaints filed by Employee Type"
              categories={compliantsByEmployeeTypeChartCategories}
              series={compliantsByEmployeeTypeChartSeries}
            />
          </div>
        </CustomAccordion>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            title="Complaints filed vs resolved Trend"
            categories={complaintsTrendChartCategories}
            series={complaintsTrendChartSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <SingleTextCard
        cardData={grievanceRedressalMechanismCardText}
      />
      <IndicatorHeader title="POSH Complaints" />
      <NonOpsDataCard cardData={poshCompliantsCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Posh Complaints filed vs resolved Trend"
            categories={poshComplaintsTrendChartCategories}
            series={poshComplaintsTrendChartSeries}
            isStacked
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <IndicatorHeader title="Human Rights Requirements" />
      <SingleTextCard
        cardData={humanRightsRequirementsCardText1}
      />
      <SingleTextCard
        cardData={humanRightsRequirementsCardText2}
      />
      <SingleTextCard
        cardData={humanRightsRequirementsCardText3}
      />
      <SingleTextCard
        cardData={humanRightsRequirementsCardText4}
      />
      <SingleTextCard
        cardData={humanRightsRequirementsCardText5}
      />
    </div>
  );
}
