/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  post,
} from '../axiosInstance';

export const create = (
  params: {
  type?: string,
  content?: string,
  text?: string
  },
  tenantId: string,
  token: string,
) => post(
  '/v1/chatbot/rephrase',
  params,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);
