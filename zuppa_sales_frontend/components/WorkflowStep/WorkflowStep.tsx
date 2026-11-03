'use client';

import { ReactNode } from 'react';

import './WorkflowStep.css';

export interface IWorkflowStepData {
  id: string;
  title: string;
  subtitle?: string;
  icon: ReactNode;
  isCompleted?: boolean;
  isActive?: boolean;
}

export default function WorkflowStep({
  id,
  title,
  subtitle,
  icon,
  isCompleted = false,
  isActive = false,
  cardClass,
  onClick,
}: {
  id: string;
  title: string;
  subtitle?: string;
  icon: ReactNode;
  isCompleted?: boolean;
  isActive?: boolean;
  cardClass?: string;
  onClick?: (stepId: string) => void;
}) {
  const getStepStatus = () => {
    if (isCompleted) return 'completed';
    if (isActive) return 'active';
    return 'pending';
  };

  const getStepStyles = () => {
    const status = getStepStatus();
    const baseStyles = 'bg-white w-100 h-100 rounded-3 px-4 pt-4 pb-3 position-relative cursor-pointer transition-all';

    switch (status) {
      case 'completed':
        return `${baseStyles} border-2 border-success`;
      case 'active':
        return `${baseStyles} border-2 border-primary`;
      default:
        return `${baseStyles} border-2 border-light hover:border-secondary`;
    }
  };

  const getIconStyles = () => {
    const status = getStepStatus();
    const baseStyles = 'p-3 rounded-circle mb-3 d-flex justify-content-center align-items-center';

    switch (status) {
      case 'completed':
        return `${baseStyles} bg-success text-white`;
      case 'active':
        return `${baseStyles} bg-primary text-white`;
      default:
        return `${baseStyles} bg-warning text-white`;
    }
  };

  const handleStepClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div className="mb-3">
      <div
        className={`${cardClass || ''} ${getStepStyles()}`}
        onClick={handleStepClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleStepClick();
          }
        }}
      >
        <div className="d-flex flex-column align-items-center text-center">
          <div className={getIconStyles()}>
            {icon}
          </div>

          {title && (
            <h6 style={{ color: '#2B3674' }} className="fs-14 fw-700 mb-1">
              {title}
            </h6>
          )}

          {subtitle && (
            <p className="mb-0 text-muted" style={{ fontSize: '12px', fontWeight: 400 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
