/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */

'use client';

import { IDataCube } from '@/lib/interface/IDataCube.interface';
import { DataCube } from '@/lib/service';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { IoMdAdd, IoMdCheckboxOutline } from 'react-icons/io';
import {
  MdOutlineAdd,
  MdExpandMore,
  MdOutlineFormatListBulleted,
} from 'react-icons/md';

import { RiDeleteBinLine, RiLayout3Line } from 'react-icons/ri';
import { IMeta } from '../../lib/interface/IMeta.interface';
import Avatar from '../Avatar/Avatar';
import BlockOrUnblockOrDelete from '../BlockOrUnblockOrDelete/BlockOrUnblockOrDelete';
import { Button } from '../Button/Button';
import { useUser } from '../Context/userProvider';
import { useModal } from '../Modal/Context';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import PercentageBar from '../PercentageBar/PercentageBar';
import { Pill } from '../Pill/Pill';
import { ActionType } from '../types';
import './ListDataCubes.css';
import { Loader } from '../Loader/Loader';
import TablePagination from '../Pagination/Pagination';

interface TaskProgress {
  datacube_id: string;
  totalTasks: number;
  completedTasks: number;
  submittedTasks: number;
  taskProgressPercentage: number;
}

export const getActionMessage = (actionType: ActionType) => {
  if (actionType === 'Block') {
    return 'block this data cube';
  }
  if (actionType === 'Unblock') {
    return 'unblock this data cube';
  }
  return 'delete this data cube';
};

export const closeModal = (
  hideModal: () => void,
  setCurrentDataCube: (data: undefined) => void,
  setActionType: (data: null) => void,
  router: AppRouterInstance,
) => {
  hideModal();
  setCurrentDataCube(undefined);
  setActionType(null);
  router.refresh();
};

export const handleConfirm = async (
  currentDataCube: IDataCube | undefined,
  actionType: ActionType,
  params: {
    reason: string;
    apiKey: string;
  },
  hideModal: () => void,
  setCurrentDataCube: (data: undefined) => void,
  setActionType: (data: null) => void,
  router: AppRouterInstance,
) => {
  if (!currentDataCube) {
    return;
  }
  if (actionType === 'Block' && params?.reason.length <= 0) {
    toast.error('Please provide reason');
    return;
  }
  let response;
  if (actionType === 'Delete') {
    response = await DataCube.deleteDatacubes(
      currentDataCube.id,
      params?.apiKey,
    );
  }
  const { success, error } = response?.data as {
    success: boolean;
    error: string[];
  };

  if (success) {
    toast.success(
      `Data Cube ${actionType?.toLocaleLowerCase()?.includes('block') ? `${actionType}ed` : `${actionType}`}`,
    );
    closeModal(hideModal, setCurrentDataCube, setActionType, router);
  } else {
    toast.error(error[0]);
  }
};

export function ListDataCubes({
  datacubes,
  meta,
  params,
}: Readonly<{
  datacubes: IDataCube[];
  meta: IMeta;
  params: any;
}>) {
  const router = useRouter();
  const context = useUser();
  const hideModal = useModal({});
  const apiKey = context?.currentUser?.account?.api_key as string;
  const token = context?.currentUser?.token as string; // Assuming you have token in context

  const [actionType, setActionType] = useState<ActionType>(null);
  const [currentDataCube, setCurrentDataCube] = useState<
    IDataCube | undefined
  >();
  const [taskProgressMap, setTaskProgressMap] = useState<
    Record<string, TaskProgress>
  >({});
  const [loadingProgress, setLoadingProgress] = useState<
    Record<string, boolean>
  >({});
  const [isNavigating, setIsNavigating] = useState(false);
  const hasAccess = (feature: string) => context?.currentRole?.DATA_CUBE?.includes(feature);
  const hasTaskAccess = (feature: string) => context?.currentRole?.TASK?.includes(feature);

  // Fetch task progress for datacubes in DATA_COLLECTING status
  const fetchTaskProgress = async (datacubeId: string) => {
    if (loadingProgress[datacubeId]) return; // Prevent multiple calls

    setLoadingProgress((prev) => ({ ...prev, [datacubeId]: true }));

    try {
      const res = await DataCube.getTaskProgress(datacubeId, apiKey, {}, token);
      const taskResponse = res?.data as {
        data: TaskProgress;
        success: boolean;
      };

      if (taskResponse.success) {
        setTaskProgressMap((prev) => ({
          ...prev,
          [datacubeId]: taskResponse.data,
        }));
      }
    } catch (error) {
      console.error(
        `Error fetching task progress for datacube ${datacubeId}:`,
        error,
      );
    } finally {
      setLoadingProgress((prev) => ({ ...prev, [datacubeId]: false }));
    }
  };

  // Fetch task progress for all DATA_COLLECTING datacubes on component mount
  useEffect(() => {
    const dataCollectingCubes = datacubes.filter(
      (cube) => cube.status === 'DATA_COLLECTING',
    );

    dataCollectingCubes.forEach((cube) => {
      if (!taskProgressMap[cube.id] && !loadingProgress[cube.id]) {
        fetchTaskProgress(cube.id);
      }
    });
  }, [datacubes, apiKey, token]);

  const blockOrUnblockOrDeleteModal = useModal({
    content: (
      <BlockOrUnblockOrDelete
        actionType={actionType}
        onConfirm={(reason: string) => handleConfirm(
          currentDataCube,
          actionType,
          {
            reason,
            apiKey,
          },
          hideModal,
          setCurrentDataCube,
          setActionType,
          router,
        )}
        onClose={() => closeModal(hideModal, setCurrentDataCube, setActionType, router)}
        deleteText={`Are you sure you want to ${getActionMessage(actionType)}?`}
      />
    ),
  });

  useEffect(() => {
    if (currentDataCube && actionType === 'Delete') {
      blockOrUnblockOrDeleteModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDataCube, actionType]);

  const btnTextClass = 'd-flex align-items-center gap-2 justify-content-center';

  // Show loader if navigating
  if (isNavigating) {
    return <Loader />;
  }

  const capitalize = (text?: string) => {
    if (!text) return '';
    const str = text.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatFinancialYear = (year?: string) => {
    if (!year) return '';
    const [start, end] = year.split('-');
    return `${start}-${end.slice(-2)}`;
  };

  return (
    <>
      <PageHeaderWrapper
        title="Data Cubes"
        stackComponent={(
          <div className="d-flex align-items-center mb-0">
            <div className="">
              <Button
                className="rounded-1"
                isPill
                prefixIconChildren={
                  <MdOutlineAdd color="#FBA900" size={22} className="me-2" />
                }
                text="Create New Data Cube"
                onClick={() => {
                  router.push('/data_cubes/new');
                }}
              />
            </div>
          </div>
        )}
      >
        {datacubes?.map((datacube) => {
          const taskProgress = taskProgressMap[datacube.id];
          let completeProgress = 0;

          if (datacube.status === 'CREATED') {
            completeProgress = 25;
          } else if (datacube.status === 'SETUP') {
            completeProgress = 50;
          } else if (datacube.status === 'DATA_COLLECTING') {
            completeProgress = taskProgress?.taskProgressPercentage ?? 0;
          }
          return (
            <div className="cube-card-container  mb-2" key={datacube?.id}>
              <div className="cube-details-container d-flex align-items-center gap-2 h-100">
                {/* DATACUBE DETAILS */}
                <div className="datacube-details">
                  <p
                    className="fw-medium fs-13 mb-1"
                    style={{ color: 'var(--textLight' }}
                  >
                    {capitalize(datacube?.frequency)}
                  </p>
                  <h5 className="fw-semibold fs-16 mb-1">
                    {formatFinancialYear(datacube?.financial_year)}
                  </h5>
                  <Pill pillText={datacube?.status} pillClass="p-1" />
                </div>

                <div className="vertical-divider" />

                {/* STANDARDS */}
                <div className="px-3 standards-container">
                  <div
                    className="fs-13 mb-1"
                    style={{ color: 'var(--textLight' }}
                  >
                    Standards
                  </div>
                  <div className="d-flex gap-1 align-items-center flex-wrap">
                    {datacube?.standards?.slice(0, 4).map((standard) => {
                      const name = standard?.name || '';
                      return (
                        <div
                          key={standard?.id}
                          className="d-flex standard-pill"
                        >
                          <Avatar
                            name={name}
                            size="25px"
                            avator={standard?.logo_url || ''}
                          />
                          <span className="fs-12 fw-500 p-1">
                            {name.length > 4 ? `${name.slice(0, 5)}...` : name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="assign-btns-container d-flex justify-content-end align-items-center gap-3 px-3 h-100">
                {/* PROGRESS */}
                <div className="progress-wrapper pt-2 ml-2">
                  <PercentageBar
                    value={Math.round(completeProgress)}
                    suffixValueShown
                  />
                </div>

                <div className="vertical-divider" />

                {/* ACTION BUTTONS */}
                <div className="actions-wrapper">
                  {hasAccess('UPDATE') && (
                    <button
                      type="button"
                      className="datacube-btns"
                      disabled={datacube?.status !== 'CREATED'}
                      onClick={() => router.push(`/data_cubes/${datacube?.id}`)}
                    >
                      <IoMdCheckboxOutline size={24} color="#fba900" />
                      Assign Task
                    </button>
                  )}

                  {hasAccess('CONFIG') && (
                    <button
                      type="button"
                      className="datacube-btns"
                      disabled={datacube?.status !== 'CREATED'}
                      onClick={() => router.push(`/data_cubes/${datacube?.id}/task_overview`)}
                    >
                      <RiLayout3Line size={24} color="#fba900" />
                      Task Overview
                    </button>
                  )}

                  {(hasTaskAccess('UPDATE')
                    || hasTaskAccess('APPROVE/REJECT')) && (
                    <button
                      type="button"
                      className="datacube-btns"
                      disabled={datacube?.status === 'CREATED'}
                      onClick={() => router.push(`/data_cubes/${datacube?.id}/tasks`)}
                    >
                      <MdOutlineFormatListBulleted size={24} color="#fba900" />
                      Tasks
                    </button>
                  )}
                </div>

                {/* DELETE */}
                {hasAccess('DELETE') && (
                  <div className="delete-wrapper">
                    <RiDeleteBinLine
                      size={24}
                      color={
                        datacube.status === 'CREATED' ? '#DD4014' : '#e4e5e9'
                      }
                      className={
                        datacube.status === 'CREATED' ? 'cursor-pointer' : ''
                      }
                      onClick={() => {
                        if (datacube?.status === 'CREATED') {
                          setActionType('Delete');
                          setCurrentDataCube(datacube);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </PageHeaderWrapper>
      <TablePagination meta={meta} params={params} />
    </>
  );
}
