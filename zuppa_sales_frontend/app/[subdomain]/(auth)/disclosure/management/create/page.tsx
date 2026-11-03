import React from 'react';

import ManagementDisclosure from '@/components/Disclosure/ManagementDisclosure/ManagementDisclosure';
import { IUser } from '@/lib/interface/IUser.interface';
import { DataCube, UserService } from '@/lib/service';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
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
  };
  const datacubeResponse = await DataCube.getDatacubes(apiKey, {}, token);

  const { datacubes } = datacubeResponse?.data as {
    datacubes: IDataCube[];
  };
  return <ManagementDisclosure user={user} datacubes={datacubes} />;
}

export default page;
