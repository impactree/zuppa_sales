/* eslint-disable max-len */

import {
  ITaskDataCubeGroupQuestions,
  ITaskQuestions,
} from '@/lib/interface/ITask.interface';
import moment from 'moment';
import { MdOutlineDelete, MdOutlineRemoveRedEye } from 'react-icons/md';
import { QuestionWrapper } from '../ResponseInputFields/QuestionWrapper';
import RenderGroupParentField from './RenderGroupParentField';
import { IStandardAndGroupAnswer, ITaskResponse } from './types';

export default function RenderGroupQuestion({
  question,
  taskQuestion,
  isDisabled,
  responses,
  handleChange,
  canEnterData,
  canReview,
  groupIndex,
  errors,
}: {
  question: ITaskDataCubeGroupQuestions;
  taskQuestion: ITaskQuestions;
  isDisabled: boolean;
  responses: ITaskResponse[];
  handleChange?: (
    value: string | string[],
    standardAndGroupAnswer: IStandardAndGroupAnswer,
    _taskQuestion?: ITaskQuestions
  ) => void;
  canEnterData: boolean;
  canReview: boolean;
  groupIndex?: number;
  errors?: Record<string, string>;
}) {
  const answer = responses?.find(
    (item) => item.datacube_question === question?.datacube_question?.id
      && item?.task_question === taskQuestion?.id,
  )?.answer;
  const isShowUploadIcon = question?.datacube_question?.question_type === 'FILE'
    && answer
    && answer?.length > 0;

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

  return (
    <div key={question?.datacube_question?.id} className="mb-4">
      <QuestionWrapper
        label={question?.datacube_question?.title}
        isCustomRequired
        toolTip={question?.datacube_question?.description}
      >
        <div className="row align-items-center">
          <div
            className={`col-12 ${isShowUploadIcon ? 'col-lg-11' : 'col-lg-12'} p-0`}
          >
            <RenderGroupParentField
              question={question}
              responses={responses}
              isDisabled={canReview || isDisabled}
              taskQuestion={taskQuestion}
              handleChange={handleChange}
              groupIndex={groupIndex}
              error={errors?.[question?.datacube_question?.id || '']}
            />
          </div>
          {isShowUploadIcon && (
            <div className="col-12 col-lg-1 p-0">
              <div className="d-flex gap-2 align-items-center justify-content-end">
                <div className="d-flex gap-2 align-items-center">
                  <MdOutlineRemoveRedEye
                    size={22}
                    cursor="pointer"
                    color="#A6A6A6"
                    onClick={() => {
                      const url = (answer || '').toString();
                      if (!url) {
                        // eslint-disable-next-line no-alert
                        alert('No file available to preview or download.');
                        return;
                      }
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `${taskQuestion?.question_sequence?.datacube_question?.title}_${moment(new Date()).format('dd_mm_yyyy_hh_mm_ss')}`;
                      link.target = '_blank';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  />
                  {canEnterData && (
                    <MdOutlineDelete
                      size={22}
                      cursor="pointer"
                      onClick={() => handleChange?.(
                        '',
                        {
                          ...convertGroupQuestionAnswer(),
                        },
                        taskQuestion,
                      )}
                      color="#A6A6A6"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </QuestionWrapper>
      <hr className="textSecondary" />
    </div>
  );
}
