/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable max-len */

import { IStandardAndGroupAnswer, ITaskResponse } from '@/components/TaskDataEntryForm/types';
import moment from 'moment';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ITaskQuestions } from './interface/ITask.interface';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Params {
  [key: string]:
  string
  | number
  | (string | number)[]
  | null
  | boolean
  | boolean[]
  | undefined;
}

export const buildQueryParams = (
  params?: Params | null,
): string => {
  if (params) {
    const queryParams: string[] = [];
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value?.toString().length) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item?.toString().length) {
              queryParams.push(
                `${encodeURIComponent(key)}=${encodeURIComponent(item)}`,
              );
            }
          });
        } else {
          queryParams.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
          );
        }
      }
    });
    return queryParams.join('&');
  }
  return '';
};

export const convertToPascalCase = (data: string) => data
  ?.toLowerCase()
  ?.split(' ')
  ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  ?.join(' ');

export const stringToHexColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash += str.charCodeAt(i) * (i + 1);
  }
  const color = (hash % 0xFFFFFF).toString(16).toUpperCase();
  return `#${'00000'.substring(0, 6 - color.length)}${color}`;
};

export const getSlugClass = (slugValid: boolean | null) => {
  if (slugValid === false) {
    return 'is-invalid';
  }
  if (slugValid === true) {
    return 'is-valid';
  }
  return '';
};

export const resetFilter = (
  router: AppRouterInstance,
  resetForm: () => void,
  pathname: string,
) => {
  const query = buildQueryParams({}).toString();
  router.push(`${pathname}?${query}`);
  resetForm();
};

export const updateQueryParams = (
  updatedValue: Params,
  router: AppRouterInstance,
  params: Params,
  pathname: string,
) => {
  const query = buildQueryParams({ ...params, ...updatedValue });
  const path = `${pathname}?${query}`;
  router.push(path);
};

export const applyFilter = (
  values: Params,
  router: AppRouterInstance,
  params: Params,
  pathname: string,
) => updateQueryParams(
  { ...values, page: 1 },
  router,
  params,
  pathname,
);

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE':
    case 'PUBLISH':
    case 'COMPLETED':
      return 'success';
    // --------------------------------------color-danger---------------
    case 'BLOCKED':
    case 'UNPUBLISH':
    case 'REJECTED':
      return 'danger';
    // --------------------------------------color-warning---------------
    case 'InProgress':
    case 'PENDING':
    case 'Up coming':
      return 'warning';
    // --------------------------------------color-pending---------------
    case 'PROCESSED':
    case 'COMMENT':
    case 'IN_PROGRESS':
      return 'pending';
    // --------------------------------------color-draft---------------
    case 'Draft':
    case 'DRAFT':
    case 'EDIT':
    case 'CREATED':
      return 'draft';
    case 'REASSIGNED':
    case 'DATA_COLLECTING':
      return 'branch';
    case 'VIEW':
    case 'REVIEWED':
      return 'current';
    case 'ADMIN':

      return 'permanent';
    default:
      return 'success';
  }
};

export const updateBuildQueryParams = (
  newParams: Record<string, string>,
  searchParams: URLSearchParams,
): URLSearchParams => {
  const params = new URLSearchParams(searchParams.toString());
  Object.keys(newParams).forEach((key) => {
    params.set(key, newParams[key]);
  });
  return params;
};

export const dateFormatForList = (value: string | null) => (value ? moment(value).format('lll') : '-');

export const convertExcel = (res: any, type: string) => {
  const blob = new Blob([res], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,',
  });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `${type}_${new Date().getTime()}.xlsx`;
  link.click();
};

export const convertPdf = (res: any, type: string) => {
  const blob = new Blob([res], {
    type: 'application/pdf',
  });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `${type}_${new Date().getTime()}.pdf`;
  link.click();
};

export const getDateRange = (
  searchKey: string,
  date?: Date,
) => {
  const today = moment(date ?? new Date());
  let fromDate: string = '';
  let toDate: string = '';

  const formatDate = (dateString: string) => moment(dateString).format('YYYY-MM-DD');
  // eslint-disable-next-line default-case
  switch (searchKey) {
    case 'today':
    case 'Today': {
      fromDate = formatDate(today.format());
      toDate = formatDate(today.format());
      break;
    }
    case 'yesterday':
    case 'Yesterday': {
      const yesterday = today.clone().subtract(1, 'day');
      fromDate = formatDate(yesterday.format());
      toDate = formatDate(yesterday.format());
      break;
    }
    case 'week':
    case 'Week': {
      fromDate = formatDate(today.clone().startOf('week').format());
      toDate = formatDate(today.clone().endOf('week').format());
      break;
    }
    case 'month':
    case 'Month': {
      fromDate = formatDate(today.clone().startOf('month').format());
      toDate = formatDate(today.clone().endOf('month').format());
      break;
    }
    case 'quarter': {
      fromDate = formatDate(today.clone().startOf('quarter').format());
      toDate = formatDate(today.clone().endOf('quarter').format());
      break;
    }
    case 'year':
    case 'Year': {
      fromDate = formatDate(today.clone().startOf('year').format());
      toDate = formatDate(today.clone().endOf('year').format());
      break;
    }
  }

  return { fromDate, toDate };
};

export const getUserData = (source: any) => ({
  user: {
    name: source?.user?.name,
    id: source?.user?.id,
    status: source?.user?.status,
    role: source?.user?.role,
    department: source?.user?.department,
    account: {
      id: source?.user?.account?.id,
      name: source?.user?.account?.name,
      slug: source?.user?.account?.slug,
      api_key: source?.user?.account?.api_key,
      current_onboarding_stage: source?.user?.account?.current_onboarding_stage,
    },
    plan: source?.user?.plan?.plan_code,
    apiKey: source?.user?.account?.api_key,
    accessToken: source?.user?.accessToken,
    refreshToken: source?.user?.refreshToken,
  },
});

export const transformToNestedStructure = (data: ITaskQuestions[]) => {
  const moduleMap: Record<string, Record<string, ITaskQuestions[]>> = {};
  data?.forEach((item) => {
    const { question_sequence: questionSequence, module_name: moduleName, indicator_name: indicatorName } = item;
    if (!moduleMap[moduleName]) {
      moduleMap[moduleName] = {};
    }
    if (!moduleMap[moduleName][indicatorName]) {
      moduleMap[moduleName][indicatorName] = [];
    }
    moduleMap[moduleName][indicatorName].push(item);
  });
  const modules = Object.entries(moduleMap).map(([moduleName, indicatorsMap]) => ({
    name: moduleName,
    indicators: Object.entries(indicatorsMap).map(([indicatorName, questions]) => ({
      name: indicatorName,
      questions,
    })),
  }));
  return modules;
};

export const getDomainFromSubdomain = (hostname: string): string => hostname.split('.').slice(-2).join('.');

export const sequenceQuestion = (
  qst: ITaskQuestions,
) => qst?.question_sequence?.datacube_question;

export const showCommentIcon = (
  _qust: ITaskQuestions,
) => _qust?.task_comments?.length > 0;

export const showUploadIcon = (
  _qst: ITaskQuestions,
) => sequenceQuestion(_qst)?.question_type === 'FILE';

export const showEyeIcon = (
  qust: ITaskQuestions,
  responses: ITaskResponse[],
) => (responses?.find((
  item,
) => item?.task_question === qust?.id)?.answer?.length || 0) > 0;

export const shouldUseCol10 = (
  quest: ITaskQuestions,
  canEnterData: boolean,
  canReview: boolean,
) => (canEnterData
  && showUploadIcon(quest)
  && showEyeIcon
) || canReview;

export const colClass = (
  _quest: ITaskQuestions,
  __isDisable: boolean,
  canEnterData: boolean,
  canReview: boolean,
) => (() => {
  if (shouldUseCol10(_quest, canEnterData, canReview) && !__isDisable) return showCommentIcon(_quest) ? 'col-lg-11' : 'col-lg-10';
  if (showCommentIcon(_quest)) return 'col-lg-11';
  return 'col-lg-12';
})();

export const isNotNull = (item: ITaskQuestions | null): item is ITaskQuestions => item !== null;

export const convertStandardQuestionAnswer = (question: ITaskQuestions) => ({
  task_question_id: question?.id,
  datacube_question_id: question?.question_sequence?.datacube_question?.id,
  answer_id: question.task_question_answers?.[0]?.id || '',
  parent_option_id: question?.question_sequence?.question_rules_id?.[0]?.dependent_option_id?.id || '',
  rule_question_id: question?.question_sequence?.question_rules_id[0]?.id || '',
  mixed_question_id: question?.question_sequence?.datacube_question?.mixed_questions?.[0]?.id || '',
  questable_type: 'STANDARD',
}) as IStandardAndGroupAnswer;

export const cleanedQuestions = (data: ITaskQuestions[]) => data?.map((item) => {
  if (item?.question_sequence?.is_dependent) return null;
  if (item?.question_sequence?.questable_type === 'GROUP') {
    const groupQuestions = item.question_sequence
      ?.group_question_rule?.datacube_group_questions || [];
    const filteredGroup = groupQuestions.filter((q) => !q?.is_dependent);
    return {
      ...item,
      question_sequence: {
        ...item.question_sequence,
        group_question_rule: {
          ...item.question_sequence.group_question_rule,
          datacube_group_questions: filteredGroup,
        },
      },
    };
  }
  return item;
})?.filter(isNotNull);

export const shouldShowSubindicator = (
  subQuestions: ITaskQuestions[],
  subResponses: ITaskResponse[],
) => subQuestions.some((question) => {
  const rules = question?.question_sequence?.question_rules_id || [];
  const isDependent = question?.question_sequence?.is_dependent;

  // Independent questions should always be shown
  if (!isDependent) return true;

  // Dependent questions with no rules should be shown
  // (they might be dependent but conditions are satisfied elsewhere)
  if (rules.length === 0) return true; // Changed from false to true

  // Check if dependency conditions are satisfied
  const isDependencySatisfied = rules.every((rule) => {
    const currentResponse = subResponses?.find(
      (res) => res?.datacube_question === rule.dependent_question_id?.id,
    );

    // If no response found for the dependent question, dependency not satisfied
    if (!currentResponse) return false;

    const matchQ = currentResponse?.datacube_question === rule.dependent_question_id?.id;
    const matchO = !rule.dependent_option_id
      || (Array.isArray(currentResponse?.answer)
        ? currentResponse?.answer?.includes(rule.dependent_option_id?.id)
        : currentResponse?.answer === rule.dependent_option_id?.id);

    return matchQ && matchO;
  });

  return isDependencySatisfied;
});

export const userRole = (
  role: string,
) => {
  if (role === 'ADMIN') {
    return 'ADMIN';
  }
  if (role === 'USER') {
    return 'GUEST';
  }
  return role;
};

export const downloadErrors = (errors: any[]) => {
  const file = new Blob([JSON.stringify(errors, null, 2)], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'import-errors.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
