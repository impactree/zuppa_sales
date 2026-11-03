import NonOpsDataCard from '@/components/Cards/NonOpsDataCard';
import SingleTextCard from '@/components/Cards/SingleTextCard';
import React from 'react';
import AnalyticsTable from '../AnalyticsTable';

export default function StakeholderIdentification() {
  const stakeholderIdentificationCardText = {
    cardTitle: 'Stakeholder Identification',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const stakeholderIdentificationCardData = [
    {
      cardTitle: 'Total No. of Stakeholders',
      cardValue: 10,
    },
    {
      cardTitle: 'Vulnerable & Marginalized Stakeholders',
      cardValue: 12,
    },
  ];
  const stakeholderIdentificationData = [
    {
      'name of the stakeholder group': 'Name of the stakeholder group',
      'are they identified as vulnerable & marginalized Group ':
        'Are they identified as Vulnerable & Marginalized Group ',
      'channels of communication': 'Channels of communication',
      'frequency of engagement': 'Frequency of Engagement',
      'topics discussed': 'Topics Discussed',
      'concerns addressed': 'Concerns Addressed',
    },
    {
      'name of the stakeholder group': 'Name of the stakeholder group',
      'are they identified as vulnerable & marginalized Group ':
        'Are they identified as Vulnerable & Marginalized Group ',
      'channels of communication': 'Channels of communication',
      'frequency of engagement': 'Frequency of Engagement',
      'topics discussed': 'Topics Discussed',
      'concerns addressed': 'Concerns Addressed',
    },
  ];
  const stakeholderIdentificationColumn = [
    {
      key: 'name of the stakeholder group',
      label: 'Name of the stakeholder group',
    },
    {
      key: 'are they identified as vulnerable & marginalized Group ',
      label: 'Are they identified as Vulnerable & Marginalized Group ',
    },
    {
      key: 'channels of communication',
      label: 'Channels of communication',
    },
    {
      key: 'frequency of engagement',
      label: 'Frequency of Engagement',
    },
    {
      key: 'topics discussed',
      label: 'Topics Discussed',
    },
    {
      key: 'concerns addressed',
      label: 'Concerns Addressed',
    },
  ];
  const boardStakeholderConsultationsCardText = {
    cardTitle: 'Board-Stakeholder Consultations',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const socialTopicsCardText = {
    cardTitle: 'Stakeholder Consultation: Environment & Social Topics',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  const stakeholderEngagementCardText = {
    cardTitle: 'Marginalized Groups Stakeholder Engagement',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };
  return (
    <div>
      <SingleTextCard
        cardData={stakeholderIdentificationCardText}
      />
      <NonOpsDataCard
        cardData={stakeholderIdentificationCardData}
      />
      <AnalyticsTable
        columns={stakeholderIdentificationColumn}
        data={stakeholderIdentificationData}
      />
      <SingleTextCard
        cardData={boardStakeholderConsultationsCardText}
      />
      <SingleTextCard cardData={socialTopicsCardText} />
      <SingleTextCard cardData={stakeholderEngagementCardText} />
    </div>
  );
}
