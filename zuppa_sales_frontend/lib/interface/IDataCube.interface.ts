/* eslint-disable no-use-before-define */
import { IDataCubeStatus } from '@/components/types';
import { IStandard } from './IStandard.interface';
import { ITask } from './ITask.interface';

export interface IDataCubeFrequency {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string;
  frequency_name: string;
  status: string;
  datacube_config: IDataCube;
  task: ITask | ITask[];
}

export interface IDataCubeQuestionSequences {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string;
  sequence: number;
  is_dependent: boolean;
  questable_type: 'STANDARD' | 'GROUP';
  public_indicator_id: string;
  public_indicator_name: string;
  public_module_name: string;
  public_question_sequence_id: string;
}

export interface IDataCube {
  name: string;
  description: string;
  frequency: 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  financial_year: string;
  standards: IStandard[];
  status: IDataCubeStatus;
  createdAt: string;
  deleted_at: string;
  id: string;
  updatedAt: string;
  is_deleted: string;
  datacube_frequency: IDataCubeFrequency[];
  datacube_question_sequences: IDataCubeQuestionSequences[];
  task?: ITask[];
}

export interface IFrequency {
  datacube: string;
  frequency_name: string;
  status: string;
  deleted_at: string;
  id: string;
  updatedAt: string;
  createdAt: string;
  is_deleted: string;
}
