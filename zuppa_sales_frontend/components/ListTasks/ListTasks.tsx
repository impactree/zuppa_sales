/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable no-console */

'use client';

import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { IUser } from '@/lib/interface/IUser.interface';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Dropdown } from 'react-bootstrap';
import { TableColumn } from 'react-data-table-component';
import toast from 'react-hot-toast';
import { PiDotsThreeOutlineVertical } from 'react-icons/pi';
import { FaChevronDown } from 'react-icons/fa';
import { IMeta } from '../../lib/interface/IMeta.interface';
import { ITask } from '../../lib/interface/ITask.interface';
import { TaskService } from '../../lib/service';
import { Params, transformToNestedStructure } from '../../lib/utils';
import BlockOrUnblockOrDelete from '../BlockOrUnblockOrDelete/BlockOrUnblockOrDelete';
import { Button } from '../Button/Button';
import { useUser } from '../Context/userProvider';
import { useModal } from '../Modal/Context';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import { Pill } from '../Pill/Pill';
import Search from '../Search/Search';
// import Sort from '../Sort/Sort';
import Table from '../Table/Table';
import TaskAssignForm from '../TaskAssignForm/TaskAssignForm';
import { ActionType, BreadCrumbProps } from '../types';
import ConfigureForm from './ConfigureForm';

interface ActionCellProps {
  row: ITask;
  setCurrentTask: (value: ITask) => void;
  setActionType: (value: ActionType) => void;
  router: AppRouterInstance;
  projectid?: string;
  roleAccess: Record<string, string[]> | undefined;
  user: IUser | undefined;
}

interface StatusOption {
  value: string;
  label: string;
}

const statusOptions: StatusOption[] = [
  { value: '', label: 'All Status' },
  { value: 'CREATED', label: 'Created' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'REASSIGNED', label: 'Reassigned' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'REVIEWING', label: 'Reviewing' },
  { value: 'SUBMITTED', label: 'Submitted' },
  { value: 'REJECTED', label: 'Rejected' },
];

const StatusFilter = ({ paramName }: { paramName: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  useEffect(() => {
    const currentStatus = searchParams.get(paramName) || '';
    setSelectedStatus(currentStatus);
  }, [searchParams, paramName]);

  const updateSearchParams = useCallback(
    (value: string) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (value) {
        current.set(paramName, value);
      } else {
        current.delete(paramName);
      }

      current.delete('page');

      const search = current.toString();
      const query = search ? `?${search}` : '';

      router.push(`${pathname}${query}`);
    },
    [router, pathname, searchParams, paramName],
  );

  const handleStatusChange = useCallback(
    (value: string) => {
      setSelectedStatus(value);
      updateSearchParams(value);
    },
    [updateSearchParams],
  );

  const getSelectedLabel = () => {
    const option = statusOptions.find((opt) => opt.value === selectedStatus);
    return option ? option.label : 'All Status';
  };

  return (
    <div className="status-filter">
      <style jsx>
        {`
          .dropdown-item.active,
          .dropdown-item:active,
          .dropdown-item.custom-active {
            background-color: var(--textsecondary) !important;
            color: #000 !important;
          }
          .dropdown-item.custom-active:hover {
            background-color: var(--textsecondary) !important;
            color: #000 !important;
          }
        `}
      </style>
      <Dropdown>
        <Dropdown.Toggle
          className="d-flex align-items-center justify-content-between gap-2 px-3 py-2 border rounded"
          style={{
            backgroundColor: 'white',
            border: '1px solid #ced4da',
            color: '#495057',
            minWidth: '160px',
            fontSize: '14px',
          }}
          id="status-filter-dropdown"
        >
          <span>{getSelectedLabel()}</span>
          <FaChevronDown size={12} />
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ minWidth: '160px' }}>
          {statusOptions.map((option) => (
            <Dropdown.Item
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              className={`d-flex align-items-center py-2 px-3 ${selectedStatus === option.value ? 'custom-active' : ''}`}
              style={{
                fontSize: '14px',
                backgroundColor:
                  selectedStatus === option.value
                    ? 'var(--textsecondary) !important'
                    : 'transparent',
                color:
                  selectedStatus === option.value
                    ? '#000 !important'
                    : '#495057',
              }}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const useTaskAccess = (
  roleAccess: Record<string, string[]> | undefined,
  user: IUser | undefined,
) => useMemo(() => {
  const isAdmin = ['ADMIN', 'SUSTAINABILITY_MANAGER']?.includes(
      user?.role as string,
  );
  const hasAccess = (feature: string) => roleAccess?.TASK?.includes(feature);
  const canUpdate = hasAccess('REASSIGN') && isAdmin;
  const canAccess = hasAccess('READ')
      || canUpdate
      || hasAccess('DELETE')
      || hasAccess('APPROVE/REJECT');

  return {
    isAdmin,
    hasAccess,
    canUpdate,
    canAccess,
  };
}, [roleAccess, user?.role]);

const ActionCell = ({
  row,
  setCurrentTask,
  setActionType,
  router,
  projectid,
  roleAccess,
  user,
}: ActionCellProps) => {
  const pathname = usePathname();
  const {
    isAdmin, hasAccess, canUpdate, canAccess,
  } = useTaskAccess(
    roleAccess,
    user,
  );

  const isDataProvider = useMemo(
    () => row?.data_provider?.id === user?.id,
    [row?.data_provider?.id, user?.id],
  );
  const isDataReviewer = useMemo(
    () => row?.data_reviewer?.id === user?.id,
    [row?.data_reviewer?.id, user?.id],
  );
  const isCompleted = useMemo(() => row?.status === 'COMPLETED', [row?.status]);

  const handleViewClick = useCallback(() => {
    router.push(
      pathname?.startsWith('/tasks')
        ? `/tasks/${row?.id}`
        : `/data_cubes/${projectid}/tasks/${row.id}/view`,
    );
  }, [pathname, projectid, row?.id, router]);

  const handleReassignClick = useCallback(() => {
    setCurrentTask(row);
    setActionType('Re-Assign');
  }, [row, setCurrentTask, setActionType]);

  if (!canAccess) {
    return <div>-</div>;
  }

  const canView = (isAdmin || isDataProvider)
    && ['CREATED', 'IN_PROGRESS', 'REASSIGNED', 'REJECTED']?.includes(
      row?.status,
    )
    && hasAccess('READ');

  const canApproveReject = (isAdmin || isDataReviewer)
    && ['REVIEWING', 'SUBMITTED']?.includes(row?.status)
    && hasAccess('APPROVE/REJECT');

  const canReassign = canUpdate && !isCompleted;

  return (
    <div data-testid="action" className="ms-2">
      <Dropdown>
        <Dropdown.Toggle className="dropdownTitle" data-testid="action">
          <PiDotsThreeOutlineVertical color="var(--textdark)" fontSize={22} />
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-css p-3">
          {isCompleted && (
            <Dropdown.Item
              data-testid="View"
              onClick={handleViewClick}
              className="my-2"
            >
              View
            </Dropdown.Item>
          )}
          {canView && (
            <Dropdown.Item
              data-testid="View"
              onClick={handleViewClick}
              className="my-2"
            >
              View
            </Dropdown.Item>
          )}
          {canApproveReject && (
            <Dropdown.Item
              data-testid="View"
              onClick={handleViewClick}
              className="my-2"
            >
              Approve / Reject
            </Dropdown.Item>
          )}
          {canReassign && (
            <Dropdown.Item
              data-testid="Re-Assign"
              onClick={handleReassignClick}
              className="my-2"
            >
              Re-Assign
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default function ListTasks({
  tasks,
  meta,
  params,
  dataCube,
}: Readonly<{
  tasks: ITask[];
  meta?: IMeta;
  params?: Params;
  dataCube?: IDataCube;
}>) {
  console.log('List Tasks Datacube', dataCube);
  console.log('List Tasks Task', tasks);
  const context = useUser();
  const urlParams = useParams();
  const router = useRouter();
  const [currentTask, setCurrentTask] = useState<ITask | undefined>();
  const [actionType, setActionType] = useState<ActionType>(null);
  const hideModal = useModal({});
  const pathname = usePathname();
  const urlParamas = useParams();
  const searchParams = useSearchParams();

  const onClose = useCallback(() => {
    hideModal();
    setActionType(null);
    setCurrentTask(undefined);
  }, [hideModal]);

  const configureModal = useModal({
    style: {
      title: 'Configure & Publish',
    },
    content: (
      <ConfigureForm onClose={onClose} task={tasks} dataCube={dataCube} />
    ),
  });

  const handleConfirm = useCallback(
    async (reason: string) => {
      if (!currentTask) {
        return;
      }
      if (actionType === 'Block' && reason.length <= 0) {
        toast.error('Please provide reason');
        return;
      }

      try {
        const response = await TaskService.deleteTask(
          currentTask.id,
          urlParams?.subdomain as string,
        );
        const { success, error } = response?.data as {
          success: boolean;
          error: string[];
        };

        if (success) {
          toast.success(
            `Task ${actionType?.toLocaleLowerCase()?.includes('block') ? `${actionType}ed` : `${actionType}`}`,
          );
          onClose();
          router.refresh();
        } else {
          toast.error(error[0]);
        }
      } catch (err) {
        console.error('Error confirming action:', err);
        toast.error('An error occurred while processing the request');
      }
    },
    [actionType, currentTask, onClose, router, urlParams?.subdomain],
  );

  const updateModal = useModal({
    style: {
      title: 'Re-Assign Task',
      onClose: () => onClose(),
    },
    content: (
      <TaskAssignForm
        actionType="Re-Assign"
        onClose={onClose}
        currentTask={currentTask}
        dataCube={dataCube}
      />
    ),
  });

  const blockOrUnblockOrDeleteModal = useModal({
    content: (
      <BlockOrUnblockOrDelete
        actionType={actionType}
        onConfirm={(reason: string) => handleConfirm(reason)}
        onClose={() => onClose()}
        deleteText="Are you sure you want to delete this task?"
      />
    ),
  });

  useEffect(() => {
    switch (actionType) {
      case 'Re-Assign':
        updateModal();
        break;
      case 'Delete':
        blockOrUnblockOrDeleteModal();
        break;
      case 'Configure':
        configureModal();
        break;
      default:
        break;
    }
  }, [
    actionType,
    currentTask,
    updateModal,
    blockOrUnblockOrDeleteModal,
    configureModal,
  ]);

  useEffect(() => {
    const siteNameParam = searchParams.get('site_name');
    if (siteNameParam) {
      console.log('Site name search param:', siteNameParam);
    }
  }, [searchParams]);

  const columns: TableColumn<ITask | any>[] = useMemo(
    () => [
      {
        name: (
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="fs-13 fw-semibold letter-spacing">Module Name</div>
          </div>
        ),
        cell: (row) => {
          const modules = transformToNestedStructure(row?.task_questions);
          return (
            <div className="fs-12 fw-semibold letter-spacing text-capitalize">
              {pathname?.startsWith('/data_cubes')
                ? row?.module_name
                : modules?.map((item) => item?.name).join(', ')}
            </div>
          );
        },
        sortable: true,
        minWidth: '200px',
      },
      {
        name: (
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="fs-13 fw-semibold letter-spacing">
              Financial Year
            </div>
          </div>
        ),
        cell: (row) => (
          <div className="fs-12 fw-medium letter-spacing">
            {row?.datacube_frequency?.datacube?.financial_year}
          </div>
        ),
        sortable: true,
        minWidth: '130px',
      },
      {
        name: (
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="fs-13 fw-semibold letter-spacing">Site Name</div>
          </div>
        ),
        cell: (row) => (
          <div className="fs-12 fw-medium letter-spacing">
            {`${row?.site?.name ?? ''}${row?.site?.location ? ` , ${row.site.location}` : ''}`}
          </div>
        ),
        sortable: true,
        minWidth: '150px',
      },
      {
        name: (
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="fs-13 fw-semibold letter-spacing">Frequency</div>
          </div>
        ),
        cell: (row) => (
          <div className="fs-12 fw-medium letter-spacing">
            {row?.datacube_frequency?.frequency_name}
          </div>
        ),
        sortable: true,
        minWidth: '130px',
      },
      {
        name: (
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="fs-13 fw-semibold letter-spacing">Status</div>
          </div>
        ),
        cell: (row) => <Pill pillText={row?.status} />,
        selector: (row) => row?.status,
        sortable: true,
        minWidth: '130px',
      },
      {
        name: (
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="fs-13 fw-semibold letter-spacing">
              Data Provider
            </div>
          </div>
        ),
        cell: (row) => <div>{row?.data_provider?.name}</div>,
        sortable: true,
        minWidth: '150px',
        omit:
          !['ADMIN', 'SUSTAINABILITY_MANAGER'].includes(
            context?.currentUser?.role as string,
          ) && context?.currentUser?.role !== 'DATA_REVIEWER',
      },
      {
        name: (
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="fs-13 fw-semibold letter-spacing">
              Data Reviewer
            </div>
          </div>
        ),
        cell: (row) => <div>{row?.data_reviewer?.name}</div>,
        sortable: true,
        minWidth: '150px',
        omit:
          !['ADMIN', 'SUSTAINABILITY_MANAGER'].includes(
            context?.currentUser?.role as string,
          ) && context?.currentUser?.role !== 'DATA_PROVIDER',
      },
      {
        name: <div className="fs-13 fw-semibold letter-spacing">Actions</div>,
        cell: (row) => (
          <ActionCell
            row={row}
            setCurrentTask={setCurrentTask}
            setActionType={setActionType}
            router={router}
            projectid={urlParamas?.id as string}
            roleAccess={context?.currentRole}
            user={context?.currentUser}
          />
        ),
        sortable: false,
        minWidth: '20px',
        omit:
          pathname.endsWith('/task_overview')
          || (pathname.startsWith('/data_cubes')
            && pathname.endsWith('/tasks')
            && dataCube?.status === 'CREATED'),
      },
    ],
    [context, pathname, router, urlParamas?.id, dataCube?.status],
  );

  const breadCrumbsItem = useMemo(() => {
    const isTaskPath = pathname?.startsWith('/tasks');
    const taskCount = meta?.totalCount || meta?.totalcount || tasks?.length || 0;

    if (isTaskPath) {
      return [];
    }

    return [
      {
        title: 'Data Cube',
        url: '/data_cubes',
        tag: true,
      },
      {
        title: dataCube?.name || '',
        url: `/data_cubes/${dataCube?.id}`,
        tag: true,
      },
      {
        title: pathname?.endsWith('/tasks')
          ? `Tasks (${taskCount})`
          : 'Task Overview',
        url: `/data_cubes/${dataCube?.id}/${pathname?.endsWith('/tasks') ? 'tasks' : 'task_overview'}`,
      },
    ];
  }, [
    meta?.totalCount,
    meta?.totalcount,
    pathname,
    dataCube?.id,
    dataCube?.name,
    tasks?.length,
  ]);

  const title = useMemo(() => {
    if (pathname.endsWith('/task_overview')) {
      return 'Task Overview';
    }

    const count = pathname.startsWith('/tasks')
      ? meta?.totalCount || meta?.totalcount || 0
      : meta?.totalCount || meta?.totalcount || 0;

    return `Tasks (${count})`;
  }, [pathname, meta?.totalCount, meta?.totalcount]);

  const breadCrumbMenu: BreadCrumbProps[] = useMemo(
    () => (breadCrumbsItem.length > 0
      ? [
        {
          title,
          breadCrumb: breadCrumbsItem,
        },
      ]
      : []),
    [breadCrumbsItem, title],
  );

  return (
    <div className="bg-white">
      <PageHeaderWrapper
        breadCrumbMenu={breadCrumbMenu}
        extraClassName="my-4 px-4 pt-3"
        iswhite
        title={title}
        stackComponent={(
          <div className="d-flex align-items-center gap-3 flex-grow-1 justify-content-end">
            {pathname?.endsWith('/tasks') && (
              <div className="d-flex flex-grow-1 gap-3 justify-content-end flex-wrap flex-md-nowrap">
                <div className="">
                  <Search
                    params={params as unknown as Params}
                    placeholder="Search Module"
                    paramName="search"
                  />
                </div>

                <div className="">
                  <Search
                    params={params as unknown as Params}
                    placeholder="Search Site Name"
                    paramName="site_name"
                  />
                </div>

                <div className="">
                  <StatusFilter paramName="task_status" />
                </div>

                {/* <div>
                  <Sort params={params as unknown as Params} />
                </div> */}
              </div>
            )}
            {pathname?.endsWith('/task_overview')
              && context?.currentRole?.DATA_CUBE?.includes('CONFIG') && (
                <div className="">
                  <Button
                    isPill
                    text="Configure / Publish"
                    onClick={() => {
                      setActionType('Configure');
                    }}
                    isDisabled={
                      dataCube?.status !== 'CREATED' || !(tasks?.length > 0)
                    }
                  />
                </div>
            )}
          </div>
        )}
      >
        <Table<ITask> data={tasks} columns={columns} meta={meta} />
      </PageHeaderWrapper>
    </div>
  );
}
