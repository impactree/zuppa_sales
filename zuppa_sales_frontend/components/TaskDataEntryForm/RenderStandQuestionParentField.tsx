import { ITaskQuestions } from '@/lib/interface/ITask.interface';
import { convertStandardQuestionAnswer } from '@/lib/utils';
import RenderInputField from './RenderInputField';
import { IStandardAndGroupAnswer, ITaskResponse } from './types';

export default function RenderStandQuestionParentField({
  question,
  responses,
  isDisabled,
  handleChange,
  error,
}: {
  question: ITaskQuestions;
  responses: ITaskResponse[];
  isDisabled: boolean;
  handleChange?: (
    value: string | string[],
    standardAndGroupAnswer: IStandardAndGroupAnswer,
    taskQuestion?: ITaskQuestions
  ) => void;
  error?: string;
}) {
  const { id } = question;
  const {
    question_type: type,
    placeholder,
    datacube_question_options: options = [],
    mixed_questions: mixedQuestions,
    // eslint-disable-next-line no-unsafe-optional-chaining
  } = question?.question_sequence?.datacube_question || {};

  const value = responses?.find((item) => item?.task_question === id)?.answer || '';

  const handleValueChange = (val: string | string[]) => {
    if (!isDisabled && handleChange) {
      handleChange(val, convertStandardQuestionAnswer(question), question);
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
