import React from 'react';
import OpsDataCard, { IOpsCardDta } from '@/components/Cards/OpsDataCard';
import { SlEnergy } from 'react-icons/sl';
import AnalyticsTable from '../AnalyticsTable';

export default function Water() {
  const interactionsWithWaterData = [
    {
      'interactions with water as a resource':
        'Give a brief description of how the organization withdraws water and from where it is withdrawn',
      value: 'nil',
    },
    {
      'interactions with water as a resource':
        'Give a brief description of how the organization discharges water and where it is discharged',
      value: 'nil',
    },
    {
      'interactions with water as a resource':
        'Give a brief description of how the organization consumes water and where it is consumed',
      value: 'nil',
    },
    {
      'interactions with water as a resource':
        'What are the water related impacts that the organization contributes to, or that are directly linked to its operations',
      value: 'nil',
    },
    {
      'interactions with water as a resource':
        'Change in water storage, if water storage has been identified as having a significant water-related impact',
      value: 'nil',
    },
    {
      'interactions with water as a resource':
        'Give an explanation of the process for setting any water-related goals and targets that are part of the organization’s approach to managing water and effluents, and how they relate to public policy and the local context of each area with water stress.',
      value: 'nil',
    },
  ];
  const interactionsWithWaterColumn = [
    {
      key: 'interactions with water as a resource',
      label: 'Interactions with water as a resource',
    },
    {
      key: 'value',
      label: 'Value',
    },
  ];
  const managementOfWaterData = [
    {
      'management of water related impacts':
        'Describe how water-related impacts are addressed, including how the organization works with stakeholders to steward water as a shared resource, and how it engages with suppliers or customers with significant water-related impacts.',
      value: 'nil',
    },
    {
      'management of water related impacts':
        'Does the organization monitor quality of effluent discharge?',
      value: 'nil',
    },
    {
      'management of water related impacts':
        '(if yes) How are the standards for facilities operating in locations with no local discharge requirements determined',
      value: 'nil',
    },
    {
      'management of water related impacts':
        '(if yes) Description any internally developed water quality standards or guidelines',
      value: 'nil',
    },
    {
      'management of water related impacts':
        '(if yes) Description of any sector-specific standards that are considered',
      value: 'nil',
    },
    {
      'management of water related impacts':
        '(if yes) Is the profile of the receiving water body considered?',
      value: 'nil',
    },
  ];
  const managementOfWaterColumn = [
    {
      key: 'management of water related impacts',
      label: 'Management of water related impacts',
    },
    {
      key: 'value',
      label: 'Value',
    },
  ];
  const waterMetricCardData: IOpsCardDta[] = [
    {
      title: 'Water Withdrawal Trends',
      name: 'Liters per year',
      value: 23450,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Water Consumption Trends',
      name: 'Liters per year',
      value: 1523004,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Water Discharge Trends',
      name: 'Liters per year',
      value: 1450,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
  ];
  return (
    <div>
      <AnalyticsTable
        columns={interactionsWithWaterColumn}
        data={interactionsWithWaterData}
      />
      <AnalyticsTable
        columns={managementOfWaterColumn}
        data={managementOfWaterData}
      />
      <OpsDataCard cardData={waterMetricCardData} />
    </div>
  );
}
