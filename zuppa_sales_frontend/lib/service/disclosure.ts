import {
  get, post, put,
} from '../axiosInstance';
import { IDisclosureIndicator } from '../interface/IDisclosure.interface';
import { Params } from '../utils';

export const create = (
  params: {
    name: string,
    datacube_id: string,
    submitted_by: string,
    indicators: IDisclosureIndicator[],
  },
  tenantId: string,
) => post(
  '/v1/disclosure/create',
  params,
  undefined,
  tenantId,
);

export const update = (
  tenantId: string,
  id: string,
  body: {
    name: string,
    datacube_id: string,
    submitted_by: string,
    indicators: IDisclosureIndicator[],
  },
) => put(
  `/v1/disclosure/${id}`,
  body,
  undefined,
  tenantId,
);

export const getAllDisclosure = (
  tenantId: string,
  token?: string,
) => get(
  '/v1/disclosure',
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getDisclosureByName = (
  name: string,
  params: Params,
  tenantId: string,
  token?: string,
) => get(
  `/v1/disclosure/${name}/name`,
  params,
  //  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getDisclosureById = (
  id: string,
  // params: Params,
  tenantId: string,
  token?: string,
) => get(
  `/v1/disclosure/${id}`,
  // params,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);
