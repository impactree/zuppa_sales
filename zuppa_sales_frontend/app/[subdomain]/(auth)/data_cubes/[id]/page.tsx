import AccessWrapper from '@/components/AccessWrapper/AccessWrapper';
import AssignModule from '@/components/AssignModule/AssignModule';
import { auth } from '@/lib/auth';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { IModules } from '@/lib/interface/IStandard.interface';
import { DataCube, UserService } from '@/lib/service';
import { redirect } from 'next/navigation';

export default async function page({
  params,
}: {
  params: {
    id: string,
  },
}) {
  const session = await auth();
  if (!session) {
    return redirect('/sign_in');
  }
  const token = (session?.user as { accessToken: string })?.accessToken;
  const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;

  const userResponse = await UserService.getCurrentUser(apiKey, token);
  const { success } = userResponse?.data as {
    success: boolean;
  };

  if (!success) {
    return redirect('/sign_in');
  }

  const dataCubeResponse = await DataCube.getByIdDatacubes(params.id, apiKey, token);
  const { data } = dataCubeResponse?.data as {
    data: IDataCube;
  };

  const standardRes = await DataCube.datacubeStandards(
    apiKey,
    data?.standards?.map((
      item,
    ) => item?.id),
    token,
  );

  const { data: _data } = standardRes?.data as {
    data: IModules[];
  };

  return (
    <AccessWrapper module="HEADER" feature="DATA_CUBES">
      <AccessWrapper module="DATA_CUBE" feature="UPDATE">
        <AssignModule modules={_data} dataCube={data} />
      </AccessWrapper>
    </AccessWrapper>
  );
}
