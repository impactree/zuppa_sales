/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITask } from '@/lib/interface/ITask.interface';
import { IUser } from '@/lib/interface/IUser.interface';
import { useMemo } from 'react';

interface UseTaskPermissionsProps {
  task: ITask | any;
  user: IUser | any;
}

export const useTaskPermissions = ({ task, user }: UseTaskPermissionsProps) => {
  const userRoles = useMemo(
    () => ({
      isAdmin: ['ADMIN', 'SUSTAINABILITY_MANAGER']?.includes(user?.role as string),
      isDataProvider: task?.data_provider?.id === user?.id,
      isDataReviewer: task?.data_reviewer?.id === user?.id,
    }),
    [user?.role, task?.data_provider?.id, task?.data_reviewer?.id, user?.id],
  );

  const taskPermissions = useMemo(
    () => ({
      canEnterData: (userRoles.isAdmin || userRoles.isDataProvider)
        && ['IN_PROGRESS', 'CREATED', 'REASSIGNED', 'REJECTED']?.includes(task?.status),
      canReview: (userRoles.isAdmin || userRoles.isDataReviewer)
        && ['SUBMITTED', 'REVIEWING']?.includes(task?.status),
    }),
    [userRoles, task?.status],
  );

  return {
    userRoles,
    taskPermissions,
  };
};
