import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard from '@/components/Cards/NonOpsDataCard';
import SingleTextCard from '@/components/Cards/SingleTextCard';
import Chart from '@/components/Charts/Chart';
import React from 'react';

function TrainingPrograms() {
  const trainingProgramsCardData = [
    {
      cardTitle: 'Total number of Training Programs',
      cardValue: 15,
    },
    {
      cardTitle: 'No. of Sessions conducted',
      cardValue: 5,
    },
    {
      cardTitle: 'Training Coverage (%)',
      cardValue: 10,
    },
    {
      cardTitle: 'Total Duration (in hrs)',
      cardValue: 15,
    },
    {
      cardTitle: '% of BRSR Principles covered',
      cardValue: 5,
    },
    {
      cardTitle: 'Mandatory Training %',
      cardValue: 10,
    },
    {
      cardTitle: 'Optional Training %',
      cardValue: 10,
    },
  ];
  const individualTrainingProgramsCardData = [
    {
      cardTitle: 'No. of Sessions conducted',
      cardValue: 10,
    },
    {
      cardTitle: 'No. of Participants',
      cardValue: 50,
    },
    {
      cardTitle: 'Duration (in hrs)',
      cardValue: 30,
    },
  ];
  const individualTrainingChartCategories = [
    'BOD Members',
    'KMP',
    'Employees',
    'Workers',
  ];
  const individualTrainingChartSeries = [
    {
      name: 'Total',
      data: [10, 15, 20, 25],
    },
  ];
  const employeesTrainingChartCategories = ['Male', 'Female'];
  const employeesTrainingChartSeries = [10, 15];
  const workersTrainingChartCategories = ['Male', 'Female'];
  const workersTrainingChartSeries = [20, 15];
  const trainingParticipantCategories = [
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
  const trainingParticipantSeries = [
    {
      name: 'BOD Members',
      data: [10, 15, 10, 5, 10, 15, 20, 10, 10, 20, 30, 10],
    },
    {
      name: 'KMP',
      data: [20, 30, 15, 10, 10, 5, 10, 20, 25, 15, 10, 5],
    },
    {
      name: 'Employees',
      data: [50, 60, 40, 50, 20, 10, 40, 50, 70, 60, 40, 20],
    },
    {
      name: 'Workers',
      data: [40, 50, 30, 20, 40, 20, 30, 40, 60, 50, 50, 30],
    },
  ];
  const trainingParticipantEmployeesCategories = [
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
  const trainingParticipantEmployeesSeries = [
    {
      name: 'Male',
      data: [50, 60, 40, 50, 20, 10, 40, 50, 70, 60, 40, 20],
    },
    {
      name: 'Female',
      data: [40, 50, 30, 20, 40, 20, 30, 40, 60, 50, 50, 30],
    },
  ];

  const totalDurationCardData = [
    {
      cardTitle: 'Total /Average Duration (in hrs)',
      cardValue: 10,
    },
  ];
  const totalDurationBreakupCardData = [
    {
      cardTitle: 'No. of Sessions conducted',
      cardValue: 10,
    },
    {
      cardTitle: 'No. of Participants',
      cardValue: 50,
    },
  ];
  const trainingdurationBreakupChartCategories = ['Employees', 'Workers'];
  const trainingdurationBreakupChartSeries = [
    {
      name: 'Male',
      data: [10, 15],
    },
    {
      name: 'Female',
      data: [15, 25],
    },
  ];

  const performanceReviewsCardData = [
    {
      cardTitle: 'Performance Reviews',
      cardValue: 10,
    },
    {
      cardTitle: 'Employee Coverage',
      cardValue: 50,
    },
    {
      cardTitle: 'Worker Coverage',
      cardValue: 10,
    },
    {
      cardTitle: 'Male Coverage',
      cardValue: 50,
    },
    {
      cardTitle: 'Female Coverage',
      cardValue: 10,
    },
    {
      cardTitle: 'Employee Coverage %',
      cardValue: 50,
    },
    {
      cardTitle: 'Worker Coverage %',
      cardValue: 10,
    },
  ];

  const performanceReviewTrendCategories = [
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
  const performanceReviewTrendSeries = [
    {
      name: 'Employees',
      data: [50, 60, 40, 50, 20, 10, 40, 50, 70, 60, 40, 20],
    },
    {
      name: 'Workers',
      data: [40, 50, 30, 20, 40, 20, 30, 40, 60, 50, 50, 30],
    },
  ];
  const transitionAssistanceCardText = {
    cardTitle: 'Transition Assistance',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  return (
    <div>
      <IndicatorHeader title="Training Programmes Conducted" />
      <NonOpsDataCard cardData={trainingProgramsCardData} />
      <div className="mb-3">
        <select>
          <option>Training 1</option>
          <option>Training 2</option>
          <option>Training 3</option>
        </select>
      </div>
      <p>Training Program Participation</p>
      <NonOpsDataCard
        cardData={individualTrainingProgramsCardData}
      />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Training Program Participation"
            categories={individualTrainingChartCategories}
            series={individualTrainingChartSeries}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="pie"
            title="Employees Gender Coverage"
            categories={employeesTrainingChartCategories}
            series={employeesTrainingChartSeries}
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="pie"
            title="Workers Gender Coverage"
            categories={workersTrainingChartCategories}
            series={workersTrainingChartSeries}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="line"
            title="Training Participation Rate"
            categories={trainingParticipantCategories}
            series={trainingParticipantSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="line"
            title="Unique Participant Training Coverage"
            categories={trainingParticipantCategories}
            series={trainingParticipantSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="area"
            title="Employees Training Coverage"
            categories={trainingParticipantEmployeesCategories}
            series={trainingParticipantEmployeesSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="area"
            title="Workers Training Coverage"
            categories={trainingParticipantEmployeesCategories}
            series={trainingParticipantEmployeesSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>

      <IndicatorHeader title="Duration of Training Program (in hrs)" />
      <NonOpsDataCard cardData={totalDurationCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Training Duration Breakup by Employee Type"
            categories={individualTrainingChartCategories}
            series={individualTrainingChartSeries}
          />
        </div>
      </div>
      <NonOpsDataCard cardData={totalDurationBreakupCardData} />
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="bar"
            title="Training Duration Breakup by Gender"
            categories={trainingdurationBreakupChartCategories}
            series={trainingdurationBreakupChartSeries}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Chart
            type="line"
            title="Training Duration Trend"
            categories={trainingParticipantCategories}
            series={trainingParticipantSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>

      <IndicatorHeader title="Performance & Career Reviews" />
      <NonOpsDataCard cardData={performanceReviewsCardData} />
      <div className="row">
        <div className="col-lg-6">
          <Chart
            type="bar"
            title="Performance Reviews Breakup by Gender"
            categories={trainingdurationBreakupChartCategories}
            series={trainingdurationBreakupChartSeries}
          />
        </div>
        <div className="col-lg-6">
          <Chart
            type="line"
            title="Training Duration Trend"
            categories={performanceReviewTrendCategories}
            series={performanceReviewTrendSeries}
            isFilters
            isTimeFrequencyFilter
          />
        </div>
      </div>

      <IndicatorHeader title="Employment Transition Program" />
      <SingleTextCard cardData={transitionAssistanceCardText} />
    </div>
  );
}

export default TrainingPrograms;
