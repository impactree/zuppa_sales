/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

'use client';

import { IMeta } from '@/lib/interface/IMeta.interface';
import { IUser, IUserFilter } from '@/lib/interface/IUser.interface';
import { UserService } from '@/lib/service';
import { convertToPascalCase, Params } from '@/lib/utils';
import { Session } from 'next-auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { TableColumn } from 'react-data-table-component';
import { toast } from 'react-hot-toast';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';
import AddorEditUser from '@/components/AddorEditUser/AddorEditUser';
import BlockOrUnblockOrDelete from '@/components/BlockOrUnblockOrDelete/BlockOrUnblockOrDelete';
import { Button } from '@/components/Button/Button';
import { useUser } from '@/components/Context/userProvider';
import Filter from '@/components/Filter/Filter';
import UserFilter from '@/components/Filter/UserFilter/UserFilter';
import { useModal } from '@/components/Modal/Context';
import PageHeaderWrapper from '@/components/PageHeaderWrapper/PageHeaderWrapper';
import { Pill } from '@/components/Pill/Pill';
import Search from '@/components/Search/Search';
import Sort from '@/components/Sort/Sort';
import Table from '@/components/Table/Table';
import { ActionType } from '@/components/types';
import StakeholderIdentification from './StakeholderIdentification';
// import { ActionType } from '@/components/types';

// type ActionType = 'view' | 'delete' | null;

type StakeholderIdentificationData = {
  id: string;
  financialYear: string;
  submittedBy: string;
  status: string;
};

export default function ListStakeholderIdentification({
  disclosureData,
  meta,
  params,
  session,
}: Readonly<{
  disclosureData: any;
  meta: IMeta;
  params: IUserFilter;
  session: Session | null;
}>) {
  const context = useUser();
  const router = useRouter();
  const apiKey = (session?.user as { apiKey: string })?.apiKey;
  const [actionType, setActionType] = useState<ActionType>(null);
  const [currentUser, setCurrentUser] = useState<
  StakeholderIdentificationData | undefined
  >(undefined);

  const handleDelete = (id: string) => {
    // Add delete confirmation logic here
  };
  interface ActionCellProps {
    row: IUser;
    setActionType: (data: ActionType) => void;
    // setCurrentUser: (data: IUser | undefined) => void;
    session: Session | null;
    // roleAccess: Record<string, string[]> | undefined;
  }

  const ActionCell = ({
    row,
    setActionType,
    // setCurrentUser,
    session,
    // roleAccess,
  }: ActionCellProps) => (
    <div className="ms-2" data-testid="action">
      <Dropdown>
        <Dropdown.Toggle className="dropdownTitle" data-testid="action">
          <PiDotsThreeOutlineVertical color="var(--textdark)" fontSize={22} />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-css p-3">
          {/* {row?.status === 'ACTIVE' && ( */}
          <Dropdown.Item
            data-testid="View"
            onClick={() => {
              // setActionType('Edit');
              // setCurrentUser(row);
              router.push(`/disclosure/stakeholder_identification/${row.id}/view`);
            }}
            className="my-2"
          >
            View
          </Dropdown.Item>
          <Dropdown.Item
            data-testid="Edit"
            onClick={() => {
              // setActionType('Edit');
              // setCurrentUser(row);
              router.push(`/disclosure/stakeholder_identification/${row.id}`);
            }}
            className="my-2"
          >
            Edit
          </Dropdown.Item>
          {/* )} */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );

  const columns: TableColumn<any>[] = [
    {
      name: (
        <div className="fs-13 fw-semibold letter-spacing">Financial Year</div>
      ),
      cell: (row) => (
        <div className="fs-12 fw-semibold letter-spacing text-capitalize">
          {row.datacube?.financial_year}
        </div>
      ),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: (
        <div className="fs-13 fw-semibold letter-spacing">Submitted By</div>
      ),
      cell: (row) => (
        <div className="fs-12 fw-semibold letter-spacing text-capitalize">
          {row.submitted_by?.name}
        </div>
      ),
      sortable: false,
      minWidth: '200px',
    },
    {
      name: <div className="fs-13 fw-semibold letter-spacing">Updated At</div>,
      cell: (row) => new Date(row?.updatedAt).toLocaleDateString('en-GB'),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: <div className="fs-13 fw-semibold letter-spacing">Status</div>,
      cell: (row) => (
        <div className="fs-12 fw-semibold letter-spacing text-capitalize text-success">
          {/* {row.status} */}
          Completed
        </div>
      ),
      sortable: true,
      minWidth: '200px',
    },
    {
      name: <div className="fs-13 fw-semibold letter-spacing">Actions</div>,
      cell: (row: any) => (
        // <div className="fs-12 fw-semibold letter-spacing text-primary cursor-pointer d-flex gap-2">
        //   <span onClick={() => router.push('/disclosure/miscellaneous')}>View</span>
        //   |
        //   <span onClick={() => handleDelete(row.id)}>Delete</span>
        // </div>
        <ActionCell
          row={row}
          setActionType={setActionType}
          // setCurrentUser={setCurrentUser}
          session={session}
          // roleAccess={context?.currentRole}
        />
      ),
      sortable: false,
      minWidth: '200px',
    },
  ];
  return (
    <div className="bg-white">
      <PageHeaderWrapper
        extraClassName="my-4 px-4 pt-3"
        iswhite
        title={`Stakeholder Identification (${meta?.totalCount || 0})`}
        stackComponent={(
          <div className="d-flex gap-3 flex-grow-1 justify-content-end flex-wrap flex-md-nowrap">
            <div>
              <Search
                params={params as unknown as Params}
                placeholder="Search User"
              />
            </div>

            <div>
              <Button
                isSolid
                text="Add Disclosure"
                onClick={() => router.push('/disclosure/stakeholder_identification/create')}
                // onClick={() => {
                //   setActionType('Edit');
                // }}
              />
            </div>
          </div>
        )}
      >
        <Table<StakeholderIdentificationData>
          data={disclosureData}
          columns={columns}
          meta={meta}
        />
      </PageHeaderWrapper>
    </div>
  );
}
