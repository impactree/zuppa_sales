import { ITask, ITaskQuestions } from '@/lib/interface/ITask.interface';
import { sequenceQuestion } from '@/lib/utils';
import React, { useMemo } from 'react';
import { QuestionWrapper } from '../ResponseInputFields/QuestionWrapper';
import { ITaskStatus } from '../types';
import LoadIconsAndComments from './LoadIconsAndComments';
import RenderStandQuestionParentField from './RenderStandQuestionParentField';
import { IStandardAndGroupAnswer, ITaskResponse } from './types';

interface RenderStandardQuestionProps {
  question: ITaskQuestions;
  isDisabled: boolean;
  responses: ITaskResponse[];
  task: ITask;
  slug: string;
  getTask: () => void;
  userId?: string;
  updateStatus?: (status: ITaskStatus) => void;
  canEnterData?: boolean;
  canReview?: boolean;
  handleChange?: (
    value: string | string[],
    standardAndGroupAnswer: IStandardAndGroupAnswer,
    taskQuestion?: ITaskQuestions
  ) => void;
  errors?: Record<string, string>;
}

const RenderStandardQuestion: React.FC<RenderStandardQuestionProps> = ({
  question,
  isDisabled,
  canEnterData,
  canReview,
  responses,
  handleChange,
  errors,
  task,
  slug,
  getTask,
  userId,
  updateStatus,
}) => {
  const questionType = useMemo(
    () => question?.question_sequence?.datacube_question?.question_type,
    [question?.question_sequence?.datacube_question?.question_type],
  );

  const isShowUploadIcon = useMemo(
    () => questionType === 'FILE',
    [questionType],
  );

  const answer = useMemo(
    () => responses?.find((item) => item.task_question === question.id)?.answer,
    [responses, question.id],
  );

  const hasAnswer = useMemo(() => answer && answer?.length > 0, [answer]);

  const hasComments = useMemo(
    () => question?.task_comments?.length > 0,
    [question?.task_comments?.length],
  );

  const showUploadWithAnswer = useMemo(
    () => isShowUploadIcon && hasAnswer,
    [isShowUploadIcon, hasAnswer],
  );
  const shouldUseCol10 = canReview
    ? isShowUploadIcon || hasComments
    : isShowUploadIcon && hasComments;

  const colClass = useMemo(() => {
    if (!isDisabled) {
      if (canReview || shouldUseCol10) {
        return 'col-lg-10';
      }
      if (showUploadWithAnswer || hasComments) {
        return 'col-lg-11';
      }
    }
    return 'col-lg-12';
  }, [
    isDisabled,
    canReview,
    shouldUseCol10,
    showUploadWithAnswer,
    hasComments,
  ]);

  const sequenceData = useMemo(() => sequenceQuestion(question), [question]);

  return (
    <div key={question?.id} className="mb-4">
      <QuestionWrapper
        label={sequenceData?.title}
        isCustomRequired
        toolTip={sequenceData?.description}
      >
        <div className="row align-items-center">
          <div className={`col-12 ${colClass} p-0`}>
            <RenderStandQuestionParentField
              question={question}
              responses={responses}
              isDisabled={canReview || isDisabled}
              handleChange={handleChange}
              error={
                errors?.[
                  question?.question_sequence?.datacube_question?.id || ''
                ]
              }
            />
          </div>
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
      </QuestionWrapper>
      <hr className="textSecondary" />
    </div>
  );
};

export default React.memo(RenderStandardQuestion);
