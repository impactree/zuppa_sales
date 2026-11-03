/* eslint-disable @typescript-eslint/no-explicit-any */
import ReportProgress from '@/components/ReportProgress/ReportProgress';
import React from 'react';
import { auth } from '@/lib/auth';
import { ReportService, DataCube } from '@/lib/service';
import { Params } from '@/lib/utils';
import { redirect } from 'next/navigation';

export default async function page({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: Params;
}) {
  const session = await auth();
  if (!session) {
    return redirect('/sign_in');
  }

  const token = (session?.user as { accessToken: string })?.accessToken;
  const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;
  // const tenantId = (session?.user as unknown as { tenantId: string })?.tenantId;

  // Get report data
  const res = await ReportService.getReportById(params?.id, apiKey, token);
  const { data } = res?.data as {
    data: any;
  };

  // Get report progress using standardId and datacubeId from current report
  const reportProgress = await DataCube.getReportProgress(
    data?.standardId || data?.standard_id,
    data?.datacubeId || data?.datacube_id,
    apiKey,
    searchParams,
    token,
  );

  const progressData = reportProgress?.data;

  return (
    <ReportProgress
      params={searchParams}
      currentReport={data}
      reportProgress={progressData}
    />
  );
}
