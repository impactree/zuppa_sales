/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import React, {
  useEffect, useState, useCallback,
} from 'react';
import {
  Search, ChevronDown, CheckCircle, Clock, AlertCircle, FileText,
} from 'lucide-react';
import { DataCube, TaskService } from '@/lib/service';
import './FileRepository.css';

interface FileRepositoryItem {
  id: string;
  question_id: string;
  question_title: string;
  question_description: string | null;
  file_url: string;
  datacube_id: string;
  datacube_name: string;
  financial_year: string;
  frequency_name: string;
  business_unit: {
    id: string;
    name: string;
  };
  site: {
    id: string;
    name: string;
    location: string;
  };
  module_name: string;
  indicator_name: string;
  task_id: string;
  task_status: string;
  created_at: string;
  updated_at: string;
}

interface FileRepositoryProps {
  apiKey: string;
  accessToken: string;
}

const getStatusStyle = (status: string) => {
  const statusLower = status?.toLowerCase();
  if (statusLower === 'completed' || statusLower === 'approved') {
    return {
      icon: CheckCircle,
      className: 'status-completed',
      label: 'Completed',
    };
  }
  if (statusLower === 'submitted' || statusLower === 'reviewing') {
    return {
      icon: Clock,
      className: 'status-submitted',
      label: 'Submitted',
    };
  }
  if (statusLower === 'created' || statusLower === 'pending') {
    return {
      icon: AlertCircle,
      className: 'status-pending',
      label: 'Pending',
    };
  }
  return {
    icon: Clock,
    className: 'status-default',
    label: status?.replace(/_/g, ' ') || 'Unknown',
  };
};

export default function FileRepository({ apiKey, accessToken }: FileRepositoryProps) {
  const [items, setItems] = useState<FileRepositoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  // Filter states
  const [searchInput, setSearchInput] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [financialYear, setFinancialYear] = useState('');
  const [businessUnit, setBusinessUnit] = useState('');
  const [siteLocation, setSiteLocation] = useState('');

  // Dropdown open states
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [buDropdownOpen, setBuDropdownOpen] = useState(false);
  const [siteDropdownOpen, setSiteDropdownOpen] = useState(false);

  // Hardcoded financial year options (2016-2017 to 2025-2026)
  const yearOptions = [
    '2016-2017',
    '2017-2018',
    '2018-2019',
    '2019-2020',
    '2020-2021',
    '2021-2022',
    '2022-2023',
    '2023-2024',
    '2024-2025',
    '2025-2026',
  ];

  // Options for dropdowns (populated from API)
  type BuOption = { id: string; name: string; sites: { id: string; name: string }[] };
  const [buOptions, setBuOptions] = useState<BuOption[]>([]);
  const [optionsLoaded, setOptionsLoaded] = useState(false);

  // Compute filtered site options based on selected business unit
  const siteOptions = React.useMemo(() => {
    if (!businessUnit) {
      // Show all sites when no BU is selected
      const allSites: { id: string; name: string }[] = [];
      buOptions.forEach((bu) => {
        bu.sites.forEach((site) => {
          if (!allSites.find((s) => s.id === site.id)) {
            allSites.push(site);
          }
        });
      });
      return allSites;
    }
    // Filter sites for the selected business unit
    const selectedBU = buOptions.find((bu) => bu.id === businessUnit);
    return selectedBU?.sites || [];
  }, [buOptions, businessUnit]);

  // Fetch filter options - business units and sites
  const fetchFilterOptions = useCallback(async () => {
    try {
      // Fetch business units (they contain nested sites)
      const buRes = await TaskService.getBusinessUnitsBasedOnUser(
        apiKey,
        undefined,
        undefined,
        accessToken,
      );
      // console.log('Business Units API Response:', buRes?.data);

      if (buRes?.data?.data) {
        const bus = buRes.data.data.map((bu: any) => {
          const sites = (bu.sites || []).map((site: any) => ({
            id: site.site_id || site.id,
            name: site.site_name || site.name,
          }));
          return {
            id: bu.business_unit_id || bu.id,
            name: bu.business_unit_name || bu.name,
            sites,
          };
        });
        // console.log('Parsed Business Units with sites:', bus);
        setBuOptions(bus);
      }

      setOptionsLoaded(true);
    } catch (err) {
      console.error('Error fetching filter options:', err);
      setOptionsLoaded(true); // Still mark as loaded to show hardcoded years
    }
  }, [apiKey, accessToken]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params: any = {};
      if (appliedSearch) params.search = appliedSearch;
      if (financialYear) params.financial_year = financialYear;
      if (businessUnit) params.business_unit_id = businessUnit;
      if (siteLocation) params.site_id = siteLocation;

      const response = await DataCube.getFileRepository(apiKey, params, accessToken);

      if (response?.data?.success) {
        const data = response.data.data || [];
        setItems(data);
        setTotal(response.data.total || data.length);
      }
    } catch (err) {
      console.error('Error fetching file repository:', err);
      setError('Failed to load file repository data');
    } finally {
      setLoading(false);
    }
  }, [apiKey, accessToken, appliedSearch, financialYear, businessUnit, siteLocation]);

  // Initial load - fetch filter options and data
  useEffect(() => {
    fetchFilterOptions();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch data when filters change
  useEffect(() => {
    if (optionsLoaded) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedSearch, financialYear, businessUnit, siteLocation]);

  const handleSearch = () => {
    setAppliedSearch(searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFileClick = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="file-repo-loading">
        <div className="spinner" />
        <p>Loading file repository...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="file-repo-error">
        <p>{error}</p>
        <button type="button" onClick={() => fetchData()}>Try again</button>
      </div>
    );
  }

  return (
    <div className="file-repo-container">
      {/* Header */}
      <div className="file-repo-header">
        <span className="file-repo-breadcrumb">See all Data logs</span>
        <h2 className="file-repo-title">File Repository</h2>
      </div>

      {/* Search and Filters */}
      <div className="file-repo-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search-input"
          />
          <Search className="search-icon" size={18} onClick={handleSearch} />
        </div>

        {/* Financial Year Dropdown */}
        <div className="filter-dropdown">
          <button
            type="button"
            className="filter-button"
            onClick={(e) => {
              e.stopPropagation();
              setYearDropdownOpen((prev) => !prev);
              setBuDropdownOpen(false);
              setSiteDropdownOpen(false);
            }}
          >
            <span>{financialYear || 'Financial Year'}</span>
            <ChevronDown size={16} />
          </button>
          {yearDropdownOpen && (
            <div className="dropdown-menu">
              <div
                role="option"
                tabIndex={0}
                aria-selected={!financialYear}
                className="dropdown-item"
                onClick={() => {
                  setFinancialYear('');
                  setYearDropdownOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setFinancialYear('');
                    setYearDropdownOpen(false);
                  }
                }}
              >
                All Years
              </div>
              {yearOptions.map((year) => (
                <div
                  key={year}
                  role="option"
                  tabIndex={0}
                  aria-selected={financialYear === year}
                  className="dropdown-item"
                  onClick={() => {
                    setFinancialYear(year);
                    setYearDropdownOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setFinancialYear(year);
                      setYearDropdownOpen(false);
                    }
                  }}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Business Unit Dropdown */}
        <div className="filter-dropdown">
          <button
            type="button"
            className="filter-button"
            onClick={(e) => {
              e.stopPropagation();
              setBuDropdownOpen((prev) => !prev);
              setYearDropdownOpen(false);
              setSiteDropdownOpen(false);
            }}
          >
            <span>{buOptions.find((b) => b.id === businessUnit)?.name || 'Business Unit'}</span>
            <ChevronDown size={16} />
          </button>
          {buDropdownOpen && (
            <div className="dropdown-menu">
              <div
                role="option"
                tabIndex={0}
                aria-selected={!businessUnit}
                className="dropdown-item"
                onClick={() => {
                  setBusinessUnit('');
                  setSiteLocation(''); // Reset site when BU is cleared
                  setBuDropdownOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setBusinessUnit('');
                    setSiteLocation('');
                    setBuDropdownOpen(false);
                  }
                }}
              >
                All Business Units
              </div>
              {buOptions.map((bu) => (
                <div
                  key={bu.id}
                  role="option"
                  tabIndex={0}
                  aria-selected={businessUnit === bu.id}
                  className="dropdown-item"
                  onClick={() => {
                    setBusinessUnit(bu.id);
                    setSiteLocation(''); // Reset site when BU changes
                    setBuDropdownOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setBusinessUnit(bu.id);
                      setSiteLocation('');
                      setBuDropdownOpen(false);
                    }
                  }}
                >
                  {bu.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Site Location Dropdown */}
        <div className="filter-dropdown">
          <button
            type="button"
            className="filter-button"
            onClick={(e) => {
              e.stopPropagation();
              setSiteDropdownOpen((prev) => !prev);
              setYearDropdownOpen(false);
              setBuDropdownOpen(false);
            }}
          >
            <span>{siteOptions.find((s) => s.id === siteLocation)?.name || 'Site Location'}</span>
            <ChevronDown size={16} />
          </button>
          {siteDropdownOpen && (
            <div className="dropdown-menu">
              <div
                role="option"
                tabIndex={0}
                aria-selected={!siteLocation}
                className="dropdown-item"
                onClick={() => {
                  setSiteLocation('');
                  setSiteDropdownOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSiteLocation('');
                    setSiteDropdownOpen(false);
                  }
                }}
              >
                All Sites
              </div>
              {siteOptions.map((site) => (
                <div
                  key={site.id}
                  role="option"
                  tabIndex={0}
                  aria-selected={siteLocation === site.id}
                  className="dropdown-item"
                  onClick={() => {
                    setSiteLocation(site.id);
                    setSiteDropdownOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSiteLocation(site.id);
                      setSiteDropdownOpen(false);
                    }
                  }}
                >
                  {site.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="file-repo-results-count">
        Showing
        {' '}
        {total}
        {' '}
        results
      </div>

      {/* Data Log Entries */}
      <div className="file-repo-list">
        {items.length === 0 ? (
          <div className="file-repo-empty">
            <FileText size={48} />
            <p>No data logs found</p>
          </div>
        ) : (
          items.map((item) => {
            const statusInfo = getStatusStyle(item.task_status);
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={item.id}
                className="file-repo-item"
                onClick={() => handleFileClick(item.file_url)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleFileClick(item.file_url);
                }}
              >
                <div className="item-content">
                  <p className="item-question">{item.question_title}</p>
                  <div className="item-tags-row">
                    <div className="item-tags">
                      <span className="tag tag-module">{item.module_name}</span>
                      <span className="tag tag-frequency">{item.frequency_name}</span>
                      <span className="tag tag-business-unit">{item.business_unit?.name}</span>
                      <span className="tag tag-location">{item.site?.name || item.site?.location}</span>
                    </div>
                    <div className={`item-status ${statusInfo.className}`}>
                      <StatusIcon size={16} />
                      <span>{statusInfo.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
