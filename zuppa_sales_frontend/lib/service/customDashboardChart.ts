/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
import {
  get, post, put, deleteRequest,
} from '../axiosInstance';
import { Params } from '../utils';

// admin API
export const getWidgetChartList = (params: any) => get('/admin/widgets/widget_charts', params as Params);

export const getDashboardChartList = (params: any) => get('/admin/dashboard/dashboard_charts', params as Params);

export const getDashboardList = (
  tenantId: string,
  token?: string,
) => get(
  'v1/custom-dashboard',
  // { limit: 1000 },
  undefined,
  tenantId,
);

export const getDashboardById = (
  tenantId: string,
  dashboardId: string,
) => get(
  `v1/custom-dashboard/${dashboardId}`,
  undefined,
  tenantId,
);

export const getStandardQuestions = () => get('/admin/active_standard_questions');

// Custom dashboard API
export const createDashboard = (tenantId: string, body: any) => post('v1/custom-dashboard', body, undefined, tenantId);

export const updateDashboard = (
  tenantId: string,
  body: {
    id: string,
    name: string,
    blocks: {
      id: string,
      number_of_columns: number,
      sequence: number,
      columns: {
        id: string,
        sequence: number,
        custom_dashboard_block_id: string,
        types: {
          id: string,
          widget_type_id: string,
          dashboard_type_id: string,
          custom_type_id: string
        }[]
      }[]
    }[]
  },
  dashboardId: string,
) => put(`/v1/custom-dashboard/${dashboardId}`, body, undefined, tenantId);

export const deleteDashboard = (
  tenantId: string,
  dashboardId: string,
) => deleteRequest(
  `/v1/custom-dashboard/${dashboardId}`,
  undefined,
  tenantId,
);

export const deleteDashboardByTypeId = (
  tenantId: string,
  dashboardTypeId: string,
) => deleteRequest(
  `/v1/custom-dashboard/type/${dashboardTypeId}`,
  undefined,
  tenantId,
);

// Custom Charts API
export const createCharts = (tenantId: string, body: any) => post('v1/custom-charts', body, undefined, tenantId);

export const getMyChartList = (tenantId: string, token?: string) => get(
  'v1/custom-charts',
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const updateCharts = (
  tenantId: string,
  chartId: string,
  body: {
    type: string;
    chart_type: string;
    is_stacked: boolean;
    is_horizontal: boolean;
    is_metric: boolean;
    is_time_series: boolean;
    custom_items: {
      id: string;
      title: string;
      combined_parameters: {
        id: string;
        sequence: number;
        custom_parameters: {
          id: string;
          sequence: number;
          questions: string[];
          universal_questions: string[];
          macro_function: string;
          unit: string;
          legends: string[];
          label: string[];
        }[];
      }[];
    }[];
  },
) => put(`/v1/custom-charts/${chartId}`, body, undefined, tenantId);

export const deleteChartByTypeId = (
  tenantId: string,
  chartTypeId: string,
) => deleteRequest(
  `/v1/custom-charts/${chartTypeId}`,
  undefined,
  tenantId,
);

export const deleteCustomParameter = (
  tenantId: string,
  chartId: string,
  customParameterId: string,
) => deleteRequest(
  `/v1/custom-charts/${chartId}/custom-parameters/${customParameterId}`,
  undefined,
  tenantId,
);
