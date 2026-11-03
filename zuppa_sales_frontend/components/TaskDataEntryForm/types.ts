/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITask } from '@/lib/interface/ITask.interface';
import { IUser } from '@/lib/interface/IUser.interface';
import { Params } from '@/lib/utils';

export interface TaskDataEntryFormProps {
  params: Params;
  currentTask: ITask;
  user: IUser;
}

export interface ITaskResponse {
  task_question: string;
  datacube_question: string;
  answer: string | string[];
  question_sequence_type: 'STANDARD' | 'GROUP' | string;
  parent_option_id: string | null,
  mixed_question_id: string | undefined,
  rule_question_id: string | null,
  group_questions_rule_id: string | null,
  group_index?: number | any;
}

export interface IStandardAndGroupAnswer {
  task_question_id: string;
  datacube_question_id: string;
  questable_type: 'STANDARD' | 'GROUP';
  answer_id?: string;
  index?: number;
  mixed_question_id? : string;
  rule_question_id? : string;
  group_questions_rule_id? : string;
  parent_option_id? : string;
}

export interface ITaskComments {
  task_question_id: string;
  commented_by: string;
  comment: string;
}

export interface UserRoles {
  isAdmin: boolean;
  isDataProvider: boolean;
  isDataReviewer: boolean;
}

export interface TaskPermissions {
  canEnterData: boolean;
  canReview: boolean;
}
