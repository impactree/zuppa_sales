/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  ResponseType,
} from 'axios';
import { getToken as getServerToken } from 'next-auth/jwt';
import { getSession, signOut } from 'next-auth/react';
import { AuthService } from './service';
import { buildQueryParams, Params } from './utils';

export const BASE_URL = process.env.NEXT_PUBLIC_BE;

export interface AxiosOptions {
  baseUrl?: string;
  responseType?: ResponseType;
  contentType?: string;
  basicToken?: string;
  bearerToken?: string;
  isFetchToken?: boolean;
}

interface ErrorResponse {
  data: {
    error?: string | string[] | any;
    success?: boolean;
  };
}

interface CustomResponse<T> {
  data: T | ErrorResponse | any;
  status?: number | string;
  statusMessage?: string;
}
const getToken = async (req?: any, isFetchToken: boolean = true) => {
  if (req) {
    const token = await getServerToken({
      req,
      secret: process.env.AUTH_SECRET ?? '',
    });
    return token ?? null;
  }
  if (isFetchToken) {
    const session = await getSession();
    return (session as unknown as { user: object })?.user;
  }
  return null;
};

const getUrl = (url: string, params?: Params | undefined | null) => (!buildQueryParams(params) ? `${url}` : `${url}?${buildQueryParams(params)}`);

export const createAxiosInstance = async (
  options?: AxiosOptions,
  tenantId?: string,
  req?: any,
): Promise<AxiosInstance> => {
  const token = await getToken(req, options?.isFetchToken);
  const accessToken = (token as unknown as { accessToken: string })
    ?.accessToken;

  const refreshToken = (token as unknown as { refreshToken: string })
    ?.refreshToken;
  const axiosInstance = axios.create({
    baseURL: options?.baseUrl ?? BASE_URL,
    headers: {
      'Content-Type': options?.contentType ?? 'application/json',
    },
  });
  axiosInstance.interceptors.request.use(async (config) => {
    const newConfig = { ...config };

    if (options?.bearerToken) {
      newConfig.headers.Authorization = `Bearer ${options.bearerToken}`;
    } else if (accessToken) {
      newConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (tenantId) {
      newConfig.headers['X-Tenant-Id'] = tenantId;
    }
    return newConfig;
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      let retryFlag = false;
      const originalRequest: any = error.config;
      if (error?.response?.status === 401 && !retryFlag) {
        retryFlag = true;
        try {
          if (refreshToken) {
            await AuthService.refreshToken(
              localStorage.getItem('slug') ?? '',
              refreshToken,
            );
            // originalRequest.headers.Authorization =
            // `Bearer ${(token as unknown as { refreshToken: string })?.refreshToken
            // }`;
            return axiosInstance(originalRequest);
          }
        } catch (err) {
          signOut();
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export async function get<T>(
  url: string,
  params?: Params | undefined | null,
  tenantId?: string,
  options?: AxiosOptions,
  req?: any,
): Promise<CustomResponse<T>> {
  return (await createAxiosInstance(options, tenantId, req))
    .get(getUrl(url, params))
    .then((response: AxiosResponse<T>) => ({
      data: response.data,
      status: response.status,
    }))
    .catch((error: AxiosError<ErrorResponse>) => ({
      data: error.response?.data ?? error.message,
      status: error.response?.status,
    }));
}

export async function post<T>(
  url: string,
  body: T,
  params?: Params | undefined | null,
  tenantId?: string,
  options?: AxiosOptions,
  req?: any,
): Promise<CustomResponse<T>> {
  return (await createAxiosInstance(options, tenantId, req))
    .post(getUrl(url, params), body)
    .then((response: AxiosResponse<T>) => ({
      data: response.data,
      status: response.status,
    }))
    .catch((error: AxiosError<ErrorResponse>) => ({
      data: error.response?.data ?? error.message,
      status: error.response?.status,
    }));
}

export async function put<T>(
  url: string,
  body: T,
  params?: Params | undefined | null,
  tenantId?: string,
  options?: AxiosOptions,
  req?: any,
): Promise<CustomResponse<T>> {
  return (await createAxiosInstance(options, tenantId, req))
    .put(getUrl(url, params), body)
    .then((response: AxiosResponse<T>) => ({
      data: response.data,
      status: response.status,
    }))
    .catch((error: AxiosError<ErrorResponse>) => ({
      data: error.response?.data ?? error.message,
      status: error.response?.status,
    }));
}

export async function patch<T>(
  url: string,
  body: T,
  tenantId?: string,
  options?: AxiosOptions,
  req?: any,
): Promise<CustomResponse<T>> {
  return (await createAxiosInstance(options, tenantId, req))
    .patch(url, body)
    .then((response: AxiosResponse<T>) => ({
      data: response.data,
      status: response.status,
    }))
    .catch((error: AxiosError<ErrorResponse>) => ({
      data: error.response?.data ?? error.message,
      status: error.response?.status,
    }));
}

export async function deleteRequest<T>(
  url: string,
  params?: Params | undefined | null,
  tenantId?: string,
  body?: Params | undefined,
  options?: AxiosOptions,
  req?: any,
): Promise<CustomResponse<T>> {
  return (await createAxiosInstance(options, tenantId, req))
    .delete(getUrl(url, params), { data: body })
    .then((response: AxiosResponse<T>) => ({
      data: response.data,
      status: response.status,
    }))
    .catch((error: AxiosError<ErrorResponse>) => ({
      data: error.response?.data ?? error.message,
      status: error.response?.status,
    }));
}

export async function downloadPost(
  url: string,
  body: any,
  params?: Params | undefined | null,
  tenantId?: string,
  options?: AxiosOptions,
  req?: undefined,
) {
  const token = await getToken(req, options?.isFetchToken);
  const accessToken = (token as unknown as { accessToken: string })
    ?.accessToken;
  return fetch(`${options?.baseUrl ?? BASE_URL}${getUrl(url, params)}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${options?.bearerToken ?? accessToken}`,
      'X-Tenant-Id': tenantId ?? '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
