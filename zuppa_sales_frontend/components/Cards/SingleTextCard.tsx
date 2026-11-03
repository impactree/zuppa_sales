import React from 'react';

export interface ISingleCardText {
  cardTitle: string;
  cardValue: string;
}
export default function SingleTextCard({
  cardData,
}: {
  cardData: ISingleCardText;
}) {
  return (
    <div className="rounded-2 mb-3" style={{ backgroundColor: '#e7e7e7' }}>
      <h6 className="m-0 p-3 fs-14 fw-600">{cardData?.cardTitle}</h6>
      <p className="m-0 bg-white rounded-2 p-3">{cardData?.cardValue}</p>
    </div>
  );
}
