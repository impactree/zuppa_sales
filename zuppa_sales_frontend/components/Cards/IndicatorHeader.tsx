import React from 'react';

export default function IndicatorHeader({ title }: { title: string }) {
  return (
    <h4
      className="fs-16 fw-700 text-center py-3 rounded-2 mb-1 mt-2"
      style={{ backgroundColor: '#FFFDED' }}
    >
      {title}
    </h4>
  );
}
