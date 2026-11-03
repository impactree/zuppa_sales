'use client';

import React from 'react';
import './DataCard.css';

export interface INonOpsDataCard {
  cardTitle: string;
  cardValue: number;
  cardColumn?: string;
}
export default function NonOpsDataCard({
  cardData,
}: {
  cardData: INonOpsDataCard[];
}) {
  const getColumn = (cardLength: number, index: number) => {
    if (cardLength === 2 || cardLength === 8) {
      return 'col-lg-6';
    }
    if (cardLength === 3 || cardLength === 6) {
      return 'col-lg-4';
    }
    if (cardLength === 4) {
      return index < 3 ? 'col-lg-4' : 'col-lg-12';
    }
    if (cardLength === 5) {
      return index < 3 ? 'col-lg-4' : 'col-lg-6';
    }
    if (cardLength === 7) {
      return index < 6 ? 'col-lg-4' : 'col-lg-12';
    }
    return 'col-lg-12';
  };
  return (
    <div className="row mt-0">
      {cardData?.map((card, index) => (
        <div
          className={`${getColumn(cardData.length, index)} mb-3`}
          key={card?.cardTitle}
        >
          <div
            className="d-flex justify-content-center align-items-center flex-column py-3 bg-white"
            style={{ borderLeft: '3px solid var(--secondary)' }}
          >
            <div className="fw-700 fs-14 fw-semibold pb-1">
              {card?.cardTitle}
            </div>
            <div className="fw-500 fs-14" style={{ color: '#A3AED0' }}>
              {card?.cardValue}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
