/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import ListStakeholderIdentification from '@/components/Disclosure/StakeholderIdentification/ListStakeholderIdentification';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { IUser, IUserFilter } from '@/lib/interface/IUser.interface';
import { DataCube, DisclosureService, UserService } from '@/lib/service';
import { IMeta } from '@/lib/interface/IMeta.interface';
import StakeholderIdentification from '@/components/Disclosure/StakeholderIdentification/StakeholderIdentification';
import { IDataCube } from '@/lib/interface/IDataCube.interface';

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
    page: searchParams?.page || '1',
    limit: searchParams?.limit || '10',
    sort: searchParams?.sort,
    search: searchParams?.search,
    status: searchParams?.status,
    site_name: searchParams?.site_name,
  };

  const res = await DisclosureService.getDisclosureByName(
    'Stakeholder Identification',
    params,
    apiKey,
    token,
  );

  const { disclosure, meta } = res?.data as {
    disclosure: any;
    meta: IMeta;
  };
  const datacubeResponse = await DataCube.getDatacubes(apiKey, {}, token);

  const { datacubes } = datacubeResponse?.data as {
    datacubes: IDataCube[];
  };
  return (
    <>
      {disclosure?.length > 0 ? (
        <ListStakeholderIdentification
          disclosureData={disclosure}
          meta={meta}
          params={params}
          session={session}
        />
      ) : (
        <StakeholderIdentification user={user} datacubes={datacubes} />
      )}
    </>
  );
}

export default page;
