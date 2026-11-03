import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import React from 'react';
import SingleTextCard from '@/components/Cards/SingleTextCard';

export default function Conflict() {
  const conflictCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Complaints',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Complaints by Directors',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Complaints by KMP',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
  ];

  const conflictCardText = {
    cardTitle: 'Managing conflict of interest',
    cardValue:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  };

  return (
    <div>
      <NonOpsDataCard cardData={conflictCarddata} />
      <SingleTextCard cardData={conflictCardText} />
    </div>
  );
}
