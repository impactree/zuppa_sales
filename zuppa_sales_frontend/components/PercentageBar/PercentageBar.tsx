'use client';

import { useEffect, useState, useMemo } from 'react';

interface PercentageBarProps {
  value: number;
  prefixValueShown?: boolean;
  suffixValueShown?: boolean;
}

const getProgressColor = (value: number) => {
  if (value === 100) return '#5DD0A7'; // Green
  if (value > 25) return '#FBA900'; // Yellow
  return '#E92626'; // Red
};

const PercentageBar: React.FC<PercentageBarProps> = ({
  value,
  prefixValueShown,
  suffixValueShown,
}) => {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompleted(value);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  const progressColor = useMemo(() => getProgressColor(value), [value]);

  return (
    <div className="d-flex align-items-center mb-1">
      {prefixValueShown && (
        <span className="me-2 fw-500" style={{ color: progressColor }}>
          {`${completed}%`}
        </span>
      )}
      <div
        className="progress"
        style={{
          width: '100%',
          backgroundColor: '#e0e0e0',
          borderRadius: '5px',
          overflow: 'hidden',
          height: '15px',
        }}
      >
        <div
          className="progress-value"
          style={{
            width: `${completed}%`,
            height: '10px',
            backgroundColor: progressColor,
            transition: 'width 4s ease-in-out',
          }}
        />
      </div>
      {suffixValueShown && (
        <span className="ms-2 fw-500" style={{ color: progressColor }}>
          {`${completed}%`}
        </span>
      )}
    </div>
  );
};

export default PercentageBar;
