import { get } from '../axiosInstance';

export const getStandardList = (
  tenantId: string,
  token?: string,
) => get(
  '/v1/standards',
  {
    limit: 1000,
  },
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getModuleList = (
  token?: string,
) => get(
  '/admin/active_standard_modules',
  {
    limit: 1000,
  },
  undefined,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getAllWidgets = (
  token?: string,
) => get(
  '/widgets',
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getWidgetData = (moduleId: string) => get(
  `/widgets/${moduleId}`,
  {
    limit: 1000,
  },
  undefined,
);
