import { IAccount } from './IAccount.interface';

export interface IProject {
  name: string
  frequency: string
  financial_year: string
  standard: string[]
  account: IAccount
  created_by: string
  deleted_at: string
  id: string
  createdAt: string
  updatedAt: string
  is_deleted: boolean
}
