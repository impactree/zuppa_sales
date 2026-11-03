import { IBusinessUnitField, IBusinessUnitFields } from '@/components/BusinessUnitForm/BusinessUnitForm';
import {
  deleteRequest, get, post, put,
} from '../axiosInstance';

export const createBusinessUnit = async (
  params: IBusinessUnitFields,
  tenantId: string,
  query?: {
    onboarding: boolean
  },
) => post(
  '/v1/businessunit/create',
  params?.business_units,
  query,
  tenantId,
);

export const updateBusinessUnit = async (
  id: string,
  params: IBusinessUnitField,
  tenantId: string,
) => put(
  `/v1/businessunit/${id}`,
  params,
  undefined,
  tenantId,
);

export const deleteBusinessUnit = async (
  tenantId: string,
  id: string,
) => deleteRequest(
  `/v1/businessunit/${id}`,
  undefined,
  tenantId,
);

export const getSites = async (
  tenantId: string,
) => get(
  '/v1/sites',
  {
    limit: 1000,
  },
  tenantId,
);
