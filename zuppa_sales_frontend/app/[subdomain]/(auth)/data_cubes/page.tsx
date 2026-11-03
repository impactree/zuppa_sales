/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
import AccessWrapper from '@/components/AccessWrapper/AccessWrapper';
import { ListDataCubes } from '@/components/ListDataCubes/ListDataCubes';
import TablePagination from '@/components/Pagination/Pagination';
import StandardRegulationsForm from '@/components/StandardRegulationsForm/StandardRegulationsForm';
import { auth } from '@/lib/auth';
import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { IMeta } from '@/lib/interface/IMeta.interface';
import { IStandard } from '@/lib/interface/IStandard.interface';
import { IUser, IUserFilter } from '@/lib/interface/IUser.interface';
import { DataCube, UserService } from '@/lib/service';
import { redirect } from 'next/navigation';

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
  const res = await DataCube.getAllStandards(apiKey, token);
  const { standards } = res?.data as {
    standards: IStandard[];
  };

  const params = {
    page: searchParams?.page,
    limit: searchParams?.limit,
    sort: searchParams?.sort,
    search: searchParams?.search,
    status: searchParams?.status,
  };

  const dataCubeResponse = await DataCube.getDatacubes(apiKey, params, token);

  const { datacubes, meta } = dataCubeResponse?.data as {
    datacubes: IDataCube[];
    meta: IMeta;
  };

  return (
    <AccessWrapper module="HEADER" feature="DATA_CUBES">
      <AccessWrapper module="DATA_CUBE" feature="READ">
        {datacubes?.length > 0 ? (
          <>
            <ListDataCubes datacubes={datacubes} meta={meta} params={params} />
            {/* <TablePagination meta={meta} params={params} /> */}
          </>
        ) : (
          <StandardRegulationsForm
            standards={standards}
            account={user?.account}
          />
        )}
      </AccessWrapper>
    </AccessWrapper>
  );
}

export default page;
