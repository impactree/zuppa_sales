/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable no-shadow */

import {
  ITask,
  ITaskDataCubeGroupQuestions,
  ITaskQuestions,
} from '@/lib/interface/ITask.interface';
import { TaskService } from '@/lib/service';
import { convertToPascalCase } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { ITaskStatus } from '../types';
import LoadIconsAndComments from './LoadIconsAndComments';
import RenderGroupQuestion from './RenderGroupQuestion';
import RenderStandardQuestion from './RenderStandardQuestion';
import { IStandardAndGroupAnswer, ITaskResponse } from './types';

export default function ParentQuestionRenders({
  questions,
  isDisabled,
  responses,
  getTask,
  task,
  slug,
  canEnterData,
  canReview,
  handleChange,
  updateStatus,
  userId,
  errors,
}: {
  questions: ITaskQuestions[] | undefined;
  isDisabled: boolean;
  responses: ITaskResponse[];
  getTask: () => void;
  task: ITask;
  slug: string;
  handleChange?: (
    value: string | string[],
    standardAndGroupAnswer: IStandardAndGroupAnswer,
    taskQuestion?: ITaskQuestions
  ) => void;
  canEnterData: boolean;
  canReview: boolean;
  updateStatus?: (status: ITaskStatus) => void;
  userId?: string;
  errors?: Record<string, string>;
}) {
  const [loadingOperations, setLoadingOperations] = useState<Set<string>>(
    new Set(),
  );
  const [isAnyDeleteInProgress, setIsAnyDeleteInProgress] = useState(false);

  const addNewGroup = async (id: string) => {
    if (loadingOperations.has(`add-${id}`)) {
      return;
    }

    setLoadingOperations((prev) => new Set(prev).add(`add-${id}`));

    try {
      const res = await TaskService.addGroup(slug, task?.id, {
        question_sequence: id,
      });
      const { error } = res?.data as {
        error: string[];
      };
      if (error) {
        toast.error(error.join(' ,'));
      } else {
        await getTask();
      }
    } catch (err) {
      console.error('Error adding group:', err);
      toast.error('Failed to add group. Please try again.');
    } finally {
      setLoadingOperations((prev) => {
        const newSet = new Set(prev);
        newSet.delete(`add-${id}`);
        return newSet;
      });
    }
  };

  const deleteGroup = async (id: string) => {
    if (loadingOperations.has(`delete-${id}`) || isAnyDeleteInProgress) {
      return;
    }

    setLoadingOperations((prev) => new Set(prev).add(`delete-${id}`));
    setIsAnyDeleteInProgress(true);

    try {
      const res = await TaskService.deleteGroup(slug, task?.id, {
        task_question_id: id,
      });
      const { error } = res?.data as {
        error: string[];
      };
      if (error) {
        toast.error(error.join(' ,'));
      } else {
        await getTask();
      }
    } catch (err) {
      console.error('Error deleting group:', err);
      toast.error('Failed to delete group. Please try again.');
    } finally {
      setLoadingOperations((prev) => {
        const newSet = new Set(prev);
        newSet.delete(`delete-${id}`);
        return newSet;
      });
      setIsAnyDeleteInProgress(false);
    }
  };

  const sortGroupQuestionsWithDependencies = (
    groupQuestions: ITaskDataCubeGroupQuestions[],
    currentTaskQuestion: ITaskQuestions,
    responses: ITaskResponse[],
  ): ITaskDataCubeGroupQuestions[] => {
    const isGroupDependencySatisfied = (
      groupQuestion: ITaskDataCubeGroupQuestions,
    ): boolean => {
      const Grouprules = groupQuestion?.group_question_rule?.group_rule || [];
      const isGroupDependent = groupQuestion?.is_dependent;

      // Non-dependent questions are always satisfied
      if (!isGroupDependent || Grouprules.length === 0) {
        return true;
      }

      // Check if any rule is satisfied
      return Grouprules.some((rule) => {
        const parentQuestion = groupQuestions?.find(
          (q) => q?.datacube_question?.public_question_id
            === rule?.parent_question_id,
        );

        if (!parentQuestion) {
          return false;
        }

        const parentResponse = responses?.find(
          (res) => res?.datacube_question === parentQuestion?.datacube_question?.id
            && res?.task_question === currentTaskQuestion?.id,
        );

        if (!parentResponse || !parentResponse.answer) {
          return false;
        }

        const requiredOptionIds = rule?.parent_question_options?.map(
          (opt: any) => opt?.question_option_id,
        ) || [];

        const matchingOptions = parentQuestion?.datacube_question?.datacube_question_options?.filter(
          (option) => requiredOptionIds.includes(option?.public_question_option_id),
        ) || [];

        // Check if parent response matches any required option
        const selectedOption = matchingOptions.find((option) => {
          if (Array.isArray(parentResponse.answer)) {
            return parentResponse.answer.includes(option?.id);
          }
          return parentResponse.answer === option?.id;
        });

        if (selectedOption) {
          const matchingRuleOption = rule?.parent_question_options?.find(
            (ruleOpt: any) => ruleOpt?.question_option_id
              === selectedOption?.public_question_option_id,
          );

          if (matchingRuleOption?.dependent_question_ids) {
            return matchingRuleOption.dependent_question_ids.includes(
              groupQuestion?.datacube_question?.public_question_id,
            );
          }
        }

        return false;
      });
    };

    // Sort all questions by group_sequence first
    const sorted = [...groupQuestions].sort((a, b) => {
      const sequenceA = a?.group_sequence ?? 0;
      const sequenceB = b?.group_sequence ?? 0;
      return sequenceA - sequenceB;
    });

    // Filter out questions whose dependencies are not satisfied
    return sorted.filter((question) => isGroupDependencySatisfied(question));
  };

  const getDeleteButtonText = (id: string) => {
    if (loadingOperations.has(`delete-${id}`)) return 'Deleting...';
    if (isAnyDeleteInProgress) return 'Please wait...';
    return 'Delete';
  };

  return questions?.map((question) => {
    if (question?.question_sequence?.questable_type === 'GROUP') {
      const sameGroupQuestions = questions?.filter(
        (ite) => ite?.question_sequence?.group_question_rule?.name
            === question?.question_sequence?.group_question_rule?.name,
      ) || [];

      const groupDataCubeQuestion = question?.question_sequence?.group_question_rule
        ?.datacube_group_questions || [];

      const sortedGroupQuestions = sortGroupQuestionsWithDependencies(
        groupDataCubeQuestion,
        question,
        responses,
      );

      const isLastGroup = sameGroupQuestions[sameGroupQuestions.length - 1]?.id === question?.id;
      const hasMultipleGroups = sameGroupQuestions.length > 1;
      const maxLimit = question?.question_sequence?.group_question_rule?.max_limit;
      const isMaxLimitReached = maxLimit && sameGroupQuestions.length >= maxLimit;

      const groupIndex = sameGroupQuestions.findIndex(
        (g) => g.id === question.id,
      );

      return (
        <div key={question?.id} className="">
          <div className="group-card border p-3 mb-2">
            {/* {sortedGroupQuestions?.map(
              (groupQuestion: ITaskDataCubeGroupQuestions) => groupQuestion?.datacube_question?.id && (
              <div key={groupQuestion?.id}>
                {groupQuestion?.datacube_question?.sub_indicator_name && (
                  <div className="mb-3">
                    <h6 className="fs-18 fw-600 mt-3 mb-3 text-decoration-underline">
                      {groupQuestion.datacube_question.sub_indicator_name}
                    </h6>

                  </div>
                )}
                <RenderGroupQuestion
                  question={groupQuestion}
                  taskQuestion={question}
                  isDisabled={isDisabled}
                  responses={responses}
                  handleChange={handleChange}
                  canEnterData={canEnterData}
                  canReview={canReview}
                  groupIndex={groupIndex}
                />
              </div>
              ),
            )} */}

            {(() => {
              const grouped = (sortedGroupQuestions || []).reduce<
                Record<string, ITaskDataCubeGroupQuestions[]>
              >((acc, gq) => {
                const key = gq?.datacube_question?.sub_indicator_name ?? '__NO_SUB__';
                if (!acc[key]) acc[key] = [];
                acc[key].push(gq);
                return acc;
              }, {});

              return Object.entries(grouped).map(([subName, items]) => (
                <div key={subName || 'no_sub'}>
                  {subName !== '__NO_SUB__' && (
                    <div className="mb-3">
                      <h6 className="fs-18 fw-600 mt-3 mb-3 text-decoration-underline">
                        {subName}
                      </h6>
                    </div>
                  )}

                  {items.map(
                    (groupQuestion) => groupQuestion?.datacube_question?.id && (
                    <div key={groupQuestion?.id}>
                      <RenderGroupQuestion
                        question={groupQuestion}
                        taskQuestion={question}
                        isDisabled={isDisabled}
                        responses={responses}
                        handleChange={handleChange}
                        canEnterData={canEnterData}
                        canReview={canReview}
                        groupIndex={groupIndex}
                        errors={errors}
                      />
                    </div>
                    ),
                  )}
                </div>
              ));
            })()}

            {canEnterData && !isDisabled && hasMultipleGroups && (
              <div className="d-flex justify-content-end">
                <Button
                  text={getDeleteButtonText(question?.id)}
                  isLink
                  isDisabled={
                    loadingOperations.has(`delete-${question?.id}`)
                    || isAnyDeleteInProgress
                  }
                  onClick={() => deleteGroup(question?.id)}
                />
              </div>
            )}
          </div>

          {(canReview || canEnterData) && !isDisabled && (
            <div className="d-flex justify-content-end mb-3">
              <LoadIconsAndComments
                question={question}
                handleChange={handleChange}
                canEnterData={canEnterData}
                canReview={canReview}
                responses={responses}
                task={task}
                slug={slug}
                getTask={getTask}
                userId={userId}
                updateStatus={updateStatus}
              />
            </div>
          )}

          {canEnterData && !isDisabled && isLastGroup && (
            <div className="d-flex justify-content-end mt-3">
              <Button
                text={
                  loadingOperations.has(
                    `add-${question?.question_sequence?.id}`,
                  )
                    ? 'Adding...'
                    : `Add ${convertToPascalCase(
                      question?.question_sequence?.group_question_rule?.name,
                    )}`
                }
                isSolid
                className="accept-invitation-btn mb-5"
                onClick={() => addNewGroup(question?.question_sequence?.id)}
                isDisabled={
                  loadingOperations.has(
                    `add-${question?.question_sequence?.id}`,
                  ) || isMaxLimitReached
                }
              />
            </div>
          )}
          <hr className="textSecondary" />
        </div>
      );
    }

    return (
      question?.question_sequence?.datacube_question?.id && (
        <div key={question.id}>
          <RenderStandardQuestion
            question={question}
            isDisabled={isDisabled}
            canEnterData={canEnterData}
            canReview={canReview}
            responses={responses}
            handleChange={handleChange}
            errors={errors}
            task={task}
            slug={slug}
            getTask={getTask}
            userId={userId}
            updateStatus={updateStatus}
          />
        </div>
      )
    );
  });
}
