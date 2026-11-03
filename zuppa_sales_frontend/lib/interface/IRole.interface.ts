export interface IRolesAndAccess {
  role: string[];
  module: string[];
  feature: Record<string, string[]>;
}

export interface IRoleAccess {
  [role: string]: {
    [module: string]: string[];
  };
}
