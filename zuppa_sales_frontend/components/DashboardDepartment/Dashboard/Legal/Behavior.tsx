import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import React from 'react';

export default function Behavior() {
  const behaviorCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'No. of Legal actions',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Legal actions resolved',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: '% Legal actions pending resolution',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
  ];

  return (
    <div>
      <NonOpsDataCard cardData={behaviorCarddata} />
    </div>
  );
}
