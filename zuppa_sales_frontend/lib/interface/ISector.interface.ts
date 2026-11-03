import { IIndustries } from './IIndustries.interface';

export interface ISector {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  industry: IIndustries[];
  status: string
}
