import { IUser } from './IUser.interface';

export interface IBusinessUnitSite {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  location: string;
  site_url: string;
  site_type: string;
  is_delete: boolean;
}

export interface IBusinessUnit {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  is_delete: boolean
  delete_at: string
  sites: IBusinessUnitSite[]
}

export interface ISite {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  location: string;
  site_url: string;
  site_type: string;
  is_delete: boolean;
  business_unit: IBusinessUnit
}

export interface IAccount {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  account_name: string
  slug: string
  email: string
  website_url: string | null
  official_email_id: string | null
  cin_number: string | null
  incorporated_year: string | null
  industries: string[] | null
  phone_number: string | null
  api_key: string
  current_onboarding_stage: number
  tax_id: string | null
  address: string | null
  status: string
  invitation_send_at: string
  invitation_token: string | null
  reason: string | null
  blocked_on: string | null
  createdBy: IUser | null
  blocked_by: string | null
  logo_path: string | null
  suspend_by: string | null
  suspend_on: string | null
  suspend_reason: string | null
  sectors: string[]
  business_unit: IBusinessUnit[]
}
