/* eslint-disable no-use-before-define */
import { IQuestionType, ITaskStatus } from '@/components/types';
import { ISite } from './IAccount.interface';
import { IDataCubeFrequency } from './IDataCube.interface';
import { IUser } from './IUser.interface';

export interface IDataCubeQuestionOptions {
  id: string
  createdAt: string
  updatedAt: string
  is_deleted: boolean
  deleted_at: string;
  text: string;
  value: string;
  placeholder: string;
  public_question_option_id: string;
}

export interface IMixedQuestions {
  id: string
  createdAt: string
  updatedAt: string
  is_deleted: boolean
  deleted_at: string;
  value_question_type: IQuestionType,
  value_name: string,
  value_enum: string[];
  unit_name: string;
  unit_type: IQuestionType;
  unit_enum: string[];
}
export interface IDataCubeQuestion {
  id: string
  createdAt: string
  updatedAt: string
  is_deleted: boolean
  deleted_at: string;
  title: string;
  description: string;
  question_type: IQuestionType;
  placeholder: string;
  sub_indicator_id: string;
  sub_indicator_name: string;
  option_type: 'SINGLE' | 'MIXED';
  public_question_id: string;
  datacube_question_options: IDataCubeQuestionOptions[];
  mixed_questions: IMixedQuestions[];
}

export interface ITaskQuestionRules {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string;
  dependent_question_id: IDataCubeQuestion;
  dependent_option_id: IDataCubeQuestionOptions;
}
export interface ITaskDataCubeGroupQuestions {
  universal_question_id: string;
  sequence: number;
  id: string
  createdAt: string
  updatedAt: string
  is_deleted: boolean
  deleted_at: string;
  datacube_question: IDataCubeQuestion;
  group_question_rule: ITaskGroupQuestionRule
  is_dependent: boolean
  group_sequence: number

}

export interface ITaskGroupQuestionRule {
  id: string
  createdAt: string
  updatedAt: string
  is_deleted: boolean
  deleted_at: string;
  is_multiple: boolean;
  name: string;
  max_limit: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  group_rule: any[];
  datacube_group_questions: ITaskDataCubeGroupQuestions[];
}

export interface ITaskQuestionsSequence {
  id: string
  createdAt: string
  updatedAt: string
  is_deleted: boolean
  deleted_at: string;
  sequence: number;
  is_dependent: false;
  questable_type: 'STANDARD' | 'GROUP';
  public_indicator_id: string;
  public_indicator_name: string;
  public_module_id: string;
  public_module_name: string;
  public_question_sequence_id: string;
  question_rules_id: ITaskQuestionRules[];
  datacube_question: IDataCubeQuestion
  group_question_rule: ITaskGroupQuestionRule;
}

export interface ITaskQuestionAnwers {
  id: string
  createdAt: string
  updatedAt: string
  is_deleted: boolean
  deleted_at: string;
  answer: string;
  question_sequence_type: 'STANDARD' | 'GROUP';
  index: number;
  datacube_question: IDataCubeQuestion;
}

export interface ITaskComments {
  id: string
  createdAt: string
  updatedAt: string
  is_deleted: boolean
  deleted_at: string;
  comment: string;
  commented_by: IUser;
}

export interface ITaskQuestions {
  id: string
  createdAt: string
  updatedAt: string
  is_deleted: boolean
  deleted_at: string;
  is_approved: boolean | null;
  approved_at: string;
  data_provided_on: string;
  is_answered: boolean;
  question_sequence: ITaskQuestionsSequence;
  task_question_answers: ITaskQuestionAnwers[];
  task_comments: ITaskComments[];
  module_name: string;
  indicator_name: string;
}

export interface ITask {
  financial_year: string
  id: string
  createdAt: string
  updatedAt: string
  is_deleted: boolean
  deleted_at: string;
  status: ITaskStatus;
  datacube_frequency: IDataCubeFrequency;
  site: ISite;
  data_provider: IUser;
  data_reviewer: IUser;
  task_questions: ITaskQuestions[];
  module_name: string;
  template_task_file_url?: string;
  uploaded_task_file_url?: string;
}
