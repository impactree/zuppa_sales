import { IUserRole } from '@/components/types';
import {
  deleteRequest, get, post, put,
} from '../axiosInstance';
import { IUserFilter } from '../interface/IUser.interface';
import { Params } from '../utils';

export const getCurrentUser = (
  tenantId: string,
  token?: string | undefined,
) => get(
  '/v1/auth/me',
  undefined,
  tenantId,
  {
    bearerToken: token,
    isFetchToken: !token,
  },
);

export const getAllUsers = (
  params: IUserFilter,
  tenantId: string,
  token?: string | undefined,
) => get(
  '/v1/user',
  params as unknown as Params,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const updateCurrentUser = (
  params: {
    name: string,
    phone_number?: string,
  },
  tenantId: string,
) => put(
  '/v1/user',
  params,
  undefined,
  tenantId,
);

export const updateUserById = (
  params: {
    name: string,
    phone_number?: string,
    role: IUserRole
  },
  tenantId: string,
  id: string,
) => put(
  `/v1/user/${id}/update`,
  params,
  undefined,
  tenantId,
);

export const getUserById = (
  tenantId: string,
  id: string,
) => get(
  `/v1/user/${id}`,
  undefined,
  tenantId,
);

export const changePassword = (
  params: {
    oldPassword: string,
    password: string,
    passwordConfirmation: string,
  },
  tenantId: string,
) => post(
  '/v1/user/change_password',
  params,
  undefined,
  tenantId,
);

export const blockUser = (
  params: {
    blocked_reason: string,
  },
  tenantId: string,
  id: string,
) => post(
  `/v1/user/${id}/block`,
  params,
  undefined,
  tenantId,
);

export const unBlockUser = (
  tenantId: string,
  id: string,
) => post(
  `/v1/user/${id}/unblock`,
  undefined,
  undefined,
  tenantId,
);

export const deleteUser = (
  tenantId: string,
  id: string,
) => deleteRequest(
  `/v1/user/delete/${id}`,
  undefined,
  tenantId,
);

export const updateAvatar = (
  file: FormData,
  tenantId: string,
) => post(
  '/v1/user/upload_avatar',
  file,
  undefined,
  tenantId,
  {
    contentType: 'multipart/form-data',
  },
);

export const deleteAvatar = (
  tenantId: string,
) => deleteRequest(
  '/v1/user/delete_avatar',
  undefined,
  tenantId,
);

export const updateAccountAvatar = (
  file: FormData,
  tenantId: string,
) => post(
  '/v1/auth/upload_avatar',
  file,
  undefined,
  tenantId,
  {
    contentType: 'multipart/form-data',
  },
);

export const deleteAccountAvatar = (
  tenantId: string,
) => deleteRequest(
  '/v1/auth/delete_avatar',
  undefined,
  tenantId,
);

export const getSectorList = (
  tenantId: string,
  params: Params,
) => get(
  '/v1/sector',
  params,
  tenantId,
);

export const getIndustryListById = (
  tenantId: string,
  id: string,
) => get(
  `/v1/${id}/sector`,
  undefined,
  tenantId,
);
