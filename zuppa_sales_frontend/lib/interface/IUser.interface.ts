import { IUserRole } from '@/components/types';
import { IAccount } from './IAccount.interface';

export interface IUser {
  name: string;
  email: string;
  avatar_url: string | null;
  id: string;
  createdAt: string;
  updatedAt: string;
  created_by_type: string | null;
  created_by: string | null;
  phone_number: string | null;
  status: string;
  confirmed_at: string;
  password_reset_on: string | null;
  accept_terms_of_service: boolean;
  last_login_at: string;
  block_reason: string | null;
  blocked_on: string | null;
  role: IUserRole;
  departments: string[] | null;
  account: IAccount | null;
  is_guest: boolean;
  company_name: string;
  token?: string;
}

export interface IUserFilter {
  page?: string,
  limit?: string,
  sort?: string,
  search?: string,
  role?: string,
  status?: string,
  site_name?: string,
  task_status?: string,
}
