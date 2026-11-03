/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
import AccessWrapper from '@/components/AccessWrapper/AccessWrapper';
import ListTaskByBusinessUnit from '@/components/ListTasks/ListTaskByBusinessUnit';
import ListTasks from '@/components/ListTasks/ListTasks';
import { auth } from '@/lib/auth';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { IMeta } from '@/lib/interface/IMeta.interface';
import { IUser, IUserFilter } from '@/lib/interface/IUser.interface';
import { DataCube, UserService } from '@/lib/service';
import { redirect } from 'next/navigation';

async function page({
  searchParams,
  params,
}: {
  searchParams: IUserFilter;
  params: {
    id: string;
  };
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
  const filterParams = {
    page: searchParams?.page,
    limit: searchParams?.limit,
    sort: searchParams?.sort,
    search: searchParams?.search,
    status: searchParams?.status,
    site_name: searchParams?.site_name,
    task_status: searchParams?.task_status,
    project: params?.id || '',
  };

  const dataCubeResponse = await DataCube.getByIdDatacubes(
    params.id,
    apiKey,
    token,
  );
  const { data } = dataCubeResponse?.data as {
    data: IDataCube;
  };

  const res = await DataCube.getTasks(params.id, apiKey, filterParams, token);
  const { datacube, meta } = res?.data as {
    datacube: IDataCube[];
    meta: IMeta;
  };

  // const response = await DataCube.getDatacubeBusinessUnitsBasedOnUser(
  //   data?.id,
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
    <AccessWrapper module="HEADER" feature="DATA_CUBES">
      <AccessWrapper module="DATA_CUBE" feature="UPDATE">
        <AccessWrapper module="TASK" feature="READ">
          {/* <ListTasks
            tasks={datacube?.flatMap((item) => item.task || [])}
            params={filterParams}
            dataCube={data}
            meta={meta}
          /> */}
          <ListTaskByBusinessUnit
            tasks={datacube?.flatMap((item) => item.task || [])}
            meta={meta}
            // params={params}
            // businessUnit={businessUnitData}
            apiKey={apiKey}
            token={token}
            dataCube={data}
            user={user}
          />
        </AccessWrapper>
      </AccessWrapper>
    </AccessWrapper>
  );
}

export default page;
