import CustomDashboardView from '@/components/CustomDashboard/CustomDashboardView';
import React from 'react';
import { auth } from '@/lib/auth';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { DataCube } from '@/lib/service';
import { redirect } from 'next/navigation';

export default async function page() {
  const session = await auth();
  if (!session) {
    return redirect('/sign_in');
  }
  const token = (session?.user as { accessToken: string })?.accessToken;
  const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;
  // const res = await StandardService.getModuleList(token);
  // const { data } = res?.data as {
  //   success: boolean;
  //   data: IModules[];
  // };
  const datacubeResponse = await DataCube.getDatacubes(apiKey, {}, token);

  const { datacubes } = datacubeResponse?.data as {
    datacubes: IDataCube[];
  };
  return (
    <CustomDashboardView
      // modulesList={data}
      datacubes={datacubes}
      token={token}
      apiKey={apiKey}
    />
  );
}
