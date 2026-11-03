import React from 'react';
import OpsDataCard, { IOpsCardDta } from '@/components/Cards/OpsDataCard';
import { SlEnergy } from 'react-icons/sl';
import AnalyticsTable from '../AnalyticsTable';

export default function Waste() {
  const eprMandatesData = [
    {
      'epr mandates and circularity':
        "Is EPR applicable to entity's activities?",
      value: 'NA',
    },
    {
      'epr mandates and circularity':
        '(if yes) Is the waste collection plan in line EPR plan submitted to the Pollution Control Boards?',
      value: 'NA',
    },
    {
      'epr mandates and circularity':
        "(if no) What steps are being taken by the organization to align its waste collection plan with the Pollution Control Boards' EPR plan?",
      value: 'NA',
    },
    {
      'epr mandates and circularity':
        'Actions, including circularity measures, taken to prevent waste generation in the organization’s own activities and upstream and downstream in its value chain, and to manage significant impacts from waste generated. ',
      value: 'NA',
    },
  ];
  const eprMandatesColumn = [
    {
      key: 'epr mandates and circularity',
      label: 'EPR Mandates and Circularity',
    },
    {
      key: 'value',
      label: 'Value',
    },
  ];
  const wasteMetricCardData: IOpsCardDta[] = [
    {
      title: 'Waste Generation Trends',
      name: 'Tonnes per year',
      value: 23450,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Waste Disposal Trends',
      name: 'Tonnes per year',
      value: 1523004,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Waste Recovery Trends',
      name: 'Tonnes per year',
      value: 1450,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      cardColumn: 'col-lg-4',
    },
  ];
  return (
    <div>
      <AnalyticsTable
        columns={eprMandatesColumn}
        data={eprMandatesData}
      />
      <OpsDataCard cardData={wasteMetricCardData} />
    </div>
  );
}
