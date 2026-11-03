/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable max-len */

'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import mammoth from 'mammoth';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { SlCloudDownload } from 'react-icons/sl';
import { saveAs } from 'file-saver';
import { Params } from '@/lib/utils';
import { IUser } from '@/lib/interface/IUser.interface';
import Avatar from '../Avatar/Avatar';
import { Button } from '../Button/Button';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import PercentageBar from '../PercentageBar/PercentageBar';
import { BreadCrumbProps } from '../types';
import './ReportProgress.css';
import { generateBrsrTemplateBlob } from '../ui/brsr-template';

interface ReportProgressProps {
  params: Params;
  currentReport: any;
  reportProgress: any;
}

export default function ReportProgress({
  params,
  currentReport,
  reportProgress,
}: ReportProgressProps) {
  const urlParams = useParams();
  const router = useRouter();

  // Loading states
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isOpeningEditor, setIsOpeningEditor] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReport = async () => {
    try {
      setIsDownloading(true);

      if (!currentReport?.url) {
        console.error('No download URL available');
        return;
      }

      // Method 1: Direct download using window.open (most reliable)
      const link = document.createElement('a');
      link.href = currentReport.url;

      // Set the download attribute to suggest filename
      const filename = currentReport.report_name
        ? `${currentReport.report_name}.docx`
        : 'brsr-report.docx';
      link.download = filename;

      // Make the link invisible
      link.style.display = 'none';

      // Add to DOM, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download report:', error);

      // Fallback: Open in new tab if direct download fails
      try {
        window.open(currentReport.url, '_blank');
      } catch (fallbackError) {
        console.error('Fallback download also failed:', fallbackError);
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGenerteReportOpenEditor = async () => {
    if (!currentReport?.url) {
      console.error('No report URL available');
      return;
    }

    try {
      setIsGeneratingReport(true);

      // Use your proxy API
      const proxyUrl = `/api/proxy-docx?url=${encodeURIComponent(currentReport.url)}`;

      const res = await fetch(proxyUrl);

      if (!res.ok) {
        // console.warn(`Failed to fetch report: ${res.status}. Opening editor anyway.`);
        // Keep loading state and navigate immediately
        localStorage.removeItem('reportHtml');
        localStorage.removeItem('loadFromDocx');
        router.push(`/report/${urlParams.id}/editor`);
        return; // Don't set loading to false, let the navigation handle it
      }

      const arrayBuffer = await res.arrayBuffer();

      if (arrayBuffer.byteLength === 0) {
        // console.warn('Downloaded file is empty. Opening editor anyway.');
        localStorage.removeItem('reportHtml');
        localStorage.removeItem('loadFromDocx');
        router.push(`/report/${urlParams.id}/editor`);
        return; // Don't set loading to false
      }

      // Convert docx to HTML
      const { value: html, messages } = await mammoth.convertToHtml({
        arrayBuffer,
      });

      if (!html || html.trim().length === 0) {
        // console.warn('Converted HTML is empty. Opening editor anyway.');
        localStorage.removeItem('reportHtml');
        localStorage.removeItem('loadFromDocx');
        router.push(`/report/${urlParams.id}/editor`);
        return; // Don't set loading to false
      }

      // Store in localStorage
      localStorage.setItem('reportHtml', html);
      localStorage.setItem('loadFromDocx', 'true');

      // Navigate (loading state will continue until page loads)
      router.push(`/report/${urlParams.id}/editor`);
    } catch (err) {
      console.error('=== ERROR LOADING REPORT ===');
      console.error('Error details:', err);
      // Even on error, keep loading and open the editor
      localStorage.removeItem('reportHtml');
      localStorage.removeItem('loadFromDocx');
      router.push(`/report/${urlParams.id}/editor`);
      // Don't set loading to false here either
    }
    // Note: Don't use finally to stop loading
    // Let the editor page mount handle stopping the loading state
  };

  const handleOpenEditor = async () => {
    if (!currentReport?.url) {
      console.error('No report URL available');
      return;
    }

    try {
      setIsOpeningEditor(true);

      // Use your proxy API
      const proxyUrl = `/api/proxy-docx?url=${encodeURIComponent(currentReport.url)}`;

      const res = await fetch(proxyUrl);

      if (!res.ok) {
        // console.warn(`Failed to fetch report: ${res.status}. Opening editor anyway.`);
        // Keep loading state and navigate immediately
        localStorage.removeItem('reportHtml');
        localStorage.removeItem('loadFromDocx');
        router.push(`/report/${urlParams.id}/editor`);
        return; // Don't set loading to false, let the navigation handle it
      }

      const arrayBuffer = await res.arrayBuffer();

      if (arrayBuffer.byteLength === 0) {
        // console.warn('Downloaded file is empty. Opening editor anyway.');
        localStorage.removeItem('reportHtml');
        localStorage.removeItem('loadFromDocx');
        router.push(`/report/${urlParams.id}/editor`);
        return; // Don't set loading to false
      }

      // Convert docx to HTML
      const { value: html, messages } = await mammoth.convertToHtml({
        arrayBuffer,
      });

      if (!html || html.trim().length === 0) {
        // console.warn('Converted HTML is empty. Opening editor anyway.');
        localStorage.removeItem('reportHtml');
        localStorage.removeItem('loadFromDocx');
        router.push(`/report/${urlParams.id}/editor`);
        return; // Don't set loading to false
      }

      // Store in localStorage
      localStorage.setItem('reportHtml', html);
      localStorage.setItem('loadFromDocx', 'true');

      // Navigate (loading state will continue until page loads)
      router.push(`/report/${urlParams.id}/editor`);
    } catch (err) {
      console.error('=== ERROR LOADING REPORT ===');
      console.error('Error details:', err);
      // Even on error, keep loading and open the editor
      localStorage.removeItem('reportHtml');
      localStorage.removeItem('loadFromDocx');
      router.push(`/report/${urlParams.id}/editor`);
      // Don't set loading to false here either
    }
    // Note: Don't use finally to stop loading
    // Let the editor page mount handle stopping the loading state
  };

  const reportButtons = [
    {
      text: 'Download Report',
      suffixIcon: isDownloading ? (
        <div className="spinner-border spinner-border-sm ms-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <SlCloudDownload size={20} color="var(--textdark)" className="ms-3" />
      ),
      onclick: handleDownloadReport,
      isLoading: isDownloading,
    },
    {
      text: 'Generate Report and Open Editor',
      suffixIcon: isGeneratingReport ? (
        <div className="spinner-border spinner-border-sm ms-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <IoDocumentTextOutline
          size={20}
          color="var(--textdark)"
          className="ms-3"
        />
      ),
      onclick: handleGenerteReportOpenEditor,
      isLoading: isGeneratingReport,
    },
    {
      text: 'Open Editor',
      suffixIcon: isOpeningEditor ? (
        <div className="spinner-border spinner-border-sm ms-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <AiOutlineEdit size={20} color="var(--textdark)" className="ms-3" />
      ),
      onclick: handleOpenEditor,
      isLoading: isOpeningEditor,
    },
  ];

  // Get data from reportProgress or use defaults
  const standardProgress: number = Math.round(
    reportProgress?.data?.overallPercentage || 0,
  );

  const cardData = [
    {
      title: 'Module',
      total: reportProgress?.data?.totalModules || 0,
      completed: reportProgress?.data?.completedModules || 0,
      pending:
        (reportProgress?.data?.totalModules || 0)
        - (reportProgress?.data?.completedModules || 0),
    },
    {
      title: 'Indicators',
      total: reportProgress?.data?.totalIndicators || 0,
      completed: reportProgress?.data?.completedIndicators || 0,
      pending:
        (reportProgress?.data?.totalIndicators || 0)
        - (reportProgress?.data?.completedIndicators || 0),
    },
    {
      title: 'Questions',
      total: reportProgress?.data?.totalQuestions || 0,
      completed: reportProgress?.data?.completedQuestions || 0,
      pending:
        (reportProgress?.data?.totalQuestions || 0)
        - (reportProgress?.data?.completedQuestions || 0),
    },
  ];

  // Get module progress from reportProgress
  const moduleProgress = reportProgress?.data?.moduleProgress
    ?.map((module: any) => ({
      module_name: module.module_name,
      progress_status: Math.round(module.percentage),
    }))
    .sort((a: any, b: any) => b.progress_status - a.progress_status) || [];

  const breadCrumbMenu: BreadCrumbProps[] = [
    {
      title: 'Reports',
      breadCrumb: [
        {
          title: 'Reports',
          url: '/report',
        },
        {
          title: `${currentReport?.report_name}`,
          url: `/report/${params.id}`,
        },
      ],
    },
  ];

  return (
    <div>
      <PageHeaderWrapper
        breadCrumbMenu={breadCrumbMenu}
        stackComponent={(
          <div className="d-flex justify-content-between flex-grow-1 align-items-center flex-wrap">
            <h5 className="py-4 fw-bold letter-spacing mb-0">
              {currentReport?.report_name}
            </h5>
            <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
              {reportButtons?.map((reportBtn) => (
                <div key={reportBtn.text}>
                  <Button
                    text={reportBtn.text}
                    type="button"
                    isBorderButton
                    // isDisabled={reportBtn.isLoading}
                    // isDisabled
                    className="w-100 mt-0 rounded-5"
                    onClick={reportBtn.onclick}
                    sufixIconChildren={reportBtn.suffixIcon}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      >
        <div className="bg-white p-4 mb-4 rounded-3 border">
          <div className="row d-flex align-items-center">
            <div className="col-md-3 col-lg-2 pe-0">
              <div
                className="border border-1 rounded-pill p-2 px-3 fw500 text-dark m-0 d-flex align-items-center"
                style={{ fontSize: 'var(--h4-font-size)', minWidth: '160px' }}
              >
                <Avatar
                  name="B"
                  size="30px"
                  avator=""
                  className="rounded-circle"
                />
                {' '}
                <span className="ms-2">{currentReport?.standard}</span>
              </div>
            </div>
            <div className="col-md-8 col-lg-9">
              <PercentageBar value={standardProgress} suffixValueShown />
            </div>
          </div>
        </div>
        <div className="row ">
          {cardData?.map((data) => (
            <div className=" col-12 col-md-4 mb-4" key={data?.title}>
              <div className="bg-white p-3 border rounded-3" key={data.title}>
                <div className="fw-700 fs-14 textSecondary letter-spacing pb-1">
                  {data.title}
                </div>
                <div className="text-dark letter-spacing fw-semibold fs-32">
                  {data.completed}
                  /
                  {data.total}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="bg-white border px-5 pt-2 pb-5 rounded-3"
          style={{ minHeight: 500 }}
        >
          <h5 className="pt-4 pb-3 fw-bold letter-spacing mb-0">
            Module Progress
          </h5>

          <div className="d-flex flex-wrap gap-3">
            {moduleProgress?.map((module: any) => (
              <div
                className=" p-3 border rounded-2"
                key={module.module_name}
                style={{ width: '49%' }}
              >
                <div className="row">
                  <div className="col-lg-8">
                    <div className="fs-14 fw-semibold letter-spacing">
                      {module.module_name}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <PercentageBar
                      value={module.progress_status}
                      prefixValueShown
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageHeaderWrapper>
    </div>
  );
}
