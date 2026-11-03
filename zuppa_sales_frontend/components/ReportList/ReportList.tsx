/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint no-unused-vars: off */
/* eslint react-hooks/exhaustive-deps: off */

'use client';

import { useRouter } from 'next/navigation';
import { Dropdown } from 'react-bootstrap';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';
import Select from 'react-select';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import React, { useEffect, useState, useMemo } from 'react';
import { ReportService, DataCube } from '@/lib/service';
import toast from 'react-hot-toast';
import Avatar from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import { CustomStyles } from '../CustomStyles/CustomStyles';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import PercentageBar from '../PercentageBar/PercentageBar';
import { ActionType, BreadCrumbProps } from '../types';
import './ReportList.css';
import { useModal } from '../Modal/Context';
import BlockOrUnblockOrDelete from '../BlockOrUnblockOrDelete/BlockOrUnblockOrDelete';

export default function ReportList({
  datacubes,
  token,
  apiKey,
}: {
  datacubes?: IDataCube[];
  token: string;
  apiKey: string;
}) {
  const router = useRouter();

  // Per-standard states
  const [reportFinancialYears, setReportFinancialYears] = useState<{
    [key: string]: any;
  }>({});
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [errors, setErrors] = useState<{
    [key: string]: { report_year: string };
  }>({});
  const [reports, setReports] = useState<any>([]);
  const [filteredReports, setFilteredReports] = useState<any>([]);

  // Loading state for reports fetching
  const [isLoadingReports, setIsLoadingReports] = useState<boolean>(true);

  // Action + modal states
  const [actionType, setActionType] = useState<ActionType>(null);
  const [currentReport, setCurrentReport] = useState<any | undefined>();

  // Navigation loading
  const [navigatingReportId, setNavigatingReportId] = useState<string | null>(
    null,
  );

  // Filters
  const [selectedFinancialYear, setSelectedFinancialYear] = useState<any>(null);
  const [selectedStandard, setSelectedStandard] = useState<any>(null);

  const hideModal = useModal({});

  // Standards with their financial years
  const reportCarddata = useMemo(() => {
    if (!datacubes?.length) return [];

    const uniqueStandards = new Map();

    datacubes.forEach((datacube) => {
      datacube.standards?.forEach((standard) => {
        if (!uniqueStandards.has(standard.id)) {
          uniqueStandards.set(standard.id, {
            id: standard.id,
            standard_name: standard.name,
            standard_avatar_url: standard.logo_url || '',
            is_active: standard.is_active,
            is_deleted: standard.is_deleted,
            financialYears: [],
          });
        }

        const standardData = uniqueStandards.get(standard.id);
        if (
          !standardData.financialYears.find(
            (fy: any) => fy.value === datacube.id,
          )
        ) {
          standardData.financialYears.push({
            label: datacube.financial_year,
            value: datacube.id,
          });
        }
      });
    });

    return Array.from(uniqueStandards.values()).filter(
      (s) => s.is_active && !s.is_deleted,
    );
  }, [datacubes]);

  // Filters (financial years + standards)
  const availableFinancialYears = useMemo(() => {
    const uniqueYears = [...new Set(reports.map((r: any) => r.financial_year))];
    return uniqueYears.map((y) => ({ label: y, value: y }));
  }, [reports]);

  const availableStandards = useMemo(() => {
    const uniqueStandards = [...new Set(reports.map((r: any) => r.standard))];
    return uniqueStandards.map((s) => ({ label: s, value: s }));
  }, [reports]);

  const applyFilters = () => {
    let filtered = [...reports];
    if (selectedFinancialYear) {
      filtered = filtered.filter(
        (r) => r.financial_year === selectedFinancialYear.value,
      );
    }
    if (selectedStandard) {
      filtered = filtered.filter((r) => r.standard === selectedStandard.value);
    }
    setFilteredReports(filtered);
  };

  const clearFilters = () => {
    setSelectedFinancialYear(null);
    setSelectedStandard(null);
    setFilteredReports(reports);
  };

  // ✅ Navigation with spinner
  const handleNavigateToReport = async (reportId: string) => {
    setNavigatingReportId(reportId);
    try {
      await router.push(`/report/${reportId}`);
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('Failed to navigate to report');
      setNavigatingReportId(null);
    }
  };

  const onSave = async (standardId: string) => {
    setLoadingStates((prev) => ({ ...prev, [standardId]: true }));

    if (!reportFinancialYears[standardId]) {
      setErrors((prev) => ({
        ...prev,
        [standardId]: { report_year: 'Financial Year is required' },
      }));
      setLoadingStates((prev) => ({ ...prev, [standardId]: false }));
      return;
    }

    setErrors((prev) => ({ ...prev, [standardId]: { report_year: '' } }));

    const res = await ReportService.createReport(
      reportFinancialYears[standardId],
      standardId,
      apiKey,
      token,
    );

    const { success, data, error: _error } = res?.data ?? {};

    if (success) {
      toast.success('Report created successfully!');
      setReports((prev) => [...prev, data]);
      setReportFinancialYears((prev) => ({ ...prev, [standardId]: null }));
    } else {
      toast.error(_error?.[0] || 'Failed to create report');
    }

    setLoadingStates((prev) => ({ ...prev, [standardId]: false }));
  };

  const getAllReports = async () => {
    try {
      setIsLoadingReports(true);
      const res = await ReportService.getReports(apiKey, token);
      const { success, data } = res.data;

      if (success) {
        const reportsWithProgress = await Promise.all(
          data.map(async (report) => {
            try {
              const progressRes = await DataCube.getReportProgress(
                report?.standardId || report?.standard_id,
                report?.datacubeId || report?.datacube_id,
                apiKey,
                {},
                token,
              );
              const progressData = progressRes?.data?.data;
              return {
                ...report,
                overallPercentage: Math.round(
                  progressData?.overallPercentage || 0,
                ),
              };
            } catch (err) {
              console.error(
                'Error fetching progress for report:',
                report?.id,
                err,
              );
              return { ...report, overallPercentage: 0 };
            }
          }),
        );
        setReports(reportsWithProgress);
        setFilteredReports(reportsWithProgress);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to fetch reports');
    } finally {
      setIsLoadingReports(false);
    }
  };

  useEffect(() => {
    getAllReports();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedFinancialYear, selectedStandard, reports]);

  const onClose = () => {
    hideModal();
    setCurrentReport(undefined);
    setActionType(null);
    router.refresh();
  };

  const deleteReport = async () => {
    if (currentReport?.id) {
      const res = await ReportService.deleteReportById(
        apiKey,
        currentReport.id,
      );
      const { success } = res?.data ?? {};
      if (success) {
        toast.success('Report deleted successfully');
        setReports((prev) => prev.filter((r: any) => r.id !== currentReport.id));
        setFilteredReports((prev) => prev.filter((r: any) => r.id !== currentReport.id));
        setCurrentReport(undefined);
        onClose();
      }
    }
  };

  const deleteModal = useModal({
    content: (
      <BlockOrUnblockOrDelete
        actionType={actionType}
        onConfirm={() => deleteReport()}
        onClose={() => onClose()}
        deleteText="Are you sure you want to Delete this Report?"
      />
    ),
  });

  useEffect(() => {
    if (currentReport && actionType === 'Delete') {
      deleteModal();
    }
  }, [currentReport]);

  const breadCrumbMenu: BreadCrumbProps[] = [];

  return (
    <PageHeaderWrapper breadCrumbMenu={breadCrumbMenu} title="Reports">
      <div className="bg-white" style={{ minHeight: '75vh' }}>
        {/* Standards Section */}
        <div className="px-3 px-md-5 border-bottom pb-4">
          <h5 className="pb-4 mt-4 fw-bold letter-spacing">Standards</h5>
          <div className="row m-0 gap-4">
            {reportCarddata.map((report) => (
              <div className="col-12 col-lg-4 p-0 mb-4" key={report.id}>
                <div className="card rounded-2 border">
                  <div className="card-body ps-3">
                    <div className="d-flex align-items-center gap-2">
                      <Avatar
                        name={report.standard_name}
                        size="50px"
                        avator={report.standard_avatar_url}
                        className="rounded-circle"
                      />
                      <div>
                        <p className="m-0 fs-14 fw-600">
                          {report.standard_name}
                        </p>
                        <p className="m-0 fs-12 fw-500">
                          Create your
                          {' '}
                          {report.standard_name}
                          {' '}
                          report for multiple
                          financial year
                        </p>
                      </div>
                    </div>
                    <div className="d-flex gap-4 align-items-center mt-5 flex-wrap">
                      <div>
                        <Select
                          id={`sector-${report.id}`}
                          value={
                            reportFinancialYears[report.id]
                              ? report.financialYears.find(
                                (fy: any) => fy.value === reportFinancialYears[report.id],
                              )
                              : null
                          }
                          onChange={(e: any) => setReportFinancialYears((prev) => ({
                            ...prev,
                            [report.id]: e?.value,
                          }))}
                          placeholder="Choose Financial year"
                          options={report.financialYears}
                          styles={CustomStyles}
                          classNamePrefix="custom_select_input"
                        />
                        {errors[report.id]?.report_year && (
                          <div className="error-message">
                            {errors[report.id].report_year}
                          </div>
                        )}
                      </div>
                      <Button
                        text="Create Report"
                        type="submit"
                        isPill
                        isDisabled={loadingStates[report.id]}
                        isLoading={loadingStates[report.id]}
                        onClick={() => onSave(report.id)}
                        className="w-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Reports Section */}
        <div className="px-3 px-md-5">
          <h5 className="py-4 fw-bold letter-spacing">My Reports</h5>

          {/* Show loading state while fetching reports */}
          {isLoadingReports ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="text-center">
                <div
                  className="spinner-border text-primary mb-3"
                  role="status"
                  style={{ width: '3rem', height: '3rem' }}
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-muted">Loading reports...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Filters */}
              <div className="d-flex flex-wrap gap-4 align-items-center my-4 pb-4">
                <div>
                  <Select
                    id="financial-year-filter"
                    value={selectedFinancialYear}
                    onChange={(e: any) => setSelectedFinancialYear(e)}
                    placeholder="Choose Financial year"
                    options={availableFinancialYears}
                    styles={CustomStyles}
                    classNamePrefix="custom_select_input"
                    isClearable
                  />
                </div>
                <div>
                  <Select
                    id="standard-filter"
                    value={selectedStandard}
                    onChange={(e: any) => setSelectedStandard(e)}
                    placeholder="Select Standard"
                    options={availableStandards}
                    styles={CustomStyles}
                    classNamePrefix="custom_select_input"
                    isClearable
                  />
                </div>
                <div>
                  <Button
                    text="Clear Filters"
                    type="button"
                    isSolid={false}
                    onClick={clearFilters}
                    isDisabled={!selectedFinancialYear && !selectedStandard}
                  />
                </div>
              </div>

              {/* Filter Summary */}
              <div className="mb-3">
                <p className="text-muted fs-14">
                  Showing
                  {' '}
                  {filteredReports.length}
                  {' '}
                  of
                  {' '}
                  {reports.length}
                  {' '}
                  reports
                  {selectedFinancialYear && (
                  <span className="ms-2 badge bg-primary">
                    Year:
                    {selectedFinancialYear.label}
                  </span>
                  )}
                  {selectedStandard && (
                    <span className="ms-2 badge bg-success">
                      Standard:
                      {selectedStandard.label}
                    </span>
                  )}
                </p>
              </div>

              {/* Reports Grid */}
              <div className="row m-0 mt-3">
                {filteredReports.length === 0 ? (
                  <div className="col-12 text-center py-5">
                    <p className="text-muted">
                      No reports found matching your criteria.
                    </p>
                  </div>
                ) : (
                  filteredReports.map((report: any) => (
                    <div className="col-lg-4 p-0" key={report.id}>
                      <div className="me-3 mb-3 report-card p-4 rounded-2">
                        <div>
                          <div className="d-flex align-items-center justify-content-between">
                            <h5 className="fw-semibold m-0 letter-spacing">
                              {report.financial_year}
                            </h5>
                            <Dropdown>
                              <Dropdown.Toggle
                                className="dropdownTitle"
                                disabled={navigatingReportId === report.id}
                              >
                                {navigatingReportId === report.id ? (
                                  <div
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                  >
                                    <span className="visually-hidden">
                                      Loading...
                                    </span>
                                  </div>
                                ) : (
                                  <PiDotsThreeOutlineVertical
                                    color="var(--textdark)"
                                    fontSize={24}
                                  />
                                )}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => handleNavigateToReport(report.id)}
                                  disabled={navigatingReportId === report.id}
                                >
                                  {navigatingReportId === report.id ? (
                                    <>
                                      <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                      >
                                        <span className="visually-hidden">
                                          Loading...
                                        </span>
                                      </span>
                                      Loading...
                                    </>
                                  ) : (
                                    'View'
                                  )}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    setCurrentReport(report);
                                    setActionType('Delete');
                                  }}
                                  disabled={navigatingReportId === report.id}
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                          <div className="border border-1 p-2 d-inline-block rounded-5 pe-4 mt-3">
                            <Avatar
                              name={report.standard}
                              size="30"
                              avator=""
                              className="rounded-circle"
                            />
                            <span className="ms-2 fs-20 fw-500">
                              {report.standard}
                            </span>
                          </div>
                          <div className="mt-4">
                            <PercentageBar
                              value={report.overallPercentage || 0}
                              suffixValueShown
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </PageHeaderWrapper>
  );
}
