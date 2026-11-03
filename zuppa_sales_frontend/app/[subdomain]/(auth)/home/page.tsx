/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint jsx-a11y/media-has-caption: off */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic';
import OpsDataCard from '@/components/Cards/OpsDataCard';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/PageHeaderWrapper';
import DatacubeSelector from '@/components/DatacubeSelector/DatacubeSelector';
import { auth } from '@/lib/auth';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { IUser } from '@/lib/interface/IUser.interface';
import { IMeta } from '@/lib/interface/IMeta.interface';
import { DataCube, ReportService, UserService } from '@/lib/service';
import { redirect } from 'next/navigation';
import {
  FaBuilding,
  FaIndustry,
  FaChartBar,
  FaCubes,
  FaDatabase,
  FaUserPlus,
  FaFileAlt,
} from 'react-icons/fa';
import { SlEnergy } from 'react-icons/sl';
import './Landingpage.css';
// import Chart from '@/components/Charts/Chart';
const Chart = dynamic(() => import('@/components/Charts/Chart'), {
  ssr: false,
  loading: () => (
    <div className="mb-3">
      <div className="bg-white w-100 h-100 rounded-3 px-4 pt-4 pb-3">
        <div
          style={{
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>Loading chart...</p>
        </div>
      </div>
    </div>
  ),
});

interface PageProps {
  searchParams: { datacubeId?: string };
}

// Helper function to format date
const formatTargetDate = (dateString: any) => {
  if (!dateString) return 'Not set';

  try {
    const date = new Date(dateString);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch (error) {
    return 'Invalid date';
  }
};

// Helper function to get days left display
const getDaysLeftDisplay = (daysLeft: any) => {
  const days = Number(daysLeft) || 0;

  if (days <= 7) {
    return {
      display: `${days} Days`,
      badgeClass: 'bg-danger',
      textClass: 'text-danger',
    };
  }
  if (days <= 30) {
    return {
      display: `${days} Days`,
      badgeClass: 'bg-warning',
      textClass: 'text-warning',
    };
  }
  return {
    display: `${days} Days`,
    badgeClass: 'bg-info',
    textClass: 'text-info',
  };
};

export default async function page({ searchParams }: PageProps) {
  const session = await auth();
  if (!session) {
    return redirect('/sign_in');
  }
  const token = (session?.user as { accessToken: string })?.accessToken;
  const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;

  const userResponse = await UserService.getCurrentUser(apiKey, token);
  const { user, success } = userResponse?.data as {
    user: IUser;
    success: boolean;
  };

  if (!success) {
    return redirect('/sign_in');
  }

  if (session !== null) {
    switch (user?.account?.current_onboarding_stage) {
      case 0:
        return redirect('/company_profile/company_information');
      case 1:
        return redirect('/company_profile/business_unit');
      case 2:
        return redirect('/company_profile/standard_regulations');
      case 3:
        return redirect('/company_profile/invite_user');
      default:
        break;
    }
  }

  const datacubeResponse = await DataCube.getDatacubes(apiKey, {}, token);
  const { datacubes, meta } = datacubeResponse?.data as {
    datacubes: IDataCube[];
    meta: IMeta;
  };

  // Get selected datacube ID from searchParams or use first datacube
  const selectedDatacubeId = searchParams.datacubeId || datacubes?.[0]?.id;

  // Initialize variables for API responses with default values
  let taskData = {
    completedTasks: 0,
    totalTasks: 0,
  };

  let summaryData = {
    totalReports: 0,
    completedCount: 0,
    overdueCount: 0,
    inProcessCount: 0,
    targetDate: null,
    estimateDaysLeft: 0,
  };

  const homeData = {
    scope1: 0,
    scope2: 0,
    scope3: 0,
    totalManpower: 0,
    turnover: 0,
    ltifr: 0,
  };

  // Initialize chart data variables
  const genderChartData = { male: 0, female: 0 }; // defaults
  const employeeChartData = { male: 0, female: 0 }; // defaults

  // Fetch data if datacube is selected and datacubes exist
  if (selectedDatacubeId && datacubes?.length > 0) {
    try {
      // Fetch tasks data
      const res = await DataCube.getTaskProgress(
        selectedDatacubeId,
        apiKey,
        {},
        token,
      );
      const taskResponse = res?.data as {
        data: any;
      };

      // Use fetched data or keep defaults if null/undefined
      if (taskResponse?.data) {
        taskData = {
          completedTasks: taskResponse.data.completedTasks || 0,
          totalTasks: taskResponse.data.totalTasks || 0,
        };
      }

      // Fetch Home Page chart data
      const homeRes = await DataCube.getHomePageCharts(
        selectedDatacubeId,
        apiKey,
        {},
        token,
      );
      const homeChartResponse = homeRes?.data as {
        data: any;
      };

      // Parse the response array to extract values
      if (
        homeChartResponse?.response
        && Array.isArray(homeChartResponse.response)
      ) {
        homeChartResponse.response.forEach((item: any) => {
          // Check if it's a card widget type
          if (item.widget_type === 'card' && item.calculated_value) {
            const value = item.calculated_value;

            // Parse the calculated value - remove any text and convert to number
            const numericValue = typeof value === 'string'
              ? parseFloat(value.replace(/[^0-9.-]/g, ''))
              : parseFloat(value);

            switch (item.custom_parameter_id) {
              case '17112fd9-cca9-4e6f-920d-d663a513016e': // Scope 1
                homeData.scope1 = Number.isNaN(numericValue) ? 0 : numericValue;
                break;
              case '63cb662c-b620-459c-932c-14a652baab19': // scope 3
                homeData.scope3 = Number.isNaN(numericValue) ? 0 : numericValue;
                break;
              case 'de6c89ef-cb45-4bc8-a25f-223e4b51e111': // Total Manpower
                homeData.totalManpower = Number.isNaN(numericValue)
                  ? 0
                  : numericValue;
                break;
              case '3844102c-9199-479d-86cb-b99184075148': // LTIFR
                homeData.ltifr = Number.isNaN(numericValue) ? 0 : numericValue;
                break;
              case '3ab7a001-9296-470c-bfa2-433d8f38c530': // Turnover (convert rupees to crores)
                homeData.turnover = Number.isNaN(numericValue) ? 0 : Math.round((numericValue / 10000000) * 100) / 100;
                break;
              default:
                break;
            }
          }

          // Check if it's a chart widget type
          if (
            item.widget_type === 'chart'
            && item.combinedParams
            && Array.isArray(item.combinedParams)
          ) {
            // Gender Coverage Chart - combined_parameter_id: f4653299-aca5-4088-a9ef-e555df0c5914
            if (
              item.combined_parameter_id
              === 'f4653299-aca5-4088-a9ef-e555df0c5914'
            ) {
              item.combinedParams.forEach((param: any) => {
                const value = parseFloat(param.calculated_value);
                if (!Number.isNaN(value)) {
                  // First parameter is Male (custom_parameter_id: 75213d18-96d3-405c-b846-f46b1c395c5c)
                  if (
                    param.custom_parameter_id
                    === '75213d18-96d3-405c-b846-f46b1c395c5c'
                  ) {
                    genderChartData.male = value;
                  }
                  // Second parameter is Female (custom_parameter_id: 79b09ec9-4999-42d5-aa5b-05f1867118a6)
                  if (
                    param.custom_parameter_id
                    === '79b09ec9-4999-42d5-aa5b-05f1867118a6'
                  ) {
                    genderChartData.female = value;
                  }
                }
              });
            }

            // Employee Coverage Chart - combined_parameter_id: 9b0328d0-93ab-4479-aa15-350a2ce79335
            if (
              item.combined_parameter_id
              === '9b0328d0-93ab-4479-aa15-350a2ce79335'
            ) {
              item.combinedParams.forEach((param: any) => {
                const value = parseFloat(param.calculated_value);
                if (!Number.isNaN(value)) {
                  // First parameter is Male (custom_parameter_id: bccc7dc8-0ebe-47f7-b4cd-46ce277e6791)
                  if (
                    param.custom_parameter_id
                    === 'bccc7dc8-0ebe-47f7-b4cd-46ce277e6791'
                  ) {
                    employeeChartData.male = value;
                  }
                  // Second parameter is Female (custom_parameter_id: c256fbdb-aff1-420b-ba65-b2d9d240b159)
                  if (
                    param.custom_parameter_id
                    === 'c256fbdb-aff1-420b-ba65-b2d9d240b159'
                  ) {
                    employeeChartData.female = value;
                  }
                }
              });
            }
          }
        });
      }

      // Fetch report summary data
      const summaryResponse = await ReportService.getReportSummary(
        selectedDatacubeId,
        apiKey,
        token,
      );
      const summaryResponseData = summaryResponse?.data as {
        data: any;
      };

      // Use fetched data or keep defaults if null/undefined
      if (summaryResponseData?.data) {
        summaryData = {
          totalReports: summaryResponseData.data.totalReports || 0,
          completedCount: summaryResponseData.data.completedCount || 0,
          overdueCount: summaryResponseData.data.overdueCount || 0,
          inProcessCount: summaryResponseData.data.inProcessCount || 0,
          targetDate: summaryResponseData.data.targetDate || null,
          estimateDaysLeft: summaryResponseData.data.estimateDaysLeft || 0,
        };
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Keep default values in case of error
    }
  }

  // Determine task status based on completed vs total
  const isTaskCompleted = taskData?.completedTasks === taskData?.totalTasks
    && taskData?.totalTasks > 0;
  const taskStatusLabel = isTaskCompleted ? 'Completed' : 'Process';
  const taskStatusBadgeClass = isTaskCompleted ? 'bg-success' : 'bg-secondary';

  // Calculate progress counts for datacubes
  const inProgressCount = datacubes?.filter((item) => item?.status !== 'REPORT_GENERATED')?.length
    || 0;
  const completedCount = datacubes?.filter((item) => item?.status === 'REPORT_GENERATED')?.length
    || 0;

  // Format target date and days left
  const formattedTargetDate = formatTargetDate(summaryData?.targetDate);
  const daysLeftInfo = getDaysLeftDisplay(summaryData?.estimateDaysLeft);

  const workflowSteps = [
    {
      title: 'Company Details',
      icon: <FaBuilding size={24} color="var(--secondary)" />,
      stepNumber: 1,
    },
    {
      title: 'Business Unit',
      icon: <FaIndustry size={24} color="var(--secondary)" />,
      stepNumber: 2,
    },
    {
      title: 'Invite Users',
      icon: <FaUserPlus size={24} color="var(--secondary)" />,
      stepNumber: 3,
    },
    {
      title: 'Emission Database',
      icon: <FaDatabase size={24} color="var(--secondary)" />,
      stepNumber: 4,
    },
    {
      title: 'Data Cubes',
      icon: <FaCubes size={24} color="var(--secondary)" />,
      stepNumber: 5,
    },
    {
      title: 'Analytics & Dashboard',
      icon: <FaChartBar size={24} color="var(--secondary)" />,
      stepNumber: 6,
    },
    {
      title: 'Reports',
      icon: <FaFileAlt size={24} color="var(--secondary)" />,
      stepNumber: 7,
    },
  ];

  const metricCardData = [
    {
      title: 'Scope 1',
      name: '',
      value: homeData.scope1,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      suffixUnit: 't CO2e',
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Scope 2',
      name: '',
      value: 0,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      suffixUnit: 't CO2e',
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Scope 3',
      name: '',
      value: homeData.scope3,
      icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      suffixUnit: 't CO2e',
      cardColumn: 'col-lg-4',
    },
  ];

  const scope2CardData = [
    {
      title: 'Total Manpower',
      name: '',
      value: homeData.totalManpower,
      // icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      suffixUnit: '',
      cardColumn: 'col-lg-4',
    },
    {
      title: 'Turnover (in Rs.)',
      name: '',
      value: homeData.turnover,
      // icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      suffixUnit: 'Crores',
      cardColumn: 'col-lg-4',
    },
    {
      title: 'LTIFR',
      name: '',
      value: homeData.ltifr,
      // icon: <SlEnergy className="" size={18} color="var(--secondary)" />,
      // suffixUnit: 'Crores',
      cardColumn: 'col-lg-4',
    },
  ];

  const genderCategories = ['Male', 'Female'];
  const genderSeries = [genderChartData.male, genderChartData.female];

  const employeeCategories = ['Male', 'Female'];
  const employeeSeries = [employeeChartData.male, employeeChartData.female];

  const customChartCategories = [
    'Apr',
    'May',
    'June',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
  ];
  const customChartSeries = [
    {
      name: 'Hiring',
      // data: [8, 12, 12, 14, 18, 22, 6, 10, 25, 35, 20, 17],
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: 'Attrition',
      // data: [6, 12, 8, 15, 12, 4, 6, 8, 6, 13, 10, 14],
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  return (
    <PageHeaderWrapper title="">
      <div>
        {/* Workflow Steps Section - Only show if datacubes length is 0 */}
        {datacubes?.length === 0 && (
          <>
            <small className="text-muted">Steps to be followed</small>
            <div className="workflow-steps-container mb-4 mt-2">
              <div className="workflow-steps-row">
                {workflowSteps.map((step, index) => (
                  <div key={step?.title} className="workflow-step-item">
                    <div className="workflow-step-card">
                      {index < workflowSteps.length - 1 && (
                        <div className="step-number-badge">
                          {step.stepNumber}
                        </div>
                      )}
                      <div className="step-icon-wrapper">{step.icon}</div>
                      <h6 className="step-title">{step.title}</h6>
                      {index < workflowSteps.length - 1 && (
                        <div className="step-arrow">
                          <svg
                            width="45"
                            height="30"
                            viewBox="0 0 140 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 10 H120 L120 0 L140 15 L120 30 L120 20 H0 Z"
                              fill="#31D568"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Financial Year Selector */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">Financial Year</h5>
                <small className="text-muted">
                  Categorizing transactions by financial records
                </small>
              </div>
              <DatacubeSelector
                datacubes={datacubes}
                selectedDatacubeId={selectedDatacubeId}
              />
            </div>
          </div>
        </div>

        {/* Existing emissions data cards */}
        <OpsDataCard cardData={metricCardData} />

        <OpsDataCard cardData={scope2CardData} />

        {/* Existing charts */}
        <div className="row mb-3">
          <div className="col-lg-6">
            <Chart
              type="pie"
              cardClass=""
              title="Overall Gender Coverage"
              categories={genderCategories}
              series={genderSeries}
              isValueFilter
            />
          </div>
          <div className="col-lg-6">
            <Chart
              type="pie"
              cardClass=""
              title="Employees and Workers Coverage"
              categories={employeeCategories}
              series={employeeSeries}
              isValueFilter
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-lg-12">
            <Chart
              type="bar"
              cardClass=""
              title="Hiring vs Attrition"
              categories={customChartCategories}
              series={customChartSeries}
              isValueFilter
            />
          </div>
        </div>

        {/* Data Cubes Progress Section */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="data-cubes-progress-card">
                  <div className="progress-left">
                    <div className="progress-icon">
                      <FaCubes size={24} color="var(--warning)" />
                    </div>
                    <div>
                      <h6 className="mb-0">Data Cubes</h6>
                    </div>
                  </div>
                  <div className="progress-right">
                    <div className="status-box">
                      <span className="status-badge">On Process</span>
                      <span className="status-count text-warning">
                        {inProgressCount}
                        /
                        {meta?.totalcount || 0}
                      </span>
                    </div>
                    <div className="status-box">
                      <span className="status-badge">Completed</span>
                      <span className="status-count text-warning">
                        {completedCount}
                        /
                        {meta?.totalcount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Year Summary Cards - Separate Individual Cards */}
        <div className="row mb-0">
          <div className="col-12">
            {/* First Row - Summary Cards */}
            <div className="row mb-1">
              <div className="col-lg-3 col-md-6 mb-3">
                <div className="summary-card">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="summary-icon bg-primary-light me-3">
                        <span className="text-primary">📋</span>
                      </div>
                      <h6>Reports :</h6>
                    </div>
                    <div>
                      <h4 className="text-dark">
                        {summaryData?.totalReports || 0}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <div className="summary-card">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="summary-icon bg-warning-light me-3">
                        <span className="text-warning">⏳</span>
                      </div>
                      <h6>In Process :</h6>
                    </div>
                    <div>
                      <h4>
                        <span className="text-warning">
                          {summaryData?.completedCount || 0}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <div className="summary-card">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="summary-icon bg-danger-light me-3">
                        <span className="text-danger">⚠️</span>
                      </div>
                      <h6>Overdue :</h6>
                    </div>
                    <div>
                      <h4>
                        <span className="text-warning">
                          {summaryData?.overdueCount || 0}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-3">
                <div className="summary-card">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="summary-icon bg-success-light me-3">
                        <span className="text-success">✓</span>
                      </div>
                      <h6>Completed :</h6>
                    </div>
                    <div>
                      <h4>
                        <span className="text-warning">
                          {summaryData?.inProcessCount || 0}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row - Task Status Cards */}
            <div className="row mb-1">
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="task-status-card">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="task-icon me-3">
                        <span>📊</span>
                      </div>
                      <h6>Task Status :</h6>
                    </div>
                    <div>
                      <div className="d-flex align-items-center">
                        <span className="text-warning">
                          {taskData.completedTasks}
                        </span>
                        <span className="text-dark">
                          /
                          {' '}
                          {taskData.totalTasks}
                        </span>
                        <span className={`badge ${taskStatusBadgeClass}`}>
                          {taskStatusLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="task-status-card">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="task-icon me-3">
                        <span>📅</span>
                      </div>
                      <h6>Estimated Days Left :</h6>
                    </div>
                    <div>
                      <div className="d-flex align-items-center">
                        <span className={`h5 me-2 ${daysLeftInfo.textClass}`}>
                          {daysLeftInfo.display}
                        </span>
                        <span className={`badge ${daysLeftInfo.badgeClass}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-3">
                <div className="task-status-card">
                  <div className="d-flex align-items-center">
                    <div>
                      <div className="task-icon me-3">
                        <span>🎯</span>
                      </div>
                      <h6>Target :</h6>
                    </div>
                    <div>
                      <div className="d-flex align-items-center">
                        <span className="h5 me-2">{formattedTargetDate}</span>
                        <span className="badge bg-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageHeaderWrapper>
  );
}
