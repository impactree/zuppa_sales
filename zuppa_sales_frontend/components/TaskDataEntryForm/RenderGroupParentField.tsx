/* eslint-disable max-len */

import {
  ITaskDataCubeGroupQuestions,
  ITaskQuestions,
} from '@/lib/interface/ITask.interface';
import RenderInputField from './RenderInputField';
import { IStandardAndGroupAnswer, ITaskResponse } from './types';

export default function RenderGroupParentField({
  question,
  responses,
  isDisabled,
  taskQuestion,
  handleChange,
  groupIndex,
  error,
}: {
  question: ITaskDataCubeGroupQuestions;
  responses: ITaskResponse[];
  isDisabled: boolean;
  taskQuestion: ITaskQuestions;
  handleChange?: (
    value: string | string[],
    standardAndGroupAnswer: IStandardAndGroupAnswer,
    _taskQuestion?: ITaskQuestions
  ) => void;
  groupIndex?: number;
  error?: string;
}) {
  const {
    id,
    question_type: type,
    placeholder,
    datacube_question_options: options = [],
    mixed_questions: mixedQuestions,
    // eslint-disable-next-line no-unsafe-optional-chaining
  } = question?.datacube_question;

  const value = responses?.find(
    (item) => item?.datacube_question === id
        && item?.task_question === taskQuestion?.id,
  )?.answer || '';

  const convertGroupQuestionAnswer = () => {
    // Find the matching datacube group question
    const matchingDatacubeGroupQuestion = question?.group_question_rule?.datacube_group_questions?.find(
      (dgq) => dgq?.datacube_question?.id === question?.datacube_question?.id,
    );
    // Check if the question is dependent
    const isDependent = matchingDatacubeGroupQuestion?.is_dependent;

    // Additional debug for parent_option_id path
    const parentOptionPath = question?.group_question_rule?.group_rule?.[0]
      ?.parent_question_options?.[0]?.question_option_id;

    // Find the actual parent option ID if dependent
    let finalParentOptionId = '';
    if (isDependent && parentOptionPath) {
      const matchingOption = question?.group_question_rule?.datacube_group_questions
        ?.flatMap(
          (gq) => gq.datacube_question?.datacube_question_options || [],
        )
        ?.find((opt) => opt?.public_question_option_id === parentOptionPath);

      finalParentOptionId = matchingOption?.id || '';
    }
    return {
      task_question_id: taskQuestion.id,
      datacube_question_id: question?.datacube_question?.id,
      mixed_question_id: question?.datacube_question?.mixed_questions[0]?.id,
      questable_type: 'GROUP',
      group_questions_rule_id:
        taskQuestion?.question_sequence?.group_question_rule?.id,
      rule_question_id:
        taskQuestion?.question_sequence?.question_rules_id?.[0]?.id,
      parent_option_id:
        finalParentOptionId
        || taskQuestion?.question_sequence?.question_rules_id?.[0]
          ?.dependent_option_id?.id,
      answer_id:
        taskQuestion.task_question_answers?.find(
          (ans) => ans?.datacube_question?.id === question?.datacube_question?.id,
        )?.id || '',
      index: groupIndex,
    } as IStandardAndGroupAnswer;
  };

  const handleValueChange = (val: string | string[]) => {
    if (!isDisabled && handleChange) {
      handleChange(
        val,
        {
          ...convertGroupQuestionAnswer(),
        },
        taskQuestion,
      );
    }
  };
  return (
    <RenderInputField
      type={type}
      placeholder={placeholder}
      value={value}
      isDisabled={isDisabled}
      options={options}
      mixedQuestions={mixedQuestions}
      handleValueChange={handleValueChange}
      error={error}
    />
  );
}
