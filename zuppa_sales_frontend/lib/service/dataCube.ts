/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  deleteRequest, get, post, put,
} from '../axiosInstance';
import { IStandard } from '../interface/IStandard.interface';
import { IUserFilter } from '../interface/IUser.interface';
import { Params } from '../utils';

export const getWidgets = (
  token?: string,
) => get(
  '/admin/widgets',
  {
    limit: 1000,
  },
  undefined,
  {
    bearerToken: token,
    isFetchToken: !token,
  },
);

export const getModuleList = (
  token?: string,
) => get(
  '/admin/active_standard_modules',
  undefined,
  undefined,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getWidgetData = (token: string, moduleId: string) => get(
  `/admin/widgets/${moduleId}`,
  {
    limit: 1000,
  },
  undefined,
  {
    bearerToken: token,
    isFetchToken: !token,
  },
);

export const getDashboardByDepartment = (
  token: string,
  departmentId: string,
  tenantId?: string,
) => get(
  `/admin/dashboard/${departmentId}`,
  {
    limit: 1000,
  },
  tenantId,
  {
    bearerToken: token,
    isFetchToken: !token,
  },
);

export const getActiveStandards = (token?: string) => get(
  '/admin/active_standards',
  {
    limit: 1000,
  },
  undefined,
  {
    bearerToken: token,
    isFetchToken: !token,
  },
);

export const getAll = (
  params: any,
  tenantId: string,
  token: string,
) => get(
  '/admin/departments',
  params as Params,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getById = (
  id: string,
) => get(
  `/admin/departments/${id}`,
  undefined,
  undefined,
);

export const create = (
  params: {
    name: string,
    description: string,
    frequency: string,
    financial_year: string,
    standards: IStandard[] | []
  },
  tenantId: string,
) => post(
  '/v1/datacube',
  params,
  undefined,
  tenantId,
);

export const update = (
  tenantId: string,
  id: string,
  body: {
    description: string,
    frequency: string,
    financial_year: string
  },
) => put(
  `/v1/datacube/${id}`,
  body,
  undefined,
  tenantId,
);

export const getDashboardByStandard = (token: string, standardId: string) => get(
  `/admin/dashboard/standard/${standardId}`,
  {
    limit: 1000,
  },
  undefined,
  {
    bearerToken: token,
    isFetchToken: !token,
  },
);

export const getAllStandards = (
  tenantId: string,
  token?: string,
) => get(
  '/v1/datacube/standards/all',
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const datacubeStandards = (
  tenantId: string,
  standardIds: string[],
  token?: string,
) => get(
  `/v1/datacube/standards?standard_ids=${standardIds?.join(',')}`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getDatacubes = (
  tenantId: string,
  params?: IUserFilter,
  token?: string,
) => get(
  '/v1/datacube',
  params as Params,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getByIdDatacubes = (
  id: string,
  tenantId: string,
  token?: string,
) => get(
  `/v1/datacube/${id}`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const deleteDatacubes = (
  id: string,
  tenantId: string,
  token?: string,
) => deleteRequest(
  `/v1/datacube/${id}`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getDatacubesQuestions = (
  tenantId: string,
  id: string,
  token?: string,
) => get(
  `/v1/datacube/${id}/questions`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getTasks = (
  id: string,
  tenantId: string,
  params?: Params,
  token?: string,
) => get(
  `/v1/datacube/${id}/task`,
  params,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const ConfigureDataCube = (
  tenantId: string,
  id: string,
  body: {
    start_date: Date,
    end_date: Date,
  },
) => post(
  `/v1/datacube/config/datacube_frequency/${id}`,
  body,
  undefined,
  tenantId,
);

export const getWidgetBlockResponse = (
  datacubeId: string,
  widgetId: string,
  tenantId: string,
  token?: string,
) => get(
  `/v1/datacube/${datacubeId}/${widgetId}/response`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getDataCubeResponse = (
  datacubeId: string,
  frequencyId: string,
  siteId: string,
  tenantId: string,
  token?: string,
) => get(
  `/v1/datacube/${datacubeId}/${frequencyId}/${siteId}/analytics`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

// to get dashboard responses
export const getDashboardDataCubeResponse = (
  datacubeId: string,
  frequencyId: string,
  siteId: string,
  departmentId: string,
  tabId: string,
  tenantId: string,
  token?: string,
) => get(
  `/v1/datacube/${datacubeId}/${frequencyId}/${siteId}/${departmentId}/department-responses/${tabId}`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getStandardDataCubeResponse = (
  datacubeId: string,
  frequencyId: string,
  siteId: string,
  standardId: string,
  tabId: string,
  tenantId: string,
  token?: string,
) => get(
  `/v1/datacube/${datacubeId}/${frequencyId}/${siteId}/${standardId}/standard-responses/${tabId}`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getDashboardDataCubeTimeSeries = (
  datacubeId: string,
  siteId: string,
  dashboardId: string,
  tenantId: string,
  token?: string,
) => get(
  `/v1/datacube/${datacubeId}/${siteId}/${dashboardId}/dashboard/timeseries`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getDataCubeWidgetResponse = (
  datacubeId: string,
  frequencyId: string,
  siteId: string,
  tenantId: string,
  widgetId: string,
  token?: string,
) => get(
  `v1/datacube/${datacubeId}/${frequencyId}/${siteId}/${widgetId}/analytics`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getCustomTaskResponse = (
  datacubeId: string,
  frequencyId: string,
  siteId: string,
  tenantId: string,
  dashboardId: string,
  token?: string,
) => get(
  `v1/datacube/${datacubeId}/${frequencyId}/${siteId}/${dashboardId}/custom_dashboard`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getAnalyticsTimeSeries = (
  datacubeId: string,
  siteId: string,
  tenantId: string,
  widgetId: string,
  token?: string,
) => get(
  `v1/datacube/${datacubeId}/${siteId}/${widgetId}/analytics/timeseries`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getReportProgress = (
  stdId: string,
  datacubeId: string,
  apiKey: string,
  params?: Params,
  token?: string,
) => get(
  `/v1/datacube/standard/${stdId}/datacube/${datacubeId}/report_progress`,
  params,
  apiKey,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getTaskProgress = (
  datacubeId: string,
  apiKey: string,
  params?: Params,
  token?: string,
) => get(
  `/v1/datacube/${datacubeId}/task_progress`,
  params,
  apiKey,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

// New Task Page Api's

// export const getDatacubeBusinessUnitsBasedOnUser = (
//   id:string,
//   tenantId: string,
//   params: Params,
//   token?: string,
// ) => get(
//   `/v1/datacube/${id}/businessunit`,
//   params,
//   tenantId,
//   {
//     isFetchToken: !token,
//     bearerToken: token,
//   },
// );

export const getDatacubeBusinessUnitsBasedOnUser = (
  id: string,
  tenantId: string,
  status?: string,
  token?: string,
) => {
  const query = new URLSearchParams();

  if (status) query.append('status', status);

  const url = `/v1/datacube/${id}/businessunit?${query.toString()}`;

  return get(url, {}, tenantId, {
    isFetchToken: !token,
    bearerToken: token,
  });
};

// export const getDatacubeTasksBySiteId = (
//   datacubeId: string,
//   siteId: string,
//   tenantId: string,
//   token?: string,
// ) => get(
//   `/v1/datacube/${datacubeId}/sites/${siteId}/tasks`,
//   undefined,
//   tenantId,
//   {
//     isFetchToken: !token,
//     bearerToken: token,
//   },
// );

export const getDatacubeTasksBySiteId = (
  datacubeId: string,
  siteId: string,
  tenantId: string,
  status?: string,
  token?: string,
) => {
  const query = new URLSearchParams();

  if (status) query.append('status', status);
  const url = `/v1/datacube/${datacubeId}/sites/${siteId}/tasks?${query.toString()}`;

  return get(url, {}, tenantId, {
    isFetchToken: !token,
    bearerToken: token,
  });
};
export const getHomePageCharts = (
  datacubeId: string,
  apiKey: string,
  params?: Params,
  token?: string,
) => get(
  `/v1/datacube/homepage/${datacubeId}`,
  params,
  apiKey,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getActivityLog = (
  apiKey: string,
  params?: Params,
  token?: string,
) => get(
  '/v1/tenantactivity',
  params,
  apiKey,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getChartFilterResponse = (
  datacubeId: string,
  frequencyId: string,
  siteId: string,
  apiKey: string,
  params?: Params,
  token?: string,
) => get(
  `/v1/datacube/${datacubeId}/${frequencyId}/${siteId}`,
  params,
  apiKey,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getFileRepository = (
  apiKey: string,
  params?: Params,
  token?: string,
) => get(
  '/v1/task/file-repository',
  params,
  apiKey,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);
