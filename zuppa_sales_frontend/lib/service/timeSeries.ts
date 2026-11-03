/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
import {
  deleteRequest, get, post, put,
} from '../axiosInstance';

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
