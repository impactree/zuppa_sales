/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePathname } from 'next/navigation';
import React from 'react';

export interface ISingleCardText {
  cardTitle: string;
  cardValue: string;
}
export default function AnalyticsTextArea({
  cardData,
}: {
  cardData: ISingleCardText | any;
}) {
  const pathname = usePathname();
  return (
    <div className="rounded-2 m-1" style={{ backgroundColor: '#e7e7e7' }}>
      <h6 className="m-0 p-3 fs-14 fw-600">{cardData?.title}</h6>
      <p className="m-0 bg-white rounded-2 p-3">
        {!pathname.startsWith('/department_dashboard')
          ? cardData?.combined_parameters?.[0]?.custom_parameter?.[0]?.answer
            || 'Nil'
          : cardData?.dashboard_combined_parameters[0]
            ?.dashboard_custom_parameters?.[0]?.answer || 'Nil'}
      </p>
    </div>
  );
}
