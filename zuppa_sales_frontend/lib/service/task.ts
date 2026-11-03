/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { ITaskComments, ITaskResponse } from '@/components/TaskDataEntryForm/types';
import { ITaskStatus } from '@/components/types';
import {
  deleteRequest, get, post, put,
} from '../axiosInstance';
import { Params } from '../utils';

interface UploadQuestionResponse {
  questionUid: string,
  answer: string,
}

interface UploadFrequencyResponse {
  frequency_name: UploadQuestionResponse[],
}
export const createTask = (
  params: {
    datacube_id: string,
    tasks: {
      sites: string[],
      questions: string[],
      data_provider: string,
      data_reviewer: string,
      status: string
    }[]
  },
  tenantId: string,
) => post(
  '/v1/task',
  params,
  undefined,
  tenantId,
);

export const getTasksBasedOnUser = (
  tenantId: string,
  params: Params,
  token?: string,
) => get(
  '/v1/task/users',
  params,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const getTasks = (
  tenantId: string,
  params: Params,
  token?: string,
) => get(
  '/v1/task',
  params,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const update = (
  id: string,
  params: {
    projectId: string;
    question: string[];
    data_provider: string;
    data_reviewer: string;
    site: string;
  },
  tenantId: string,
) => put(
  `/v1/task/${id}`,
  params,
  undefined,
  tenantId,
);

export const deleteTask = (
  id: string,
  tenantId: string,
) => deleteRequest(
  `/v1/task/${id}`,
  undefined,
  tenantId,
);

export const getById = (
  id: string,
  tenantId: string,
  token?: string,
) => get(
  `/v1/task/${id}`,
  undefined,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

export const taskQuestionAnswer = (
  tenantId: string,
  body: ITaskResponse[],
) => post(
  '/v1/task/response',
  { responses: body },
  undefined,
  tenantId,
);

export const updateAnswer = (
  tenantId: string,
  id: string,
  body: ITaskResponse,
) => put(
  `/v1/task/${id}/response`,
  body,
  undefined,
  tenantId,
);

export const taskComments = (
  tenantId: string,
  id: string,
  body: ITaskComments,
) => post(
  `/v1/task/${id}/comments`,
  { task_comments: [body] },
  undefined,
  tenantId,
);

export const updateStatus = (
  tenantId: string,
  id: string,
  body: {
    status: ITaskStatus;
  },
) => put(
  `/v1/task/${id}/change_status`,
  body,
  undefined,
  tenantId,
);

export const approveQuestions = (
  tenantId: string,
  id: string,
  body: {
    questions: {
      question_id: string,
      is_approved: boolean,
    }[],
  },
) => put(
  `/v1/task/${id}/task_question/review`,
  body,
  undefined,
  tenantId,
);

export const reAssign = (
  tenantId: string,
  id: string,
  body: {
    data_reviewer: string,
    data_provider: string,
  },
) => put(
  `/v1/task/${id}/reassign`,
  body,
  undefined,
  tenantId,
);

export const uploadFile = (
  tenantId: string,
  body: FormData,
) => post(
  '/v1/task/file_upload',
  body,
  undefined,
  tenantId,
  {
    contentType: 'multipart/form-data',
  },
);

export const addGroup = (
  tenantId: string,
  id: string,
  body: {
    question_sequence: string,
  },
) => post(
  `/v1/task/${id}/group_question`,
  body,
  undefined,
  tenantId,
);

export const deleteGroup = (
  tenantId: string,
  id: string,
  body: {
    task_question_id: string,
  },
) => deleteRequest(
  `/v1/task/${id}/group_question`,
  undefined,
  tenantId,
  body,
);

export const getSites = (
  tenantId: string,
  params?: Params,
  token?: string,
) => get(
  '/v1/businessunit',
  params,
  tenantId,
  {
    isFetchToken: !token,
    bearerToken: token,
  },
);

// New Task Page

// export const getBusinessUnitsBasedOnUser = (
//   tenantId: string,
//   params: Params,
//   token?: string,
// ) => get(
//   '/v1/task/users/businessunit',
//   params,
//   tenantId,
//   {
//     isFetchToken: !token,
//     bearerToken: token,
//   },
// );

export const getBusinessUnitsBasedOnUser = (
  tenantId: string,
  status?: string,
  datacube_name?: string,
  token?: string,
) => {
  const query = new URLSearchParams();

  if (status) query.append('status', status);
  if (datacube_name) query.append('datacube_name', datacube_name);

  const url = `/v1/task/users/businessunit?${query.toString()}`;

  return get(url, {}, tenantId, {
    isFetchToken: !token,
    bearerToken: token,
  });
};

// export const getTasksBySiteId = (
//   tenantId: string,
//     siteId: string,
//   // params: Params | any,
//   token?: string,
// ) => get(
//   `/v1/task/users/site/${siteId}`,
//   undefined,
//   tenantId,
//   {
//     isFetchToken: !token,
//     bearerToken: token,
//   },
// );

// export const getTasksBySiteId = (
//   id: string,
//   tenantId: string,
//     params: Params | any,
//   token?: string,
// ) => get(
//   `/v1/task/users/site/${id}`,
//   params,
//   tenantId,
//   {
//     isFetchToken: !token,
//     bearerToken: token,
//   },
// );

export const getTasksBySiteId = (
  id: string,
  tenantId: string,
  status?: string,
  datacube_name?: string,
  token?: string,
) => {
  const query = new URLSearchParams();

  if (status) query.append('status', status);
  if (datacube_name) query.append('datacube_name', datacube_name);

  const url = `/v1/task/users/site/${id}?${query.toString()}`;

  return get(url, {}, tenantId, {
    isFetchToken: !token,
    bearerToken: token,
  });
};

export const uploadTaskResponse = (
  params: {
    datacubeId: string,
    moduleId: string,
    siteId: string,
    frequency: any,
    uploadedFileUrl?: string, // ✅ URL of uploaded Excel file in S3
    isYearly?: boolean, // ✅ Flag to indicate yearly (true) vs single (false) upload
  },
  tenantId: string,
) => post(
  '/v1/task/sheetResponse',
  params,
  undefined,
  tenantId,
);

export const generateTemplate = (
  params: {
    datacubeIds: string,
  },
  moduleId: string,
  siteId: string,
  tenantId: string,
  // token: string,
) => get(
  `/v1/task/generate-template/${moduleId}/${siteId}`,
  params,
  tenantId,
  //  {
  //   isFetchToken: !token,
  //   bearerToken: token,
  // },
);

export const reAssignModule = (
  tenantId: string,
  body: {
    task_ids: any,
    data_reviewer: string,
    data_provider: string,
  },
) => put(
  '/v1/task/reassign',
  body,
  undefined,
  tenantId,
);
