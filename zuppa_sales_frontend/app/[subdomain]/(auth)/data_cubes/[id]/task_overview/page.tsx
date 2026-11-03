import AccessWrapper from '@/components/AccessWrapper/AccessWrapper';
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
  const { success } = userResponse?.data as {
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
    project: params?.id || '',
  };

  const res = await DataCube.getTasks(params.id, apiKey, filterParams, token);
  const { datacube, meta } = res?.data as {
    datacube: IDataCube[];
    meta : IMeta;
  };

  const dataCubeResponse = await DataCube.getByIdDatacubes(
    params.id,
    apiKey,
    token,
  );
  const { data } = dataCubeResponse?.data as {
    data: IDataCube;
  };

  return (
    <AccessWrapper module="HEADER" feature="DATA_CUBES">
      <AccessWrapper module="DATA_CUBE" feature="UPDATE">
        <AccessWrapper module="TASK" feature="READ">
          <ListTasks
            tasks={datacube?.flatMap((item) => item.task || [])}
            params={filterParams}
            dataCube={data}
            meta={meta}
          />
        </AccessWrapper>
      </AccessWrapper>
    </AccessWrapper>
  );
}

export default page;
