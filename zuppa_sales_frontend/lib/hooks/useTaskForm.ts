/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { ITaskStatus } from '@/components/types';
import { ITask, ITaskQuestions } from '@/lib/interface/ITask.interface';
import { TaskService } from '@/lib/service';
import { cleanedQuestions } from '@/lib/utils';
import { debounce } from 'lodash';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import toast from 'react-hot-toast';
import { IStandardAndGroupAnswer, ITaskResponse } from '../../components/TaskDataEntryForm/types';

interface UseTaskFormProps {
  task: ITask | any;
  slug: string;
  selectedTaskId?: string;
  onTaskUpdate: (updatedTask: ITask) => void;
  isDataProvider: boolean
  questions?: ITaskQuestions[];
}

export const useTaskForm = ({
  task,
  slug,
  selectedTaskId,
  onTaskUpdate,
  questions,
  isDataProvider,
}: UseTaskFormProps) => {
  const [responses, setResponses] = useState<ITaskResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isCompleted = task?.status === 'COMPLETED';

  const getTask = useCallback(async () => {
    const taskId = selectedTaskId || task?.id;
    if (!taskId) return;

    try {
      setIsLoading(true);
      const res = await TaskService.getById(taskId, slug);
      const { task: _task, success } = res?.data as { task: ITask; success: boolean };
      if (success && _task) {
        onTaskUpdate(_task);

        // ✅ Update responses for the input fields
        const formatted: ITaskResponse[] = _task?.task_questions.flatMap((question: any) => {
          const standardAndGroupAnswer = question.task_question_answers?.[0];

          if (standardAndGroupAnswer?.question_sequence_type === 'STANDARD') {
            return [{
              task_question: question.id,
              datacube_question: question.question_sequence?.datacube_question?.id ?? '',
              answer: standardAndGroupAnswer.answer ?? '',
              question_sequence_type: 'STANDARD',
            }];
          }

          return question.question_sequence?.group_question_rule
            ?.datacube_group_questions?.map((grpQust: any) => ({
              task_question: question.id,
              datacube_question: grpQust?.datacube_question?.id ?? '',
              answer: question.task_question_answers?.find(
                (ans: any) => ans?.datacube_question?.id === grpQust?.datacube_question?.id,
              )?.answer ?? '',
              question_sequence_type: 'GROUP',
            })) ?? [];
        });
        setResponses(formatted);

        if (['CREATED', 'REASSIGNED', 'REJECTED']?.includes(_task?.status) && isDataProvider) {
          await TaskService.updateStatus(slug, taskId, { status: 'IN_PROGRESS' });
          getTask();
        }
      }
    } catch (error) {
      toast.error('Failed to fetch task data');
    } finally {
      setIsLoading(false);
    }
  }, [selectedTaskId, task?.id, slug, onTaskUpdate, isDataProvider]);

  useEffect(() => {
    if (selectedTaskId) {
      getTask();
    }
  }, [selectedTaskId, getTask]);

  const updateStatus = useCallback(
    async (status: ITaskStatus) => {
      try {
        setIsLoading(true);

        const res = await TaskService.updateStatus(slug, task?.id, { status });
        const { success, error } = res?.data as { success: boolean; error: string[] };

        if (!success) {
          toast.error(error.join(', '));
          return;
        }

        const statusMessages: any = {
          SUBMITTED: 'Task submitted successfully!',
          REJECTED: 'Task rejected successfully!',
          REASSIGNED: 'Task reassigned successfully!',
          COMPLETED: 'Task completed successfully!',
        };

        const message = statusMessages[status];
        if (message) toast.success(message);

        await getTask();
      } catch (err) {
        console.error('Update status failed', err);
        toast.error('Failed to update task status');
      } finally {
        setIsLoading(false);
      }
    },
    [getTask, slug, task?.id],
  );

  const saveResponseToAPI = useCallback(async (_data?: ITaskResponse[]) => {
    try {
      setIsLoading(true);
      const res = await TaskService.taskQuestionAnswer(slug, _data || responses);
      const { success, error } = res?.data as {
        success: boolean;
        message: string;
        error: string[];
      };

      if (!success) {
        toast.error(error.join(' ,'));
        return false;
      }
      return true;
    } catch (error) {
      toast.error('Failed to save response');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [responses, slug]);

  const updateResponseToAPI = useCallback(async (__data: ITaskResponse, answerId: string) => {
    try {
      setIsLoading(true);
      const res = await TaskService.updateAnswer(slug, answerId, __data);
      const { success, error } = res?.data as {
        success: boolean;
        message: string;
        error: string[];
      };
      if (!success) {
        toast.error(error.join(' ,'));
        return false;
      }
      return true;
    } catch (error) {
      toast.error('Failed to update response');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  // 🔥 OPTIMISTIC UPDATE: Update task state AND responses immediately
  const updateTaskOptimistically = useCallback((response: ITaskResponse) => {
    const updatedTask = JSON.parse(JSON.stringify(task)); // Deep clone to avoid mutation

    if (!updatedTask.task_questions) return;

    // Find the question that needs updating
    const questionIndex = updatedTask.task_questions.findIndex(
      (q: any) => q.id === response.task_question,
    );

    if (questionIndex === -1) return;

    const question = updatedTask.task_questions[questionIndex];

    // Check if answer exists
    const hasAnswer = Array.isArray(response.answer)
      ? response.answer.length > 0
      : response.answer !== '' && response.answer !== null && response.answer !== undefined;

    if (response.question_sequence_type === 'STANDARD') {
      // Update STANDARD question answer
      if (!question.task_question_answers) {
        question.task_question_answers = [];
      }

      const answerIndex = question.task_question_answers.findIndex(
        (ans: any) => ans.question_sequence_type === 'STANDARD',
      );

      if (answerIndex !== -1) {
        question.task_question_answers[answerIndex].answer = response.answer;
        question.task_question_answers[answerIndex].is_answered = hasAnswer;
      } else {
        question.task_question_answers.push({
          answer: response.answer,
          is_answered: hasAnswer,
          question_sequence_type: 'STANDARD',
          datacube_question: { id: response.datacube_question },
        });
      }

      // ✅ Also update the question-level is_answered flag for STANDARD questions
      question.is_answered = hasAnswer;
    } else if (response.question_sequence_type === 'GROUP') {
      // Update GROUP question answer
      if (!question.task_question_answers) {
        question.task_question_answers = [];
      }

      const answerIndex = question.task_question_answers.findIndex(
        (ans: any) => ans.datacube_question?.id === response.datacube_question,
      );

      if (answerIndex !== -1) {
        question.task_question_answers[answerIndex].answer = response.answer;
        question.task_question_answers[answerIndex].is_answered = hasAnswer;
      } else {
        question.task_question_answers.push({
          answer: response.answer,
          is_answered: hasAnswer,
          question_sequence_type: 'GROUP',
          datacube_question: { id: response.datacube_question },
        });
      }
    }

    // Trigger parent update to recalculate percentages
    onTaskUpdate(updatedTask);
  }, [task, onTaskUpdate]);

  const debouncedSave = useMemo(
    () => debounce(async (response: ITaskResponse, answerId?: string) => {
      let success = false;

      if (answerId) {
        success = await updateResponseToAPI(response, answerId);
      } else {
        success = await saveResponseToAPI([response]);
      }

      // ✅ If save fails, revert the optimistic update by refreshing task data
      if (!success) {
        await getTask();
      }
    }, 2000),
    [updateResponseToAPI, saveResponseToAPI, getTask],
  );

  const handleChange = useCallback(
    (
      value: string | string[],
      standardAndGroupAnswer: IStandardAndGroupAnswer,
      _taskQuestion?: ITaskQuestions,
    ) => {
      const newResponse: ITaskResponse = {
        task_question: standardAndGroupAnswer.task_question_id,
        datacube_question: standardAndGroupAnswer.datacube_question_id,
        answer: value,
        question_sequence_type: standardAndGroupAnswer.questable_type,
        parent_option_id: standardAndGroupAnswer?.parent_option_id || '',
        mixed_question_id: standardAndGroupAnswer.mixed_question_id || '',
        rule_question_id: standardAndGroupAnswer?.rule_question_id || '',
        group_questions_rule_id: standardAndGroupAnswer?.group_questions_rule_id || '',
      };

      // ✅ Update responses state immediately
      setResponses((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item?.task_question === standardAndGroupAnswer?.task_question_id
            && item?.datacube_question === standardAndGroupAnswer?.datacube_question_id
            && item?.question_sequence_type === standardAndGroupAnswer?.questable_type,
        );

        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = newResponse;
          return updated;
        }

        return [...prev, newResponse];
      });

      // 🔥 UPDATE TASK OPTIMISTICALLY IMMEDIATELY (before the API call)
      updateTaskOptimistically(newResponse);

      // Save to API after 2 seconds
      debouncedSave(newResponse, standardAndGroupAnswer?.answer_id);
    },
    [debouncedSave, updateTaskOptimistically],
  );

  const isBtnDisabled = useMemo(() => {
    if (!questions) return true;
    if (isCompleted) return false;

    const status = task?.status;
    const approvedStatuses = ['SUBMITTED', 'REVIEWING'];
    const answeredStatuses = ['IN_PROGRESS', 'CREATED', 'REASSIGNED', 'REJECTED'];

    if (!status) {
      return cleanedQuestions(questions).every(
        (item) => item?.is_answered === true,
      );
    }

    if (approvedStatuses.includes(status)) {
      return cleanedQuestions(questions).every(
        (item) => item?.is_approved !== null,
      );
    }

    if (answeredStatuses.includes(status)) {
      return cleanedQuestions(questions).every(
        (item) => item?.is_answered === true,
      );
    }

    return false;
  }, [isCompleted, questions, task?.status]);

  useEffect(() => {
    const formatted: ITaskResponse[] = task?.task_questions?.flatMap((question: any) => {
      const standardAndGroupAnswer = question.task_question_answers?.[0];

      if (standardAndGroupAnswer?.question_sequence_type === 'STANDARD') {
        return [{
          task_question: question.id,
          datacube_question: question.question_sequence?.datacube_question?.id ?? '',
          answer: standardAndGroupAnswer.answer ?? '',
          question_sequence_type: 'STANDARD',
        }];
      }

      return question.question_sequence?.group_question_rule
        ?.datacube_group_questions?.map((grpQust: any) => ({
          task_question: question.id,
          datacube_question: grpQust?.datacube_question?.id ?? '',
          answer: question.task_question_answers?.find(
            (ans: any) => ans?.datacube_question?.id === grpQust?.datacube_question?.id,
          )?.answer ?? '',
          question_sequence_type: 'GROUP',
        })) ?? [];
    }) || [];
    setResponses(formatted);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    responses,
    setResponses,
    isLoading,
    getTask,
    updateStatus,
    handleChange,
    isBtnDisabled,
  };
};
