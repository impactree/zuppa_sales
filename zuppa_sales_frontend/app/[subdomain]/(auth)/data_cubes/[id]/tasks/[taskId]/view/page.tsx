import AccessWrapper from '@/components/AccessWrapper/AccessWrapper';
import TaskDataEntryForm from '@/components/TaskDataEntryForm/TaskDataEntryForm';
import { auth } from '@/lib/auth';
import { ITask } from '@/lib/interface/ITask.interface';
import { IUser } from '@/lib/interface/IUser.interface';
import { TaskService, UserService } from '@/lib/service';
import { Params } from '@/lib/utils';
import { redirect } from 'next/navigation';

export default async function page({
  params,
  searchParams,
}: {
  params: {
    id: string;
    taskId: string;
  };
  searchParams: Params;
}) {
  const session = await auth();
  if (!session) {
    return redirect('/sign_in');
  }
  const token = (session?.user as { accessToken: string })?.accessToken;
  const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;

  const userResponse = await UserService.getCurrentUser(apiKey, token);
  const { user, success } = userResponse?.data as {
    user: IUser;
    success: boolean;
  };

  if (!success) {
    return redirect('/sign_in');
  }
  const res = await TaskService.getById(params?.taskId, apiKey, token);
  const { task } = res?.data as {
    task: ITask;
  };

  return (
    <AccessWrapper module="HEADER" feature="DATA_CUBES">
      <AccessWrapper module="DATA_CUBE" feature="UPDATE">
        <AccessWrapper module="TASK" feature="UPDATE">
          <TaskDataEntryForm
            params={searchParams}
            currentTask={task}
            user={user}
          />
        </AccessWrapper>
      </AccessWrapper>
    </AccessWrapper>
  );
}
