import IndicatorHeader from '@/components/Cards/IndicatorHeader';
import NonOpsDataCard, {
  INonOpsDataCard,
} from '@/components/Cards/NonOpsDataCard';
import React from 'react';

export default function Monetary() {
  const monetaryCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Cases Appealed',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Total Monetary Charges',
      cardValue: 18,
      cardColumn: 'col-lg-6',
    },
    {
      cardTitle: 'Amount of Penalties (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Amount of Settlement (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Amount of Compounding Fee (in Rs.)',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
  ];

  const nonmonetaryCarddata: INonOpsDataCard[] = [
    {
      cardTitle: 'Total Cases',
      cardValue: 18,
      cardColumn: 'col-lg-12',
    },
    {
      cardTitle: 'Imprisonment Cases',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Punishment Cases',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
    {
      cardTitle: 'Cases Appealed',
      cardValue: 18,
      cardColumn: 'col-lg-4',
    },
  ];

  return (
    <div>
      <IndicatorHeader title="Monetary Charges" />
      <NonOpsDataCard cardData={monetaryCarddata} />
      <IndicatorHeader title="Non-Monetary Charges" />
      <NonOpsDataCard cardData={nonmonetaryCarddata} />
    </div>
  );
}
