import { IQuestionType } from '@/components/types';

/* eslint-disable no-use-before-define */
export interface IStandard {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string;
  name: string;
  description: string;
  logo_url: string;
  is_active: boolean;
}

export interface IModules {
  id: string;
  name: string;
  indicators: IIndicators[];
}

export interface IIndicators {
  id: string;
  name: string;
  standard_question: IStandardQuestions[]
  question_sequence: IQuestionSequences[]
}

export interface IStandardQuestions {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string;
  title: string;
  description: string;
  question_type: IQuestionType;
  placeholder: string;
  option_type: 'GENERAL' | 'MIXED';
  is_added_sequence: boolean;
  mixed_questions: IMixedQuestions[];
  standard_question_options: IStandardQuestionOptions[];
  sub_indicator_id: ISubIndicators;
}

export interface IMixedQuestions {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string;
  value_question_type: IQuestionType;
  value_name: string;
  value_enum: string[];
  unit_name: string;
  unit_type: IQuestionType;
  unit_enum: string[];
}

export interface IStandardQuestionOptions {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string;
  text: string;
  value: string;
}

export interface ISubIndicators {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string;
  name: string;
  description: string;
}

export interface IQuestionSequences {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string;
  sequence: number;
  questable_type: 'STANDARD' | 'GROUP';
  standard_question_id: IStandardQuestions;
  group_questions: IGroupQuestions;
  question_rules: IQuestionRules[];
}

export interface IGroupQuestions {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string;
  is_multiple: boolean;
  name: string;
  max_limit: number;
  group_rule: IGroupRule[];
  group_question_sequences: IGroupQuestionSequences[]
}

export interface IGroupQuestionSequences {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string;
  standard_question: IStandardQuestions;
}

export interface IGroupRule {
  is_deleted: boolean;
  parent_question_id: string;
  dependent_question_id: string;
  parent_question_option_id: string;
  // parent_question_id: IStandardQuestions;
  // dependent_question_id: IStandardQuestions;
  // parent_question_option_id: IStandardQuestionOptions;
}

export interface IQuestionRules {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string;
  parent_question_id: IStandardQuestions;
  parent_option_id: IStandardQuestionOptions;
  dependent_question_sequence_id: IQuestionSequences;
}
