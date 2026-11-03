import {
  deleteRequest, get, post,
} from '../axiosInstance';

export const createReport = (
  datacubeId: string,
  standardId: string,
  tenantId: string,
  token: string,
) => post(
  `/v1/report-template/${datacubeId}/create-report`,
  { standard_id: standardId },
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getReports = (
  tenantId: string,
  token: string,
) => get(
  '/v1/report-template/get-report-templates',
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getReportById = (
  reportId: string,
  tenantId: string,
  token: string,
) => get(
  `/v1/report-template/check-report-status/${reportId}`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const deleteReportById = async (
  tenantId: string,
  id: string,
) => deleteRequest(
  `/v1/report-template/${id}/delete-report`,
  undefined,
  tenantId,
);

export const downloadReportById = (
  reportId: string,
  // tenantId: string,
  // token: string,
) => get(
  `/v1/report-template/${reportId}/download-report`,
  undefined,
  // tenantId,
  // {
  //     isFetchToken: !token,
  //     bearerToken: token
  // }
);

export const getReportSummary = (
  id: string,
  tenantId: string,
  token?: string,
  params?: Params,
) => get(
  `/v1/report-template/${id}/summary`,
  params,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);
