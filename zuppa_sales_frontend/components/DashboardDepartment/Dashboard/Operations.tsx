/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState, Suspense } from 'react';

// Lazy load components
const OrganizationOverview = React.lazy(
  () => import(
    '@/components/DashboardDepartment/Dashboard/Operations/OrganizationOverview'
  ),
);
const Scope1 = React.lazy(
  () => import('@/components/DashboardDepartment/Dashboard/Operations/Scope1'),
);
const Scope2 = React.lazy(
  () => import('@/components/DashboardDepartment/Dashboard/Operations/Scope2'),
);
const Scope3 = React.lazy(
  () => import('@/components/DashboardDepartment/Dashboard/Operations/Scope3'),
);
const Waste = React.lazy(
  () => import('@/components/DashboardDepartment/Dashboard/Operations/Waste'),
);
const Water = React.lazy(
  () => import('@/components/DashboardDepartment/Dashboard/Operations/Water'),
);

export default function Operations() {
  const [selectedOption, setSelectedOption] = useState('overview');

  const headerOptions = [
    {
      id: 'overview',
      title: 'Organization Overview',
    },
    {
      id: 'scope1',
      title: 'Scope 1',
    },
    {
      id: 'scope2',
      title: 'Scope 2',
    },
    {
      id: 'scope3',
      title: 'Scope 3',
    },
    {
      id: 'water',
      title: 'Water',
    },
    {
      id: 'waste',
      title: 'Waste',
    },
  ];

  // Function to render the appropriate component based on selection
  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'overview':
        return <OrganizationOverview />;
      case 'scope1':
        return <Scope1 />;
      case 'scope2':
        return <Scope2 />;
      case 'scope3':
        return <Scope3 />;
      case 'water':
        return <Water />;
      case 'waste':
        return <Waste />;
      default:
        return <OrganizationOverview />;
    }
  };

  return (
    <div>
      {/* Header with tab-style navigation */}
      <div className="mb-4">
        <div
          className="d-flex border-bottom"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          {headerOptions.map((option, index) => (
            <div
              key={option.id}
              className={`tab-item ${selectedOption === option.id ? 'active' : ''}`}
              onClick={() => setSelectedOption(option.id)}
              style={{
                flex: '1',
                textAlign: 'center',
                padding: '12px 16px',
                cursor: 'pointer',
                borderBottom:
                  selectedOption === option.id
                    ? '3px solid #f39c12'
                    : '3px solid transparent',
                backgroundColor:
                  selectedOption === option.id ? '#FFFDED' : 'transparent',
                color: selectedOption === option.id ? '#000000' : '#6c757d',
                fontWeight: selectedOption === option.id ? '600' : '500',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                borderRight:
                  index < headerOptions.length - 1
                    ? '1px solid #e9ecef'
                    : 'none',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (selectedOption !== option.id) {
                  (e.target as HTMLElement).style.backgroundColor = '#ffffff';
                  (e.target as HTMLElement).style.color = '#495057';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedOption !== option.id) {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  (e.target as HTMLElement).style.color = '#6c757d';
                }
              }}
            >
              {option.title}
            </div>
          ))}
        </div>
      </div>

      {/* Render the selected component with Suspense */}
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        {renderSelectedComponent()}
      </Suspense>

      <style jsx>
        {`
          .tab-item {
            user-select: none;
            white-space: nowrap;
          }

          .tab-item:hover {
            transform: translateY(-1px);
          }

          .tab-item.active {
            box-shadow: 0 2px 4px rgba(243, 156, 18, 0.1);
          }

          @media (max-width: 768px) {
            .tab-item {
              font-size: 12px;
              padding: 10px 8px;
            }
          }
        `}
      </style>
    </div>
  );
}
