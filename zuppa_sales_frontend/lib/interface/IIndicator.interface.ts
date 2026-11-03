import { IModules } from './IModules.interface';
import { IQuestion } from './IQuestions.interface';

export interface IIndicator {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  module: IModules | null;
  question: IQuestion[];
  status: string;
  question_option_id?: string;
  is_required: boolean;
}
