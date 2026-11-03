// Main Grievances Component
import React, { useState, Suspense } from 'react';

// Lazy load components
const BoardManagement = React.lazy(
  () => import(
    '@/components/DashboardDepartment/Dashboard/BoardandPolicyManagement/BoardManagement'
  ),
);
const GovernanceCommittee = React.lazy(
  () => import(
    '@/components/DashboardDepartment/Dashboard/BoardandPolicyManagement/GovernanceCommittee'
  ),
);
const CSRProjects = React.lazy(
  () => import(
    '@/components/DashboardDepartment/Dashboard/BoardandPolicyManagement/CSRProjects'
  ),
);

export default function BoardandPolicyManagement() {
  const [selectedOption, setSelectedOption] = useState('board');

  const headerOptions = [
    {
      id: 'board',
      title: 'Board & Management',
    },
    {
      id: 'governance',
      title: 'Governance Committee',
    },
    {
      id: 'projects',
      title: 'CSR Projects',
    },
  ];

  // Function to render the appropriate component based on selection
  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'board':
        return <BoardManagement />;
      case 'governance':
        return <GovernanceCommittee />;
      case 'projects':
        return <CSRProjects />;
      default:
        return <BoardManagement />;
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
            /* eslint-disable jsx-a11y/click-events-have-key-events */
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
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = '#ffffff';
                  target.style.color = '#495057';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedOption !== option.id) {
                  const target = e.target as HTMLElement;
                  target.style.backgroundColor = 'transparent';
                  target.style.color = '#6c757d';
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
