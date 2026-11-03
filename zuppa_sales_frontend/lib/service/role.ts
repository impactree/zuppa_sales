import { get, put } from '../axiosInstance';

export const getRoleConfig = (
  tenantId: string,
  token?: string,
) => get(
  '/v1/role/config',
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getCurrentAccess = (
  tenantId: string,
  token?: string,
) => get(
  '/v1/role/currentAccess',
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getRoleDetails = (
  tenantId: string,
  token?: string,
) => get(
  '/v1/role/access',
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const updateRoles = (
  params: {
    role: string,
    module: string,
    features: string[]
  },
  tenantId: string,
) => put(
  '/v1/role/updateRoleAccess',
  params,
  undefined,
  tenantId,
);

export const resetRoles = (
  tenantId: string,
) => put(
  '/v1/role/resetRoleAccess',
  undefined,
  undefined,
  tenantId,
);
