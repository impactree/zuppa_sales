import { ISector } from './ISector.interface';

export interface IIndustries {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  is_delete: boolean;
  description: string;
  sector: ISector | null;
  status: string;
}
