/* eslint-disable max-len */
/* eslint no-shadow: off */
/* eslint-disable no-unused-vars */
/* eslint @typescript-eslint/no-unused-vars: off */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */

'use client';

import { useTaskCalculations } from '@/lib/hooks/useTaskCalculations';
import { useTaskForm } from '@/lib/hooks/useTaskForm';
import { useTaskPermissions } from '@/lib/hooks/useTaskPermissions';
import { ITask, ITaskQuestions } from '@/lib/interface/ITask.interface';
import { IUser } from '@/lib/interface/IUser.interface';
import {
  cleanedQuestions,
  isNotNull,
  Params,
  shouldShowSubindicator,
} from '@/lib/utils';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { MdOutlineFileDownload } from 'react-icons/md';
import { IoChevronDown, IoChevronUp, IoRepeat } from 'react-icons/io5';
import { RiFileExcel2Line } from 'react-icons/ri';
import { TaskService } from '@/lib/service';
import toast from 'react-hot-toast';
import { Button } from '../Button/Button';
import { useUser } from '../Context/userProvider';
import { useModal, useModalControls } from '../Modal/Context';
import PageHeaderWrapper from '../PageHeaderWrapper/PageHeaderWrapper';
import { Pill } from '../Pill/Pill';
import ParentQuestionRenders from './ParentQuestionRenders';
import PreviewModal from './PreviewModal';
import './TaskDataEntryForm.css';
import { ITaskResponse } from './types';
import FileUploader from '../FileUpLoader/FileUploader';

interface TaskDataEntryFormProps {
  params: Params;
  currentTask: ITask;
  user: IUser;
}

export default function TaskDataEntryForm({
  params,
  currentTask,
  user,
}: TaskDataEntryFormProps) {
  const context = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const urlParams = useParams();
  const slug = urlParams?.subdomain as string;
  const [task, setTask] = useState<ITask>(currentTask);

  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);

  const [isGeneratingTemplate, setIsGeneratingTemplate] = useState(false);

  const [uploadSuccess, setUploadSuccess] = useState(false);

  // This will be called by the child when API succeeds
  const handleUploadSuccess = (status: boolean) => {
    setUploadSuccess(status);
  };

  const { showModal, hideModal } = useModalControls();

  const { taskPermissions, userRoles } = useTaskPermissions({ task, user });
  const {
    modules,
    questions,
    getCurrentIndicator,
    calculateAnsweredPercentage,
    getCorrectionCount,
  } = useTaskCalculations({
    taskQuestions: task?.task_questions || [],
  });
  const {
    responses, isLoading, getTask, updateStatus, handleChange,
  } = useTaskForm({
    task,
    slug,
    onTaskUpdate: setTask,
    questions,
    isDataProvider: taskPermissions.canEnterData,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChangeAndClearErrors = (
    value: string | string[],
    standardAndGroupAnswer: any,
    taskQuestion?: any,
  ) => {
    // use modal controls directly when opening to pass fresh props
    // `showModal` / `hideModal` obtained below via useModalControls
    handleChange(value, standardAndGroupAnswer, taskQuestion);
    if (taskQuestion) {
      const aid = taskQuestion?.question_sequence?.datacube_question?.id || '';
      if (aid) {
        setFieldErrors((prev) => {
          const { [aid]: _removed, ...rest } = prev || {};
          return rest;
        });
      }
    }
    // Fallback: do not clear other fields
  };

  useEffect(() => {
    if (uploadSuccess) {
      getTask(); // fetch latest task + answers
      setUploadSuccess(false); // reset the flag
    }
  }, [uploadSuccess, getTask]);

  useEffect(() => {}, [task, uploadSuccess]);

  useEffect(() => {
    if (modules.length > 0 && !params?.indicator) {
      router.push(`?indicator=${modules?.[0]?.indicators[0]?.name}`);
    }
  }, [task, params?.indicator, router, modules, uploadSuccess]);

  // eslint-disable-next-line no-shadow
  const sortQuestionsWithDependencies = (
    questions: ITaskQuestions[],
    responses: ITaskResponse[],
  ) => {
    // Ensure stable ordering for multiple instances of the same GROUP type
    const questionComparator = (a: ITaskQuestions, b: ITaskQuestions) => {
      const seqA = a?.question_sequence?.sequence || 0;
      const seqB = b?.question_sequence?.sequence || 0;
      if (seqA !== seqB) return seqA - seqB;

      const isGroupA = a?.question_sequence?.questable_type === 'GROUP';
      const isGroupB = b?.question_sequence?.questable_type === 'GROUP';

      if (isGroupA && isGroupB) {
        const nameA = a?.question_sequence?.group_question_rule?.name || '';
        const nameB = b?.question_sequence?.group_question_rule?.name || '';
        if (nameA === nameB) {
          const timeA = new Date(a?.createdAt || 0).getTime();
          const timeB = new Date(b?.createdAt || 0).getTime();
          return timeA - timeB; // older first, so new groups append at bottom
        }
      }

      return 0;
    };

    const sorted: ITaskQuestions[] = [];
    const processed = new Set<string>();

    const isDependencySatisfied = (question: ITaskQuestions): boolean => {
      const rules = question?.question_sequence?.question_rules_id || [];

      // If not dependent, always show
      if (!question?.question_sequence?.is_dependent || rules.length === 0) {
        return true;
      }

      // ALL dependency rules must be satisfied
      const allSatisfied = rules.some((rule) => {
        // Find the response for the dependent question
        const currentResponse = responses?.find(
          (res) => res?.datacube_question === rule.dependent_question_id?.id,
        );

        if (!currentResponse || !currentResponse.answer) {
          return false;
        }

        // Check if the response matches the required option
        let matchesOption = false;
        if (rule.dependent_option_id) {
          if (Array.isArray(currentResponse.answer)) {
            matchesOption = currentResponse.answer.includes(
              rule.dependent_option_id.id,
            );
          } else {
            matchesOption = currentResponse.answer === rule.dependent_option_id.id;
          }
        } else {
          // If no specific option is required, just check if there's any answer
          matchesOption = !!currentResponse.answer;
        }

        return matchesOption;
      });
      return allSatisfied;
    };

    // DFS approach: process independent questions in sequence order,
    // then recursively append their satisfied dependents.
    const findDependents = (parent: ITaskQuestions): ITaskQuestions[] => {
      const deps = questions.filter((q) => {
        if (!q?.question_sequence?.is_dependent) return false;
        const rules = q?.question_sequence?.question_rules_id || [];
        return rules.some(
          (r) => r?.dependent_question_id?.id
              === parent?.question_sequence?.datacube_question?.id
            || r?.dependent_question_id?.public_question_id
              === parent?.question_sequence?.datacube_question?.public_question_id,
        );
      });

      return deps.filter(isDependencySatisfied).sort(questionComparator);
    };

    const process = (q: ITaskQuestions) => {
      if (processed.has(q.id)) return;
      if (!isDependencySatisfied(q)) return;
      sorted.push(q);
      processed.add(q.id);
      findDependents(q).forEach(process);
    };

    const independents = questions
      .filter((q) => !q?.question_sequence?.is_dependent)
      .sort(questionComparator);

    independents.forEach(process);

    // Safety: if anything visible remains unprocessed (e.g., missing parent in set),
    // process it now; its own dependency check will prevent incorrect placement.
    questions
      .filter((q) => !processed.has(q.id) && isDependencySatisfied(q))
      .sort(questionComparator)
      .forEach(process);

    return sorted;
  };

  // const onSubmit = async () => {
  //   if (isLoading) return;
  //   if (
  //     taskPermissions.canReview
  //     || (userRoles?.isAdmin && task?.status === 'REVIEWING')
  //   ) {
  //     const isAllApproved = cleanedQuestions(questions).every(
  //       (item) => item?.is_approved !== null && item?.is_approved === true,
  //     );
  //     await updateStatus(isAllApproved ? 'COMPLETED' : 'REJECTED');
  //   } else if (
  //     taskPermissions.canEnterData
  //     || (userRoles?.isAdmin && task?.status === 'IN_PROGRESS')
  //   ) {
  //     await updateStatus('SUBMITTED');
  //   }
  //   if (pathname.includes('/tasks')) {
  //     router.push(
  //       pathname?.includes('/data_cubes')
  //         ? `/data_cubes/${urlParams?.id}/tasks`
  //         : '/tasks',
  //     );
  //     router.refresh();
  //   }
  //   hideModal();
  // };

  // const submittingRef = useRef(false);
  // const onSubmit = async () => {
  //   // prevent re-entry when form-level loading or our submit already in progress
  //   if (isLoading || submittingRef.current) return;
  //   submittingRef.current = true;

  //   try {
  //     if (
  //       taskPermissions.canReview ||
  //       (userRoles?.isAdmin && task?.status === 'REVIEWING')
  //     ) {
  //       // ensure we operate on latest questions state
  //       const isAllApproved = cleanedQuestions(questions).every(
  //         (item) => item?.is_approved !== null && item?.is_approved === true
  //       );
  //       await updateStatus(isAllApproved ? 'COMPLETED' : 'REJECTED');
  //     } else if (
  //       taskPermissions.canEnterData ||
  //       (userRoles?.isAdmin && task?.status === 'IN_PROGRESS')
  //     ) {
  //       await updateStatus('SUBMITTED');
  //     }

  //     // refresh server state to avoid race-condition where submission appears pending
  //     try {
  //       await getTask();
  //     } catch (refreshErr) {
  //       // non-fatal — still proceed to navigation
  //       // eslint-disable-next-line no-console
  //       console.warn('Failed to refresh task after submit', refreshErr);
  //     }

  //     if (pathname.includes('/tasks')) {
  //       await router.push(
  //         pathname?.includes('/data_cubes')
  //           ? `/data_cubes/${urlParams?.id}/tasks`
  //           : '/tasks'
  //       );
  //       // refresh parent after navigation
  //       try {
  //         router.refresh();
  //       } catch (err) {
  //         // ignore
  //       }
  //     }

  //     hideModal();
  //   } catch (err) {
  //     // surface error and allow retry
  //     // eslint-disable-next-line no-console
  //     console.error('Submit failed', err);
  //   } finally {
  //     submittingRef.current = false;
  //   }
  // };

  const submittingRef = useRef(false);

  const onSubmit = async () => {
    // prevent re-entry when form-level loading or our submit already in progress
    if (isLoading || submittingRef.current) return;
    submittingRef.current = true;

    try {
      // ✅ flush pending state updates (important if user just clicked submit after last change)
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 0));

      // make a snapshot of the latest state
      const latestQuestions = cleanedQuestions(questions);

      if (
        taskPermissions.canReview
        || (userRoles?.isAdmin && task?.status === 'REVIEWING')
      ) {
        const isAllApproved = latestQuestions.every(
          (item) => item?.is_approved !== null && item?.is_approved === true,
        );

        await updateStatus(isAllApproved ? 'COMPLETED' : 'REJECTED');
      } else if (
        taskPermissions.canEnterData
        || (userRoles?.isAdmin && task?.status === 'IN_PROGRESS')
      ) {
        await updateStatus('SUBMITTED');
      }

      // refresh server state to avoid race-condition where submission appears pending
      try {
        await getTask();
      } catch (refreshErr) {
        console.error('Failed to refresh task after submit', refreshErr);
      }

      if (pathname.includes('/tasks')) {
        await router.push(
          pathname?.includes('/data_cubes')
            ? `/data_cubes/${urlParams?.id}/tasks`
            : '/tasks',
        );

        // refresh parent after navigation
        try {
          router.refresh();
        } catch {
          /* ignore */
        }
      }

      hideModal();
    } catch (err) {
      console.error('Submit failed', err);
    } finally {
      submittingRef.current = false;
    }
  };

  const modal = useModal({
    style: {
      size: 'xl',
      title: 'Preview',
      onClose: () => hideModal(),
    },
    content: (
      <PreviewModal
        taskId={task?.id || ''}
        modules={modules}
        hideModal={hideModal}
        onSubmit={onSubmit}
        responses={responses}
        errors={fieldErrors}
        slug={slug}
        updateStatus={updateStatus}
        // canReview={taskPermissions.canReview}
      />
    ),
  });

  const breadCrumbsItem = useMemo(() => {
    const isTaskPath = pathname?.startsWith('/tasks');
    if (isTaskPath) {
      return [
        { title: 'Task', url: '/tasks' },
        {
          title: String(task?.task_questions?.[0]?.module_name || ''),
          url: '/tasks',
        },
        {
          title: String(params?.indicator || 'View'),
          url: `/tasks/${task?.id}${
            !params?.indicator
              ? `?indicator=${modules[0]?.indicators[0]?.name || ''}`
              : `?indicator=${params?.indicator}`
          }`,
        },
      ];
    }

    return [
      { title: 'Data Cubes', url: '/data_cubes' },
      {
        title: String(task?.datacube_frequency?.datacube?.name || ''),
        // url: `/data_cubes/${urlParams?.id}`,
        url: '/data_cubes',
      },
      {
        title: String(task?.task_questions?.[0]?.module_name || ''),
        url: `/data_cubes/${urlParams?.id}/tasks`,
      },
      {
        title: String(params?.indicator || 'View'),
        url: `/data_cubes/${urlParams?.id}/tasks/${task?.id}/view${
          !params?.indicator
            ? `?indicator=${modules[0]?.indicators[0]?.name || ''}`
            : `?indicator=${params?.indicator}`
        }`,
      },
    ];
  }, [
    modules,
    params?.indicator,
    pathname,
    task?.datacube_frequency?.datacube?.name,
    task?.id,
    task?.task_questions,
    urlParams?.id,
  ]);

  const renderModuleList = () => (
    <div className="col-12 col-lg-3">
      {modules?.map((module) => (
        <div className="task_module_container py-4" key={module?.name}>
          <div className="px-4 pb-3">
            <div className="d-flex align-items-center gap-2">
              <h5 className="fw-semibold letter-spacing mb-0">
                {module?.name}
              </h5>
              <Pill pillText={task?.status} />
            </div>
            <div className="d-flex justify-content-between">
              <div className="location-name fs-14 fw-500">Indicators</div>
            </div>
          </div>
          <div
            className="px-3"
            style={{
              maxHeight: '60vh',
              overflowY: 'scroll',
              cursor: 'pointer',
            }}
          >
            {module?.indicators?.map((indicator) => (
              <div
                key={indicator?.name}
                className={`d-flex justify-content-between gap-2 mt-4 is_radius ${
                  indicator?.name === params?.indicator ? 'active' : ''
                }`}
              >
                <div
                  className="p-2 py-3 d-flex flex-column gap-2 flex-grow-1"
                  aria-hidden
                  onClick={() => {
                    getTask();
                    router.push(`?indicator=${indicator?.name}`);
                  }}
                >
                  <h6 className="fs-14 fw-600 mb-0 letter-spacing text-capitalize">
                    {indicator?.name}
                  </h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="location-name fs-12 fw-500">
                      {(() => {
                        const visibleQuestions = sortQuestionsWithDependencies(
                          (indicator.questions || []).filter(isNotNull),
                          responses,
                        );
                        return calculateAnsweredPercentage(
                          visibleQuestions,
                          taskPermissions.canReview,
                          responses,
                        );
                      })()}
                      % Completed
                    </div>
                    {task?.status !== 'COMPLETED'
                      && (() => {
                        const visibleQuestions = sortQuestionsWithDependencies(
                          (indicator.questions || []).filter(isNotNull),
                          responses,
                        );
                        return getCorrectionCount(visibleQuestions) > 0;
                      })() && (
                        <div className="location-name fs-12 fw-500 text-danger">
                          {(() => {
                            const visibleQuestions = sortQuestionsWithDependencies(
                              (indicator.questions || []).filter(isNotNull),
                              responses,
                            );
                            return `${getCorrectionCount(visibleQuestions)} Correction`;
                          })()}
                        </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderQuestionList = () => {
    // First, sort all questions by sequence
    const sortedQuestions = getCurrentIndicator?.questions
      ? sortQuestionsWithDependencies(
        getCurrentIndicator.questions.filter(isNotNull),
        responses,
      )
      : [];

    // Group consecutive questions by subindicator while maintaining order
    // BUT only for non-GROUP questions
    const groupedQuestions: Array<{
      subindicatorName: string;
      questions: ITaskQuestions[];
    }> = [];
    let currentSubindicator = '';
    let currentGroup: ITaskQuestions[] = [];

    sortedQuestions.forEach((question, index) => {
      // Check if it's a group question
      const isGroupQuestion = question?.question_sequence?.questable_type === 'GROUP';

      let subindicatorName = '';

      if (!isGroupQuestion) {
        // Only get subindicator name for non-group questions
        subindicatorName = question?.question_sequence?.datacube_question?.sub_indicator_name
          || '';
      }

      // For group questions, treat them as having empty subindicator
      // This will put all consecutive group questions together without a heading
      if (subindicatorName !== currentSubindicator) {
        if (currentGroup.length > 0) {
          groupedQuestions.push({
            subindicatorName: currentSubindicator,
            questions: currentGroup,
          });
        }
        currentSubindicator = subindicatorName;
        currentGroup = [question];
      } else {
        currentGroup.push(question);
      }

      // Handle last group
      if (index === sortedQuestions.length - 1 && currentGroup.length > 0) {
        groupedQuestions.push({
          subindicatorName: currentSubindicator,
          questions: currentGroup,
        });
      }
    });

    return (
      <div className="col-12 col-lg-9">
        <div className="task_module_container p-3 p-md-4">
          <div className="d-flex justify-content-between align-items-center gap-3 pb-5">
            <div>
              <div className="location-name fs-14 fw-500">
                {`${task?.site?.name} - ${task?.site?.location}`}
              </div>
            </div>
          </div>
          {groupedQuestions.map((group, groupIndex) => {
            // Check if this group contains any non-GROUP questions
            const hasNonGroupQuestions = group.questions.some(
              (q) => q?.question_sequence?.questable_type !== 'GROUP',
            );

            // Only show subindicator heading if:
            // 1. The subindicator name exists (not empty)
            // 2. The group has at least one non-GROUP question
            // 3. The questions should be shown based on dependencies
            const shouldShowHeading = group.subindicatorName
              && hasNonGroupQuestions
              && shouldShowSubindicator(group.questions, responses);

            return shouldShowSubindicator(group.questions, responses) ? (
              <div key={`${group.subindicatorName}-${groupIndex}`}>
                {shouldShowHeading && (
                  <h6 className="fs-18 fw-600 mt-3 mb-3 text-decoration-underline">
                    {group.subindicatorName}
                  </h6>
                )}
                <ParentQuestionRenders
                  questions={group.questions}
                  isDisabled={task?.status === 'COMPLETED'}
                  responses={responses}
                  getTask={getTask}
                  task={task}
                  slug={slug}
                  canEnterData={taskPermissions.canEnterData}
                  canReview={taskPermissions.canReview}
                  handleChange={handleChangeAndClearErrors}
                  updateStatus={updateStatus}
                  userId={context?.currentUser?.id || ''}
                  errors={fieldErrors}
                />
              </div>
            ) : null;
          })}
        </div>
      </div>
    );
  };

  const handleDownloadOrGenerateTemplate = async () => {
    const templateUrl = task?.template_task_file_url;

    // If template exists, download it
    if (templateUrl) {
      try {
        setIsDownloading(true);
        const link = document.createElement('a');
        link.href = templateUrl;
        link.download = templateUrl;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Template downloaded successfully');
      } catch (error) {
        console.error('Failed to download template:', error);
        toast.error('Failed to download template');
        // Fallback: Open in new tab
        try {
          window.open(templateUrl, '_blank');
        } catch (fallbackError) {
          console.error('Fallback download also failed:', fallbackError);
        }
      } finally {
        setIsDownloading(false);
      }
    } else {
      // If template doesn't exist, generate it
      try {
        setIsGeneratingTemplate(true);
        toast.loading('Generating template...', { id: 'generate-template' });

        const payload = {
          datacubeIds: task?.datacube_frequency?.datacube?.id,
        };

        const moduleId = task?.task_questions?.[0]?.question_sequence?.public_module_id;
        const siteId = task?.site?.id;

        if (!moduleId || !siteId) {
          throw new Error('Module ID or Site ID is missing');
        }

        await TaskService.generateTemplate(payload, moduleId, siteId, slug);

        toast.dismiss('generate-template');
        toast.success('Template generated successfully!');

        // Refresh task data to get the new template URL
        await getTask();
      } catch (error) {
        console.error('Failed to generate template:', error);
        toast.dismiss('generate-template');
        toast.error('Failed to generate template');
      } finally {
        setIsGeneratingTemplate(false);
      }
    }
  };

  const instruction = [
    {
      content: (
        <span className="mb-2">
          <span className="fw-600 textPrimary">
            Download the Excel Template
          </span>
          {' '}
          provided and fill in the required details.
        </span>
      ),
    },
    {
      content: (
        <span className="mb-2">
          <span className="fw-600 textPrimary">
            Do not leave any questions unanswered
          </span>
          {' '}
          — incomplete responses may prevent successful upload.
        </span>
      ),
    },
    {
      content: (
        <span className="mb-2">
          <span className="fw-600 textPrimary">Do not rename the sheets.</span>
          {' '}
          Sheet names are linked to reporting frequencies; changing them will
          cause the data to be stored incorrectly.
        </span>
      ),
    },
    {
      content: (
        <span className="mb-2">
          <span className="fw-600 textPrimary">For dropdown questions,</span>
          {' '}
          select responses
          {' '}
          <span className="fw-600 textPrimary">
            only from the available options
          </span>
          {' '}
          in the template.
        </span>
      ),
    },
    {
      content: (
        <span className="mb-2">
          <span className="fw-600 textPrimary">
            For number-based questions,
          </span>
          {' '}
          enter
          {' '}
          <span className="fw-600 textPrimary">numeric values only.</span>
          {' '}
          Text entries will cause the sheet to be
          {' '}
          <span className="fw-600 textPrimary">rejected.</span>
          {' '}
        </span>
      ),
    },
    {
      content: (
        <span className="mb-2">
          <span className="fw-600 textPrimary">If uploading in bulk,</span>
          {' '}
          please
          {' '}
          <span className="fw-600 textPrimary">
            open each task after upload, verify all answers, and then submit
          </span>
          {' '}
          to ensure data accuracy.
        </span>
      ),
    },
  ];

  return (
    <PageHeaderWrapper
      breadCrumbMenu={[{ title: '', breadCrumb: breadCrumbsItem }]}
      extraClassName="my-4 px-4 pt-3"
      iswhite
      title={(
        <span>
          {modules?.map((item) => item?.name)?.join(', ') || ''}
          {' '}
          <span className="location-name fs-14 fw-500">
            (
            {task?.datacube_frequency?.frequency_name || ''}
            )
          </span>
        </span>
      )}
      stackComponent={(
        <div className="d-flex align-items-center">
          {taskPermissions.canEnterData && (
            <div
              className="rounded-pill border px-3 py-2 position-relative"
              style={{
                backgroundColor: '#F5F5F5',
              }}
            >
              <p className="m-0 d-flex align-items-center gap-1">
                <RiFileExcel2Line size={26} color="#1D6F42" />
                <span className="ms-1 me-1 text-light-gray">|</span>
                {/* Toggle Icon */}
                {isUploadOpen ? (
                  <IoChevronUp
                    size={18}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setIsUploadOpen(false);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <IoChevronDown
                    size={18}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUploadOpen(true);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                )}
              </p>

              {/* Upload Dropdown */}
              {isUploadOpen && (
                <div className="excel-upload-container">
                  <div className="bg-white border rounded-3 shadow-sm px-4 py-3">
                    <p className="fs-14 text-light-gray fw-600 text-center mt-3">
                      Download the Spreadsheet Template!
                    </p>
                    <Button
                      text={
                        task?.template_task_file_url
                          ? 'Download Template'
                          : 'Generate Template'
                      }
                      prefixIconChildren={
                        task?.template_task_file_url ? (
                          <MdOutlineFileDownload className="me-1" size={20} />
                        ) : (
                          <IoRepeat className="me-1" size={20} />
                        )
                      }
                      isSolid
                      btnclassName="w-100 mb-4"
                      isLoading={isGeneratingTemplate || isDownloading}
                      isDisabled={isGeneratingTemplate || isDownloading}
                      onClick={handleDownloadOrGenerateTemplate}
                    />
                    <FileUploader
                      btnName="Task"
                      dataCube={currentTask || ''}
                      taskId={task?.id || ''}
                      flag="single"
                      onUploadSuccess={handleUploadSuccess}
                      initialUploadedFileUrl={task?.uploaded_task_file_url}
                    />
                    {/* <p className="fs-13 fw-600 text-light-gray mt-4">
                      <span className="fw-600 fs-14 textPrimary">Note:</span>
                       Please download the provided template, enter the required
                      data, and then upload the completed file here.
                    </p> */}
                    <p className="fs-13 fw-600 text-light-gray mt-4">
                      <span
                        className="fw-600 fs-14 mb-1"
                        style={{ color: 'red' }}
                      >
                        Instructions:
                      </span>
                      {/* <ol type="1"> */}
                      {instruction?.map((instruction: any, idx: any) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <p className="mb-1" key={idx}>
                          {idx + 1}
                          .
                          {instruction?.content}
                        </p>
                      ))}
                      {/* </ol> */}
                    </p>
                    <div className="d-flex align-items-center justify-content-end gap-2 mt-4">
                      {/* <div style={{ flex: 0.75 }}>
                      <Button
                        text="Preview"
                        isPill
                        type="button"
                        className="w-100"
                      />
                    </div> */}
                      <div style={{ flex: 0.5 }}>
                        <Button
                          text="Done"
                          isPill
                          type="button"
                          className="w-100"
                          onClick={() => setIsUploadOpen(false)}
                        />
                      </div>
                      <div style={{ flex: 0.5 }}>
                        <Button
                          text="Cancel"
                          isBorderButton
                          type="button"
                          className="w-100"
                          onClick={() => setIsUploadOpen(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* <FiFileText size={20} color="#1D6F42" /> */}
            </div>
          )}

          <div className="d-flex justify-content-between ms-2">
            <div className="d-flex justify-content-center">
              <Button
                onClick={async () => {
                  await getTask();
                  // Validate visible questions and mark required errors
                  const getAllVisibleQuestions = () => {
                    const allVisibleQuestions: any[] = [];
                    modules.forEach((module) => {
                      module.indicators.forEach((indicator) => {
                        if (
                          indicator?.questions
                          && indicator.questions.length > 0
                        ) {
                          const questionGroups = indicator.questions.reduce(
                            (acc: Record<string, any[]>, question) => {
                              let key = '';
                              if (
                                question?.question_sequence?.questable_type
                                === 'GROUP'
                              ) {
                                const rules = question?.question_sequence
                                  ?.question_rules_id || [];
                                key = rules?.[0]?.dependent_question_id
                                  ?.sub_indicator_name
                                  || question?.question_sequence
                                    ?.group_question_rule
                                    ?.datacube_group_questions?.[0]
                                    ?.datacube_question?.sub_indicator_name
                                  || '';
                              } else {
                                key = question?.question_sequence?.datacube_question
                                  ?.sub_indicator_name || '';
                              }
                              (acc[key] = acc[key] || []).push(question);
                              return acc;
                            },
                            {},
                          );

                          Object.values(questionGroups).forEach((questions) => {
                            const sortedQuestions = sortQuestionsWithDependencies(
                              questions,
                              responses,
                            );

                            const visibleQuestions = sortedQuestions.filter(
                              (q) => shouldShowSubindicator([q], responses),
                            );
                            allVisibleQuestions.push(...visibleQuestions);
                          });
                        }
                      });
                    });
                    return allVisibleQuestions;
                  };

                  const visible = getAllVisibleQuestions();
                  const errors: Record<string, string> = {};
                  visible.forEach((q) => {
                    const aid = q?.question_sequence?.datacube_question?.id;
                    const ans = responses?.find(
                      (r) => r?.datacube_question === aid,
                    )?.answer;
                    if (
                      !ans
                      || (Array.isArray(ans) && ans.length === 0)
                      || String(ans).trim() === ''
                    ) {
                      if (aid) errors[aid] = 'Please provide an answer.';
                    }
                  });
                  setFieldErrors(errors);

                  showModal(
                    <PreviewModal
                      taskId={task?.id || ''}
                      modules={modules}
                      hideModal={hideModal}
                      onSubmit={onSubmit}
                      responses={responses}
                      slug={slug}
                      updateStatus={updateStatus}
                      errors={errors}
                    />,
                    {
                      size: 'xl',
                      title: 'Preview',
                      onHide: hideModal,
                    },
                  );
                }}
                text="Preview"
                type="submit"
                isPill
                className="w-100"
              />
            </div>
          </div>
        </div>
      )}
    >
      <div className="row g-4">
        {renderModuleList()}
        {renderQuestionList()}
      </div>
    </PageHeaderWrapper>
  );
}
