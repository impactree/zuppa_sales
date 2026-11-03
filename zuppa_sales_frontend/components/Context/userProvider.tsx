'use client';

import { IRoleAccess } from '@/lib/interface/IRole.interface';
import { IUser } from '@/lib/interface/IUser.interface';
import { RoleService, UserService } from '@/lib/service';
import { useParams } from 'next/navigation';
import React, {
  ReactNode,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';

export interface UserContextProp {
  getCurrentUser: () => Promise<{
    user: IUser;
  } | null>;
  currentUser: IUser | undefined;
  currentRole: Record<string, string[]> | undefined;
  getCurrentRoleAccess: () => Promise<{
    access: Record<string, string[]>;
  } | null>;
  roleAccessDetails: IRoleAccess | undefined;
  getRoleAccess: () => Promise<{
    roleAccess: IRoleAccess;
  } | null>;
}
export interface UserProviderProps {
  children: ReactNode;
}

const UserContext = React.createContext<UserContextProp | null>(null);

function UserProvider({ children }: Readonly<UserProviderProps>) {
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [currentUser, setCurrentUser] = useState<IUser | undefined>(() => {
    if (typeof window === 'undefined') return undefined;
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : undefined;
  });

  const [currentRole, setCurrentRole] = useState<
    Record<string, string[]> | undefined
  >(() => {
    if (typeof window === 'undefined') return undefined;
    const stored = localStorage.getItem('currentRole');
    return stored ? JSON.parse(stored) : undefined;
  });

  const [roleAccessDetails, setRoleAccessDetails] = useState<IRoleAccess>();

  const getRoleAccess = useCallback(async () => {
    const res = await RoleService.getRoleDetails(params?.subdomain as string);
    const { role_access: roleAccess, success } = res?.data as {
      role_access: IRoleAccess;
      success: boolean;
    };
    if (success) {
      setRoleAccessDetails(roleAccess);
      return { roleAccess };
    }
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentRoleAccess = useCallback(async () => {
    const res = await RoleService.getCurrentAccess(params?.subdomain as string);
    const { access, success } = res?.data as {
      access: Record<string, string[]>;
      success: boolean;
    };

    if (success) {
      setCurrentRole(access);
      localStorage.setItem('currentRole', JSON.stringify(access)); // optional redundancy
      return { access };
    }
    return null;
  }, [params?.subdomain]);

  const getCurrentUser = useCallback(async () => {
    const res = await UserService.getCurrentUser(params?.subdomain as string);
    const { user, success } = res?.data as {
      user: IUser;
      success: boolean;
    };

    if (success) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user)); // ✅ ADD

      const roleRes = await getCurrentRoleAccess();
      if (roleRes?.access) {
        localStorage.setItem('currentRole', JSON.stringify(roleRes.access)); // ✅ ADD
      }

      return { user };
    }
    return null;
  }, [params?.subdomain, getCurrentRoleAccess]);

  const value: UserContextProp = useMemo(
    () => ({
      getCurrentUser,
      currentUser,
      currentRole,
      getCurrentRoleAccess,
      roleAccessDetails,
      getRoleAccess,
    }),
    [
      getCurrentUser,
      currentUser,
      currentRole,
      getCurrentRoleAccess,
      roleAccessDetails,
      getRoleAccess,
    ],
  );

  if (!isMounted) {
    return null; // or a loader if you want
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

const useUser = () => React.useContext(UserContext);
export { UserProvider, useUser };
