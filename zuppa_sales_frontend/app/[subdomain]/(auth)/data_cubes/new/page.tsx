import AccessWrapper from '@/components/AccessWrapper/AccessWrapper';
import StandardRegulationsForm from '@/components/StandardRegulationsForm/StandardRegulationsForm';
import { auth } from '@/lib/auth';
import { IStandard } from '@/lib/interface/IStandard.interface';
import { IUser } from '@/lib/interface/IUser.interface';
import { DataCube, UserService } from '@/lib/service';
import { redirect } from 'next/navigation';

async function page() {
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
  const res = await DataCube.getAllStandards(apiKey, token);
  const { standards } = res?.data as {
    standards: IStandard[];
  };

  return (
    <AccessWrapper module="HEADER" feature="DATA_CUBES">
      <AccessWrapper module="DATA_CUBE" feature="WRITE">
        <StandardRegulationsForm standards={standards} account={user?.account} />
      </AccessWrapper>
    </AccessWrapper>
  );
}

export default page;
