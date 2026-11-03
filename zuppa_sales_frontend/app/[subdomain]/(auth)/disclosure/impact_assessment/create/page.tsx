import React from 'react';

import ImpactAssessment from '@/components/Disclosure/ImpactAssessment/ImpactAssessment';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DataCube, UserService } from '@/lib/service';
import { IUser } from '@/lib/interface/IUser.interface';
import { IDataCube } from '@/lib/interface/IDataCube.interface';

async function page() {
  const session = await auth();
  if (!session) {
    return redirect('/sign_in');
  }
  const token = (session?.user as { accessToken: string })?.accessToken;
  const apiKey = (session?.user as unknown as { apiKey: string })?.apiKey;

  const userResponse = await UserService.getCurrentUser(apiKey, token);
  const { user } = userResponse?.data as {
    user: IUser;
    success: boolean;
  };
  const datacubeResponse = await DataCube.getDatacubes(apiKey, {}, token);

  const { datacubes } = datacubeResponse?.data as {
    datacubes: IDataCube[];
  };
  return <ImpactAssessment user={user} datacubes={datacubes} />;
}

export default page;
