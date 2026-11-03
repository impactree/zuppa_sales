/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
import AccessWrapper from '@/components/AccessWrapper/AccessWrapper';
import ListTaskByBusinessUnit from '@/components/ListTasks/ListTaskByBusinessUnit';
import ListTasks from '@/components/ListTasks/ListTasks';
import { auth } from '@/lib/auth';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { IMeta } from '@/lib/interface/IMeta.interface';
import { ITask } from '@/lib/interface/ITask.interface';
import { IUser, IUserFilter } from '@/lib/interface/IUser.interface';
import { DataCube, TaskService, UserService } from '@/lib/service';
import { redirect } from 'next/navigation';

async function page({ searchParams }: { searchParams: IUserFilter }) {
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

  const params = {
    page: searchParams?.page,
    limit: searchParams?.limit || '50',
    sort: searchParams?.sort,
    search: searchParams?.search,
    status: searchParams?.status,
    site_name: searchParams?.site_name,
    task_status: searchParams?.task_status,
  };

  const dataCubeResponse = await DataCube.getDatacubes(apiKey, params, token);

  const { datacubes } = dataCubeResponse?.data as {
    datacubes: IDataCube[];
    // meta: IMeta;
  };

  // const res = await TaskService.getTasksBasedOnUser(apiKey, params, token);

  // const { task, meta } = res?.data as {
  //   task: ITask[];
  //   meta: IMeta;
  // };

  // const response = await TaskService.getBusinessUnitsBasedOnUser(
  //   apiKey,
  //   params,
  //   token
  // );

  // const { data } = response?.data as {
  //   data: any;
  //   // meta: IMeta;
  // };

  // const businessUnitData = response?.data;

  return (
    <AccessWrapper module="HEADER" feature="TASKS">
      <AccessWrapper feature="READ" module="TASK">
        {/* <ListTasks tasks={task} meta={meta} params={params} /> */}
        <ListTaskByBusinessUnit
          // tasks={task}
          // meta={meta}
          // params={params}
          // businessUnit={businessUnitData}
          apiKey={apiKey}
          token={token}
          dataCube={datacubes}
          user={user}
        />
      </AccessWrapper>
    </AccessWrapper>
  );
}

export default page;
