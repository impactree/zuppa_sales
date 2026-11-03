/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
import DashboardDepartment from '@/components/DashboardDepartment/Dashboard';
import { auth } from '@/lib/auth';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { DataCube, TenantDepartmentService } from '@/lib/service';
import { redirect } from 'next/navigation';
import React from 'react';

export interface IDepartment {
  id: string;
  name: string;
  description?: string;
}

export default async function Page() {
  const session = await auth();

  if (!session) {
    return redirect('/sign_in');
  }

  const token = (session?.user as { accessToken: string })?.accessToken;
  const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;

  try {
    const datacubeResponse = await DataCube.getDatacubes(apiKey, {}, token);
    const { datacubes } = datacubeResponse?.data as {
      datacubes: IDataCube[];
    };

    const departmentResponse = await TenantDepartmentService.getAll(
      {},
      apiKey,
      token,
    );

    const departments = departmentResponse?.data as {
      departments?: IDepartment[];
      data?: IDepartment[];
    };

    // const departmentData = departments?.departments || departments?.data || [];

    return (
      <DashboardDepartment
        datacubes={datacubes}
        token={token}
        apiKey={apiKey}
      />
    );
  } catch (error) {
    console.error('Error fetching data:', error);

    return <DashboardDepartment datacubes={[]} token={token} apiKey={apiKey} />;
  }
}
