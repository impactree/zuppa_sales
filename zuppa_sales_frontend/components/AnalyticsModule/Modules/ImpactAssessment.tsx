import React from 'react';
import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard from '@/components/Cards/NonOpsDataCard';
import AnalyticsTable from '../AnalyticsTable';

export default function ImpactAssessment() {
  const socialImpactAssessmentCardData = [
    {
      cardTitle: 'No.of Projects',
      cardValue: 10,
    },
    {
      cardTitle: 'External Assessments',
      cardValue: 25,
    },
  ];

  const socialImpactProjectsData = [
    {
      'name of the project': 'Name of the Project',
      'details of project': 'Details of Project',
      'sia notification number': 'SIA Notification Number',
      'date of notification': 'Date of Notification',
      'has the assessment been conducted by external agency':
        'Has the assessment been conducted by external agency',
      'results communicated in public domain':
        'Results communicated in public domain',
      'relevant web link': 'Relevant Web Link',
    },
  ];
  const socialImpactProjectsColumn = [
    {
      key: 'name of the project',
      label: 'Name of the Project',
    },
    {
      key: 'details of project',
      label: 'Details of Project',
    },
    {
      key: 'sia notification number',
      label: 'SIA Notification Number',
    },
    {
      key: 'date of notification',
      label: 'Date of Notification',
    },
    {
      key: 'has the assessment been conducted by external agency',
      label: 'Has the assessment been conducted by external agency',
    },
    {
      key: 'results communicated in public domain',
      label: 'Results communicated in public domain',
    },
    {
      key: 'relevant web link',
      label: 'Relevant Web Link',
    },
  ];

  const negativeSocialImpactIdentifiedData = [
    {
      'details of negative social impact identified':
        'Details of Negative Social Impact identified',
      'corrective action taken': 'Corrective Action taken',
    },
    {
      'details of negative social impact identified':
        'Details of Negative Social Impact identified',
      'corrective action taken': 'Corrective Action taken',
    },
    {
      'details of negative social impact identified':
        'Details of Negative Social Impact identified',
      'corrective action taken': 'Corrective Action taken',
    },
  ];
  const negativeSocialImpactIdentifiedColumn = [
    {
      key: 'details of negative social impact identified',
      label: 'Details of Negative Social Impact identified',
    },
    {
      key: 'corrective action taken',
      label: 'Corrective Action taken',
    },
  ];

  const environmentalImpactAssessmentCardData = [
    {
      cardTitle: 'No.of Projects',
      cardValue: 15,
    },
    {
      cardTitle: 'External Assessments',
      cardValue: 40,
    },
  ];

  const environmentalImpactProjectsData = [
    {
      'name of the project': 'Name of the Project',
      'details of project': 'Details of Project',
      'sia notification number': 'SIA Notification Number',
      'date of notification': 'Date of Notification',
      'has the assessment been conducted by external agency':
        'Has the assessment been conducted by external agency',
      'results communicated in public domain':
        'Results communicated in public domain',
      'relevant web link': 'Relevant Web Link',
    },
  ];
  const environmentalImpactProjectsColumn = [
    {
      key: 'name of the project',
      label: 'Name of the Project',
    },
    {
      key: 'details of project',
      label: 'Details of Project',
    },
    {
      key: 'eia notification number',
      label: 'EIA Notification Number',
    },
    {
      key: 'date of notification',
      label: 'Date of Notification',
    },
    {
      key: 'has the assessment been conducted by external agency',
      label: 'Has the assessment been conducted by external agency',
    },
    {
      key: 'results communicated in public domain',
      label: 'Results communicated in public domain',
    },
    {
      key: 'relevant web link',
      label: 'Relevant Web Link',
    },
  ];

  return (
    <div>
      <IndicatorHeader title="Social Impact Assessments" />
      <NonOpsDataCard cardData={socialImpactAssessmentCardData} />
      <AnalyticsTable
        columns={socialImpactProjectsColumn}
        data={socialImpactProjectsData}
      />
      <AnalyticsTable
        columns={negativeSocialImpactIdentifiedColumn}
        data={negativeSocialImpactIdentifiedData}
      />

      <IndicatorHeader title="Environmental Impact Assessments" />
      <NonOpsDataCard cardData={environmentalImpactAssessmentCardData} />
      <AnalyticsTable
        columns={environmentalImpactProjectsColumn}
        data={environmentalImpactProjectsData}
      />
    </div>
  );
}
