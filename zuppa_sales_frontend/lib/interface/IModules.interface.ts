import { IIndicator } from './IIndicator.interface';
import { IStandard } from './IStandard.interface';

export interface IModules {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  is_required: boolean;
  module_description: string;
  standard: IStandard;
  indicator: IIndicator[];
  status: string;
}
