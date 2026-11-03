/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ITaskDataCubeGroupQuestions, ITaskQuestions } from '@/lib/interface/ITask.interface';
import { transformToNestedStructure } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { ITaskResponse } from '@/components/TaskDataEntryForm/types';

interface UseTaskCalculationsProps {
  taskQuestions: ITaskQuestions[];
}

export const useTaskCalculations = ({ taskQuestions }: UseTaskCalculationsProps) => {
  const searchParams = useSearchParams();
  const searchParamsIndicator = searchParams.get('indicator') || '';
  const modules = useMemo(
    () => transformToNestedStructure(taskQuestions),
    [taskQuestions],
  );

  const questions = useMemo(
    () => modules?.flatMap((module) => module?.indicators || [])
      ?.flatMap((indicator) => indicator?.questions || []),
    [modules],
  );

  const getCurrentIndicator = useMemo(
    () => modules
      ?.flatMap((item) => item?.indicators)
      ?.find((item) => searchParamsIndicator === item?.name.trim()),
    [modules, searchParamsIndicator],
  );

  const calculateAnsweredPercentage = (
    _taskQuestions: ITaskQuestions[],
    isReview: boolean,
    responses?: ITaskResponse[],
  ) => {
    // Preserve existing review logic (approval is tracked at the question level)
    if (isReview) {
      const totalReview = _taskQuestions.length;
      if (totalReview === 0) return 0;
      const approved = _taskQuestions?.filter((q) => (q?.is_approved !== null && q.is_approved))?.length;
      return Math.round((approved / totalReview) * 100);
    }

    // For data entry, count only visible questions; for GROUP questions, count visible children
    let totalVisible = 0;
    let answeredVisible = 0;

    const isGroupChildVisible = (
      child: ITaskDataCubeGroupQuestions,
      currentTaskQuestion: ITaskQuestions,
    ): boolean => {
      const groupRules = child?.group_question_rule?.group_rule || [];
      const isDependent = child?.is_dependent;

      if (!isDependent || groupRules.length === 0) return true;

      return groupRules.every((rule: any) => {
        // Find the parent question for this rule inside the same group definition
        const parentQuestion = currentTaskQuestion?.question_sequence?.group_question_rule
          ?.datacube_group_questions?.find(
            (gq) => gq?.datacube_question?.public_question_id === rule?.parent_question_id,
          );

        if (!parentQuestion) return false;

        // Find the response for the parent inside the same task question instance (group)
        const parentResponse = responses?.find(
          (res) => res?.datacube_question === parentQuestion?.datacube_question?.id
            && res?.task_question === currentTaskQuestion?.id,
        );

        if (!parentResponse || !parentResponse.answer) return false;

        const requiredOptionIds = (rule?.parent_question_options || []).map(
          (opt: any) => opt?.question_option_id,
        );

        const matchingOptions = parentQuestion?.datacube_question?.datacube_question_options?.filter(
          (opt) => requiredOptionIds.includes(opt?.public_question_option_id),
        ) || [];

        const responseMatches = matchingOptions.some((opt) => (
          Array.isArray(parentResponse.answer)
            ? parentResponse.answer.includes(opt?.id)
            : parentResponse.answer === opt?.id
        ));

        if (!responseMatches) return false;

        const selectedOption = matchingOptions.find((opt) => (
          Array.isArray(parentResponse.answer)
            ? parentResponse.answer.includes(opt?.id)
            : parentResponse.answer === opt?.id
        ));

        if (!selectedOption) return false;

        const matchingRuleOption = (rule?.parent_question_options || []).find(
          (ruleOpt: any) => ruleOpt?.question_option_id === selectedOption?.public_question_option_id,
        );

        if (!matchingRuleOption?.dependent_question_ids) return false;

        return matchingRuleOption.dependent_question_ids.includes(
          child?.datacube_question?.public_question_id,
        );
      });
    };

    const isAnsweredValue = (value: unknown): boolean => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && String(value).trim() !== '';
    };

    _taskQuestions.forEach((q) => {
      if (q?.question_sequence?.questable_type === 'GROUP') {
        const children = q?.question_sequence?.group_question_rule?.datacube_group_questions || [];
        const visibleChildren = children.filter((child) => isGroupChildVisible(child, q));
        totalVisible += visibleChildren.length;

        visibleChildren.forEach((child) => {
          const childResponse = responses?.find(
            (res) => res?.datacube_question === child?.datacube_question?.id
              && res?.task_question === q?.id,
          );
          if (childResponse && isAnsweredValue(childResponse.answer)) {
            answeredVisible += 1;
          }
        });
      } else {
        totalVisible += 1;
        if (q?.is_answered) answeredVisible += 1;
      }
    });

    if (totalVisible === 0) return 0;
    return Math.round((answeredVisible / totalVisible) * 100);
  };

  const getCorrectionCount = (
    _taskQuestions: ITaskQuestions[],
  ) => _taskQuestions?.filter((
    question,
  ) => question?.task_comments?.length > 0)?.length || 0;

  return {
    modules,
    questions,
    calculateAnsweredPercentage,
    getCorrectionCount,
    getCurrentIndicator,
  };
};
