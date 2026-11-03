/* eslint-disable max-len */
/* eslint no-shadow: off */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */

import { ITask, ITaskQuestions } from '@/lib/interface/ITask.interface';
import { TaskService } from '@/lib/service';
import {
  cleanedQuestions,
  shouldShowSubindicator,
  isNotNull,
} from '@/lib/utils';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import { Spinner } from 'react-bootstrap';
import { Button } from '../Button/Button';
import { TextField } from '../ResponseInputFields/TextField';
import { ITaskStatus } from '../types';
import ParentQuestionRenders from './ParentQuestionRenders';
import { ITaskResponse } from './types';
import './TaskDataEntryForm.css';

interface ITaskModules {
  name: string;
  indicators: {
    name: string;
    questions: ITaskQuestions[];
  }[];
}

export default function PreviewModal({
  taskId,
  modules,
  hideModal,
  onSubmit,
  responses,
  slug,
  updateStatus,
  errors,
}: {
  taskId: string;
  modules: ITaskModules[];
  hideModal: () => void;
  onSubmit?: () => void;
  responses: ITaskResponse[] | any;
  slug: string;
  updateStatus: (data: ITaskStatus) => void;
  errors?: Record<string, string>;
}) {
  const [task, setTask] = useState<ITask | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // UPDATED: This now matches TaskDataEntryForm's sorting logic exactly
  const sortQuestionsWithDependencies = useCallback(
    (questions: ITaskQuestions[], responses: ITaskResponse[]) => {
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

        // ALL dependency rules must be satisfied (changed from every to some to match TaskDataEntryForm)
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
    },
    [],
  );

  const getTask = useCallback(async () => {
    if (!taskId) return;
    try {
      const res = await TaskService.getById(taskId, slug);
      const { task: _task, success } = res?.data as {
        task: ITask;
        success: boolean;
      };
      if (success) {
        setTask(_task);
      }
    } catch (error) {
      toast.error('Failed to fetch task data');
    }
  }, [slug, taskId]);

  useEffect(() => {
    getTask();
  }, [getTask, taskId]);

  // Get all visible questions including group questions that should be shown based on dependencies
  const getAllVisibleQuestions = useCallback(() => {
    if (!task || !modules) return [];

    const allVisibleQuestions: ITaskQuestions[] = [];

    modules.forEach((module) => {
      module.indicators.forEach((indicator) => {
        if (indicator?.questions && indicator.questions.length > 0) {
          // Group questions by sub-indicator
          const questionGroups = indicator.questions.reduce(
            (acc: Record<string, ITaskQuestions[]>, question) => {
              let key = '';

              if (question?.question_sequence?.questable_type === 'GROUP') {
                const rules = question?.question_sequence?.question_rules_id || [];
                key = rules?.[0]?.dependent_question_id?.sub_indicator_name
                  || question?.question_sequence?.group_question_rule
                    ?.datacube_group_questions?.[0]?.datacube_question
                    ?.sub_indicator_name
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

          // Process each sub-indicator group
          Object.values(questionGroups).forEach((questions) => {
            const sortedQuestions = sortQuestionsWithDependencies(
              questions,
              responses,
            );

            // Only include questions that should be shown based on dependencies
            const visibleQuestions = sortedQuestions.filter((q) => shouldShowSubindicator([q], responses));

            allVisibleQuestions.push(...visibleQuestions);
          });
        }
      });
    });

    return allVisibleQuestions;
  }, [task, modules, responses, sortQuestionsWithDependencies]);

  const isBtnDisabled = useMemo(() => {
    if (!task) return true;
    if (task.status === 'COMPLETED') return false;

    const { status } = task;
    const approvedStatuses = ['SUBMITTED', 'REVIEWING'];
    const answeredStatuses = [
      'IN_PROGRESS',
      'CREATED',
      'REASSIGNED',
      'REJECTED',
    ];

    // Get all visible questions including dynamically shown group questions
    const allVisibleQuestions = getAllVisibleQuestions();

    if (!status) {
      return allVisibleQuestions.every((item) => item?.is_answered === true);
    }

    if (approvedStatuses.includes(status)) {
      return allVisibleQuestions.every((item) => item?.is_approved !== null);
    }

    if (answeredStatuses.includes(status)) {
      return allVisibleQuestions.every((item) => item?.is_answered === true);
    }

    return false;
  }, [task, getAllVisibleQuestions]);

  const TaskSkeleton = () => (
    <div className="p-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4" />
      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-4/6" />
    </div>
  );

  if (!task) {
    return <TaskSkeleton />;
  }

  const monthList = [
    'Jan',
    'Feb',
    'Mar',
    'Jan',
    'Feb',
    'Mar',
    'Jan',
    'Feb',
    'Mar',
    'Jan',
    'Feb',
    'Mar',
  ];

  return (
    <div className="p-4">
      <div className="row d-flex align-items-center mt-3">
        <div className="col-lg-5">
          <p className="fs-16 fw-600">Financial Year</p>
        </div>
        <div className="col-lg-7">
          <TextField
            type="text"
            placeholder=""
            isValid={false}
            isCustomRequired
            value={`${task?.datacube_frequency?.datacube?.financial_year}`}
            disabled
          />
        </div>
      </div>
      <div className="row d-flex align-items-center mt-3">
        <div className="col-lg-5">
          <p className="fs-16 fw-600">Timeframe</p>
        </div>
        <div className="col-lg-7">
          <TextField
            type="text"
            placeholder=""
            isValid={false}
            isCustomRequired
            value={`${task?.datacube_frequency?.datacube?.frequency}`}
            disabled
          />
        </div>
      </div>
      <div className="row d-flex align-items-center mt-3">
        <div className="col-lg-5">
          <p className="fs-16 fw-600">Site / Location</p>
        </div>
        <div className="col-lg-7">
          <TextField
            type="text"
            placeholder=""
            isValid={false}
            isCustomRequired
            value={`${task?.site?.name} / ${task?.site?.location}`}
            disabled
          />
        </div>
      </div>
      <hr />
      {modules?.map((module) => (
        <div key={module.name}>
          <h4 className="fs-20 fw-700 mb-0" title="Module">
            {module.name}
          </h4>
          <p className="fs-12" title="Sitename - Location">
            {task?.site?.name}
            {' '}
            -
            {task?.site?.location}
          </p>
          {module?.indicators?.map((indicator) => (
            <div key={indicator.name}>
              <div className="card">
                <div className="card-body">
                  <h5 className="fs-18 fw-600" title="Indicator">
                    {indicator.name}
                  </h5>
                  {indicator?.questions
                    && indicator.questions.length > 0
                    && Object.entries(
                      indicator.questions.reduce(
                        (acc: Record<string, ITaskQuestions[]>, questions) => {
                          let key = '';
                          if (
                            questions?.question_sequence?.questable_type
                            === 'GROUP'
                          ) {
                            const rules = questions?.question_sequence?.question_rules_id
                              || [];
                            key = rules?.[0]?.dependent_question_id
                              ?.sub_indicator_name
                              || questions?.question_sequence?.group_question_rule
                                ?.datacube_group_questions?.[0]
                                ?.datacube_question?.sub_indicator_name
                              || '';
                          } else {
                            key = questions?.question_sequence?.datacube_question
                              ?.sub_indicator_name || '';
                          }
                          (acc[key] = acc[key] || []).push(questions);
                          return acc;
                        },
                        {},
                      ),
                    )
                      // Sort sub-indicators by the minimum sequence of their questions
                      .sort(([, questionsA], [, questionsB]) => {
                        const minSequenceA = Math.min(
                          ...questionsA.map(
                            (q) => q?.question_sequence?.sequence || 0,
                          ),
                        );
                        const minSequenceB = Math.min(
                          ...questionsB.map(
                            (q) => q?.question_sequence?.sequence || 0,
                          ),
                        );
                        return minSequenceA - minSequenceB;
                      })
                      .map(([subindicatorName, questions]) => {
                        // Apply the same sorting logic as in TaskDataEntryForm
                        const sortedQuestions = sortQuestionsWithDependencies(
                          questions,
                          responses,
                        );

                        return shouldShowSubindicator(
                          sortedQuestions,
                          responses,
                        ) ? (
                          <div key={subindicatorName}>
                            {subindicatorName && (
                              <h6
                                className="fs-16 fw-600 mt-3 mb-3"
                                title="Sub-Indicator"
                              >
                                {subindicatorName}
                              </h6>
                            )}
                            <ParentQuestionRenders
                              questions={sortedQuestions}
                              isDisabled
                              responses={responses}
                              getTask={getTask}
                              task={task}
                              slug={slug}
                              canEnterData={false}
                              canReview={false}
                              updateStatus={updateStatus}
                              errors={errors}
                            />
                          </div>
                          ) : null;
                      })}
                </div>
              </div>
              <hr className="" />
            </div>
          ))}
        </div>
      ))}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button onClick={hideModal} text="Cancel" />
        <Button
          text={isLoading ? 'Submiting...' : 'Submit'}
          isDisabled={!isBtnDisabled}
          onClick={() => {
            if (!onSubmit) return;
            setIsLoading(true);
            onSubmit();
          }}
          sufixIconChildren={isLoading ? <Spinner size="sm" /> : null}
          isSolid
        />
      </div>
    </div>
  );
}
