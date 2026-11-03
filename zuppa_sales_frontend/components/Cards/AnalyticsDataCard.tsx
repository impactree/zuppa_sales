/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React from 'react';
import './DataCard.css';
import { usePathname } from 'next/navigation';
// import { display } from 'html2canvas/dist/types/css/property-descriptors/display';

export interface INonOpsDataCard {
  cardTitle: string;
  cardValue: number;
}

// function formatAnswer(answer: any): string {
//   if (typeof answer === 'number') {
//     return answer.toFixed(0);
//   }
//   if (typeof answer === 'string') {
//     // If it contains a comma, take first part
//     if (answer.includes(',') || answer.includes('.')) {
//       return Number(answer.split(',')[0]).toFixed(0);
//     }
//     // If it contains space (like "11186090 Litres"), take first word
//     if (answer.includes(' ')) {
//       return answer.split(' ')[0];
//     }
//   }
//   return answer ?? '0';
// }

function formatAnswer(answer: any): string {
  if (typeof answer === 'number') {
    return answer.toFixed(0);
  }

  if (typeof answer === 'string') {
    // If it contains a comma, take first part and format
    if (answer.includes(',')) {
      return Number(answer.split(',')[0]).toFixed(0);
    }

    // If it contains space (like "11186090 Litres"), return full string
    if (answer.includes(' ')) {
      return answer;
    }

    // Else: try to convert to number and format
    return answer !== '' ? Number(answer).toFixed(0) : answer;
  }

  // Default case: return answer or "0"
  return answer ?? '0';
}

export default function AnalyticsDataCard({
  cardData,
}: {
  cardData: INonOpsDataCard | any;
}) {
  const pathname = usePathname();
  const isDeptDashboard = pathname.endsWith('/department_dashboard');

  const param = !isDeptDashboard
    ? cardData?.combined_parameters?.[0]?.custom_parameter?.[0]
      || cardData?.combinedParameters?.[0]?.customParameters?.[0]
      || cardData?.dashboard_combined_parameters?.[0]
        ?.dashboard_custom_parameters?.[0]
    : cardData?.dashboard_combined_parameters?.[0]
      ?.dashboard_custom_parameters?.[0];

  const displayAnswer = formatAnswer(param?.answer);
  const unit = param?.unit || '';

  return (
    <div
      className="card-box d-flex justify-content-center align-items-center flex-column py-3 bg-white m-1"
      style={{ borderLeft: '3px solid var(--secondary)' }}
    >
      <div className="card-title fw-700 fs-14 fw-semibold pb-1">
        {cardData?.title}
      </div>
      <div className="card-answer fw-500 fs-14" style={{ color: '#A3AED0' }}>
        {displayAnswer}
        {' '}
        {unit}
      </div>
    </div>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */

// 'use client';

// import React from 'react';
// import './DataCard.css';
// import { usePathname } from 'next/navigation';

// export interface INonOpsDataCard {
//   cardTitle: string;
//   cardValue: number;
// }
// export default function AnalyticsDataCard({
//   cardData,
// }: {
//   cardData: INonOpsDataCard | any;
// }) {
//   const pathname = usePathname();
//   return (
//     <div
//       className="d-flex justify-content-center align-items-center flex-column py-3 bg-white"
//       style={{ borderLeft: '3px solid var(--secondary)' }}
//     >
//       <div className="fw-700 fs-14 fw-semibold pb-1">{cardData?.title}</div>
//       <div className="fw-500 fs-14" style={{ color: '#A3AED0' }}>
//         {!pathname.endsWith('/department_dashboard')
//           ? cardData?.combined_parameters[0]?.custom_parameter[0]?.answer || 0
//           : cardData?.dashboard_combined_parameters[0]
//             ?.dashboard_custom_parameters[0]?.answer || 0}
//         {' '}
//         {!pathname.endsWith('/department_dashboard')
//           ? cardData?.combined_parameters[0]?.custom_parameter[0]?.unit || ''
//           : cardData?.dashboard_combined_parameters[0]
//             ?.dashboard_custom_parameters[0]?.unit || ''}
//       </div>
//     </div>
//   );
// }
