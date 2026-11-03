/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import React from 'react';
import MiscellaneousDisclosure from '@/components/Disclosure/MiscellaneousDisclosure/MiscellaneousDisclosure';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DisclosureService, UserService } from '@/lib/service';
import { IUser } from '@/lib/interface/IUser.interface';

async function page(props: any) {
  const { id } = props.params;
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

  const disclosureResponse = await DisclosureService.getDisclosureById(
    id,
    apiKey,
    token,
  );
  //   const { user, success } = disclosureResponse?.data as {
  //     user: IUser;
  //     success: boolean;
  //   };
  const { disclosure } = disclosureResponse.data;
  const datacube = disclosureResponse?.data?.disclosure?.datacube;

  return (
    <MiscellaneousDisclosure
      user={user}
      disclosureData={disclosure}
      id={id}
      apiKey={apiKey}
      datacubes={
        Array.isArray(datacube) ? datacube : datacube ? [datacube] : []
      }
    />
  );
}

export default page;
