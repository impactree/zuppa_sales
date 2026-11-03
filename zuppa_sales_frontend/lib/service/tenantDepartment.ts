/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '../axiosInstance';
import { Params } from '../utils';

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
