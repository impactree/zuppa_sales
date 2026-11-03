import { get } from '../axiosInstance';

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
