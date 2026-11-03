import { deleteRequest, get, post } from '../axiosInstance';
import { IUserFilter } from '../interface/IUser.interface';
import { Params } from '../utils';

export const create = (
  params: {
    financial_year: string,
    frequency: string,
    standards: string[]
  },
  tenantId: string,
) => post(
  '/v1/project/create',
  params,
  undefined,
  tenantId,
);

export const standards = (
  tenantId: string,
  id: string,
  token?: string,
) => get(
  `/v1/project/standards/${id}`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getProjects = (
  tenantId: string,
  params?: IUserFilter,
  token?: string,
) => get(
  '/v1/project',
  params as Params,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getByIdProject = (
  id: string,
  tenantId: string,
  token?: string,
) => get(
  `/v1/project/${id}`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const deleteProject = (
  id: string,
  tenantId: string,
  token?: string,
) => deleteRequest(
  `/v1/project/${id}`,
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
  token?: string,
) => get(
  `/v1/project/${id}/tasks`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getWidgets = (
  token?: string,
) => get(
  '/widgets',
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);
