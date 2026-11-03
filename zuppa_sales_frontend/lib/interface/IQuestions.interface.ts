import { IQuestionType } from '@/components/types';
import { IIndicator } from './IIndicator.interface';

export interface IQuestionOption {
  question_option_id?: string;
  text: string;
  id?: string;
  value: string;
  dependent_question: string[];
  dependent_indicator: string[];
}

export interface IMixedType {
  placeholder: string;
  question_type: IQuestionType;
  question_options: IQuestionOption[];
  sequence_no: number;
  id: string;
  is_deleted: boolean;
  deleted_at: string;
  created_at: string;
}

export interface IQuestion {
  id: string;
  createdAt: string;
  updatedAt: string;
  question_title: string;
  description: string;
  question_type: IQuestionType;
  is_required: boolean;
  is_delete: boolean;
  status: string;
  question_options?: IQuestionOption[]
  indicators: IIndicator | null;
  sequence: number;
  is_deleted: boolean;
  question_option_id?: string;
  mixed_type_questions?: IMixedType[];
  placeholder: string;
  is_upload: boolean;
  subindicator: string;
}
