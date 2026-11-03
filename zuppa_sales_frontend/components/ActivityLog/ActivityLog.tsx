/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-array-index-key */

'use client';

import React, {
  useEffect, useState, useRef, useCallback,
} from 'react';
import Link from 'next/link';
import {
  ChevronRight, Target, ChevronLeft, ChevronsLeft, ChevronsRight, Search, Calendar,
} from 'lucide-react';
import { DataCube } from '@/lib/service';
import Avatar from '../Avatar/Avatar';

interface Activity {
  id: string;
  time: string;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  status: string;
  activityType: string;
  title: string;
  tags?: string[];
  date: string;
  taskId?: string;
}

interface ActivityLogProps {
  apiKey: string;
  accessToken: string;
  initialData?: any;
}

const getStatusStyle = (activityType: string) => {
  const styleMap: { [key: string]: { className: string; borderColor: string } } = {
    TASK_CREATED: { className: 'bg-[#EFF8FF] text-[#175CD3]', borderColor: '#C7D7FE' },
    DATA_CUBE_CREATED: { className: 'bg-[#EFF8FF] text-[#175CD3]', borderColor: '#C7D7FE' },
    DATA_CUBE_CONFIGURED: { className: 'bg-[#F9F5FF] text-[#6941C6]', borderColor: '#E9D7FE' },
    TASK_SUBMITTED: { className: 'bg-[#FDF2FA] text-[#C11574]', borderColor: '#FCCEEE' },
    TASK_REASSIGNED: { className: 'bg-[#FEF3F2] text-[#B42318]', borderColor: '#FECDCA' },
    TASK_APPROVED: { className: 'bg-[#ECFDF3] text-[#027A48]', borderColor: '#ABEFC6' },
    TASK_REJECTED: { className: 'bg-[#FEF3F2] text-[#B42318]', borderColor: '#FECDCA' },
    TASK_COMPLETED: { className: 'bg-[#F0FDFA] text-[#0D9488]', borderColor: '#99F6E4' },
    COMPLETED: { className: 'bg-[#F0FDFA] text-[#0D9488]', borderColor: '#99F6E4' },
  };
  return styleMap[activityType] || { className: 'bg-gray-100 text-gray-700', borderColor: '#D1D5DB' };
};

const formatActivityType = (activityType: string): string => {
  const typeMap: { [key: string]: string } = {
    TASK_CREATED: 'Created',
    DATA_CUBE_CONFIGURED: 'Configured',
    DATA_CUBE_CREATED: 'Created',
    TASK_SUBMITTED: 'Submitted',
    TASK_REASSIGNED: 'Reassigned',
    TASK_APPROVED: 'Approved',
    TASK_REJECTED: 'Rejected',
    TASK_COMPLETED: 'Completed',
    COMPLETED: 'Completed',
  };
  return typeMap[activityType] || activityType.replace(/_/g, ' ');
};

const transformApiData = (apiData: any): Activity[] => {
  const dataArray = apiData?.results || apiData?.data?.results || [];

  if (!Array.isArray(dataArray)) {
    console.error('Results is not an array:', dataArray);
    return [];
  }

  return dataArray.map((item: any) => {
    const tags: string[] = [];
    if (item.task?.site) {
      if (item.task.site.business_unit?.name) {
        tags.push(item.task.site.business_unit.name);
      }
      if (item.task.site.name) {
        tags.push(item.task.site.name);
      }
      if (item.task.site.location) {
        tags.push(item.task.site.location);
      }
    }

    let title = '';
    if (item.activity_type === 'DATA_CUBE_CONFIGURED') {
      title = `Data cube for ${item.datacube?.name || 'Unknown'}`;
    } else if (item.activity_type === 'TASK_CREATED'
      || item.activity_type === 'TASK_SUBMITTED'
      || item.activity_type === 'TASK_REASSIGNED'
      || item.activity_type === 'TASK_APPROVED'
      || item.activity_type === 'TASK_REJECTED'
      || item.activity_type === 'TASK_COMPLETED'
      || item.activity_type === 'COMPLETED') {
      const moduleName = item.task?.module_name || '';
      const frequencyName = item.task?.datacube_frequency?.frequency_name || '';
      if (moduleName && frequencyName) {
        title = `${moduleName} - ${frequencyName}`;
      } else if (moduleName) {
        title = moduleName;
      } else if (frequencyName) {
        title = frequencyName;
      } else {
        title = 'Task';
      }
    } else if (item.activity_type === 'DATA_CUBE_CREATED') {
      const period = item.datacube?.period || item.datacube?.year || item.datacube?.name || '';
      title = `Datacube of ${period}`;
    } else {
      title = item.datacube?.name || 'Activity';
    }

    const dateObj = new Date(item.createdAt);
    const timeFormatted = dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return {
      id: item.id,
      time: timeFormatted,
      date: item.createdAt,
      user: {
        name: item.user?.name || 'Unknown User',
        role: item.user?.role || 'User',
        avatar: item.user?.avatar || '',
      },
      status: formatActivityType(item.activity_type),
      activityType: item.activity_type,
      title,
      tags: tags.length > 0 ? tags : undefined,
      taskId: item.task?.id || undefined,
    };
  });
};

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalCount,
  loading,
  onPageChange,
  onPageSizeChange,
}) => {
  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 ml-6">
          <p className="text-sm text-gray-700">
            Showing
            {' '}
            <span className="font-medium">{startRecord}</span>
            {' '}
            to
            {' '}
            <span className="font-medium">{endRecord}</span>
            {' '}
            of
            {' '}
            <span className="font-medium">{totalCount}</span>
            {' '}
            results
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2" style={{ marginRight: '20px' }}>
            <label htmlFor="pageSize" className="text-sm text-gray-700">
              Show:
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              disabled={loading}
              className="rounded-md border border-gray-300 py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FBA900] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
            </select>
          </div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              type="button"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1 || loading}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">First</span>
              <ChevronsLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            {[...Array(Math.min(5, totalPages))].map((_, idx) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = idx + 1;
              } else if (currentPage <= 3) {
                pageNumber = idx + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + idx;
              } else {
                pageNumber = currentPage - 2 + idx;
              }

              return (
                <button
                  type="button"
                  key={`page-${pageNumber}`}
                  onClick={() => onPageChange(pageNumber)}
                  disabled={loading}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNumber
                    ? 'z-10 border-2 border-[#FBA900] text-[#FBA900] bg-white focus:z-20'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages || loading}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Last</span>
              <ChevronsRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default function ActivityLog({ apiKey, accessToken, initialData }: ActivityLogProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Separate input state from applied filter state
  const [searchInput, setSearchInput] = useState(''); // What user types
  const [appliedSearch, setAppliedSearch] = useState(''); // What's actually used for filtering
  const [selectedDate, setSelectedDate] = useState('');
  const isFirstRun = useRef(true);

  // Fetch activities - now depends on appliedSearch instead of searchInput
  const fetchActivities = useCallback(async (page: number, limit: number = pageSize) => {
    setLoading(true);
    setError(null);

    try {
      const params: any = { page, limit };
      if (appliedSearch) params.search = appliedSearch; // Use appliedSearch
      if (selectedDate) params.created_date = selectedDate;

      const response = await DataCube.getActivityLog(
        apiKey,
        params,
        accessToken,
      );

      if (response?.data) {
        const transformedData = transformApiData(response.data);
        setActivities(transformedData);
        setCurrentPage(response.data.page || page);
        setTotalPages(response.data.totalPages || 1);
        setTotalCount(response.data.count || 0);
        setPageSize(response.data.limit || limit);
      }
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError('Failed to load activity data');
    } finally {
      setLoading(false);
    }
  }, [apiKey, accessToken, appliedSearch, selectedDate, pageSize]);

  // Only fetch when date changes (auto-trigger for date filter)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    fetchActivities(1);
  }, [selectedDate, fetchActivities]);

  // Initial load
  useEffect(() => {
    if (initialData) {
      try {
        const transformedData = transformApiData(initialData);
        setActivities(transformedData);
        setCurrentPage(initialData.page || 1);
        setTotalPages(initialData.totalPages || 1);
        setTotalCount(initialData.count || 0);
        setPageSize(initialData.limit || 10);
        setLoading(false);
      } catch (err) {
        console.error('Error transforming data:', err);
        setError('Failed to process activity data');
        setLoading(false);
      }
    } else {
      fetchActivities(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groupActivitiesByDate = (activitiesList: Activity[]) => {
    const grouped = activitiesList.reduce((acc: { [key: string]: Activity[] }, activity) => {
      const date = new Date(activity.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    }, {});

    return grouped;
  };

  const renderActivities = (activityList: Activity[]) => (
    <div className="relative">
      <div
        className="absolute top-2 bottom-2 w-0.5 bg-gray-200"
        style={{
          left: '84px',
        }}
      />

      <div className="space-y-6">
        {activityList.map((activity) => {
          const ActivityContent = (
            <div className="flex items-start m-3">
              <div className="flex items-center gap-3 border border-gray-200 bg-[#F5F5F580] rounded-l-lg border-r-0 px-3 py-1.5">
                <Avatar
                  name={activity.user.name}
                  size="40"
                  avator={activity.user.avatar}
                  title={activity.user.name}
                />
                <div className="min-w-[140px] pt-3">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{activity.user.name}</span>
                  </div>
                  <p className="text-sm text-gray-500">{activity.user.role}</p>
                </div>
              </div>

              <div className="flex-1 bg-[#F5F5F580] rounded-r-lg border border-gray-200 border-l-0" style={{ padding: '23px 23px' }}>
                <div className="flex items-center gap-6 mb-2">
                  <span
                    className={`flex justify-center px-2 py-1 rounded text-xs font-medium ${getStatusStyle(activity.activityType).className}`}
                    style={{ border: `1px solid ${getStatusStyle(activity.activityType).borderColor}` }}
                  >
                    {activity.status}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{activity.title}</span>
                </div>
                {activity.tags && activity.tags.length > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#EDFCF2] rounded w-fit" style={{ border: '1px solid #AAF0C4' }}>
                    {activity.tags.map((tag, i) => (
                      <React.Fragment key={`${activity.id}-tag-${i}`}>
                        <span className="text-[#087443] text-xs font-medium">
                          {tag}
                        </span>
                        {i < activity.tags!.length - 1 && (
                          <ChevronRight className="w-3 h-3 text-[#087443]" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );

          return (
            <div key={activity.id} className="flex gap-4 relative">
              <div className="flex items-start w-28 relative">
                <span className="text-sm text-gray-500 whitespace-nowrap w-[68px] text-right inline-block" style={{ paddingTop: '46.5px' }}>
                  {activity.time}
                </span>
                <div
                  className="absolute z-10 flex items-center justify-center bg-white"
                  style={{ left: '73px', top: '45px' }}
                >
                  <Target color="#FBA900" size={24} />
                </div>
              </div>

              <div className="flex-1 pb-6">
                {activity.taskId ? (
                  <Link href={`/tasks/${activity.taskId}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                    {ActivityContent}
                  </Link>
                ) : (
                  ActivityContent
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
    fetchActivities(1, newSize);
  };

  // Handle search button click - apply the search
  const handleSearch = () => {
    setAppliedSearch(searchInput); // Update appliedSearch to trigger fetchActivities
    setCurrentPage(1);
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Trigger fetch when appliedSearch changes
  useEffect(() => {
    if (!isFirstRun.current) {
      fetchActivities(1);
    }
  }, [appliedSearch, fetchActivities]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2" />
          <p className="text-gray-500">Loading activity log...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => fetchActivities(1)}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const groupedActivities = groupActivitiesByDate(activities);

  return (
    <div>
      <div className="flex items-center justify-end mb-4 px-6" style={{ marginTop: '-50px' }}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              style={{
                paddingInlineStart: '0.5rem',
              }}
            />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
            />
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 bg-white" type="button">
              <Calendar className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {!activities || activities.length === 0 ? (
        <div className="p-6 pt-0 mb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg text-center flex items-center justify-center" style={{ minHeight: '300px' }}>
            <p className="text-gray-500">No activity logs found</p>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 pt-0">
            {Object.entries(groupedActivities).map(([date, dateActivities]) => (
              <React.Fragment key={date}>
                <div className="mb-6 mt-8 w-max -translate-x-1/2" style={{ marginLeft: '85px' }}>
                  <span
                    className="inline-block px-3 py-1 text-blue-600 text-sm font-medium"
                    style={{
                      backgroundColor: '#EFFFFF',
                      border: '1px solid #B2D0FF',
                      borderRadius: '6px',
                    }}
                  >
                    {date}
                  </span>
                </div>
                {renderActivities(dateActivities)}
              </React.Fragment>
            ))}
          </div>

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalCount={totalCount}
            loading={loading}
            onPageChange={fetchActivities}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </div>
  );
}
