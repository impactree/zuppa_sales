import { ITask, ITaskQuestions } from '@/lib/interface/ITask.interface';
import { TaskService } from '@/lib/service';
import {
  convertStandardQuestionAnswer,
  showEyeIcon,
  showUploadIcon,
} from '@/lib/utils';
import moment from 'moment';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCircleCheck } from 'react-icons/fa6';
import { MdOutlineDelete, MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiCloseCircleFill } from 'react-icons/ri';
import { TbMessageCirclePlus, TbSend } from 'react-icons/tb';
import { TextField } from '../ResponseInputFields/TextField';
import { ITaskStatus } from '../types';
import CommentCard from './CommentCard';
import { IStandardAndGroupAnswer, ITaskResponse } from './types';

export default function LoadaIconsAndComments({
  question,
  handleChange,
  canEnterData,
  canReview,
  responses,
  task,
  slug,
  getTask,
  userId,
  updateStatus,
}: {
  question: ITaskQuestions;
  responses: ITaskResponse[];
  task: ITask;
  slug: string;
  getTask: () => void;
  userId?: string;
  updateStatus?: (status: ITaskStatus) => void;
  handleChange?: (
    value: string | string[],
    standardAndGroupAnswer: IStandardAndGroupAnswer,
    taskQuestion?: ITaskQuestions
  ) => void;
  canEnterData?: boolean;
  canReview?: boolean;
}) {
  const [currentComments, setCurrentComments] = useState<string>();
  const [createComment, setCreateComment] = useState<string>();

  const isShowCreateComments = createComment === question?.id;
  const showCommentIcon = question?.task_comments?.length > 0;

  const handleCommentToggle = () => {
    setCreateComment(isShowCreateComments ? undefined : question?.id);
  };

  const handleApproveChange = async (value: boolean) => {
    if (task?.status === 'SUBMITTED') {
      updateStatus?.('REVIEWING');
    }
    const res = await TaskService.approveQuestions(slug, task?.id, {
      questions: [
        {
          question_id: question?.id,
          is_approved: value,
        },
      ],
    });
    const { success, error } = res?.data as {
      success: boolean;
      error: string[];
    };
    if (!success) {
      toast.error(error.join(' ,'));
    } else {
      getTask();
    }
  };

  const sendComments = async (comment: string) => {
    const res = await TaskService.taskComments(slug, task?.id, {
      task_question_id: question?.id,
      commented_by: userId || '',
      comment,
    });
    const { success, error } = res?.data as {
      success: boolean;
      error: string[];
    };
    if (success) {
      getTask();
    } else {
      toast.error(error.join(', '));
    }
  };

  const commentUI = () => (
    <div
      className={
        showCommentIcon
          ? 'position-relative d-inline-block'
          : 'd-flex gap-2 align-items-center'
      }
    >
      <TbMessageCirclePlus
        title="Comments"
        size={22}
        cursor="pointer"
        onClick={handleCommentToggle}
        color={isShowCreateComments ? '#fba900' : '#A6A6A6'}
      />
      {showCommentIcon && (
        <span className="comment-badge">{question?.task_comments?.length}</span>
      )}
    </div>
  );

  const renderProviderIcons = () => (
    <div className="d-flex gap-2 align-items-center">
      <MdOutlineRemoveRedEye
        title="View File"
        size={22}
        cursor="pointer"
        color="#A6A6A6"
        onClick={() => {
          const url = question?.task_question_answers?.[0]?.answer;
          if (!url) {
            // eslint-disable-next-line no-alert
            alert('No file available to preview or download.');
            return;
          }
          const link = document.createElement('a');
          link.href = url;
          link.download = `${question?.question_sequence?.datacube_question?.title}_${moment(new Date()).format('dd_mm_yyyy_hh_mm_ss')}`;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
      />
      <MdOutlineDelete
        title="Delete File"
        size={22}
        cursor="pointer"
        onClick={() => handleChange?.('', convertStandardQuestionAnswer(question))}
        color="#A6A6A6"
      />
    </div>
  );

  const renderReviewerIcons = () => (
    <div className="d-flex gap-2 align-items-center">
      {showUploadIcon(question) && showEyeIcon(question, responses) && (
        <MdOutlineRemoveRedEye
          title="View File"
          size={22}
          cursor="pointer"
          color="#A6A6A6"
          onClick={() => {
            const url = question?.task_question_answers?.[0]?.answer;
            if (!url) {
              // eslint-disable-next-line no-alert
              alert('No file available to preview or download.');
              return;
            }
            const link = document.createElement('a');
            link.href = url;
            link.download = `${question?.question_sequence?.datacube_question?.title}_${moment(new Date()).format('dd_mm_yyyy_hh_mm_ss')}`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        />
      )}
      {commentUI()}
      <div className="d-flex gap-2 align-items-center position-relative">
        <FaCircleCheck
          title="Approve"
          size={22}
          cursor="pointer"
          color={
            question?.is_approved === null || question?.is_approved === false
              ? '#A6A6A6'
              : '#136640'
          }
          onClick={() => handleApproveChange(
            question?.is_approved === null ? true : !question?.is_approved,
          )}
        />
        <RiCloseCircleFill
          title="Reject"
          size={28}
          cursor="pointer"
          color={
            question?.is_approved === null || question?.is_approved
              ? '#A6A6A6'
              : '#f96060'
          }
          onClick={() => handleApproveChange(
            question?.is_approved === null ? false : !question?.is_approved,
          )}
        />
      </div>
    </div>
  );

  const isShowUploadIcon = question?.question_sequence?.datacube_question?.question_type === 'FILE';
  const answer = responses?.find(
    (item) => item.task_question === question.id,
  )?.answer;

  return (
    <>
      <div
        className={`col-12 ${(canEnterData ? isShowUploadIcon && showCommentIcon : canReview) && answer && answer?.length ? 'col-lg-2' : 'col-lg-1'} p-0`}
      >
        <div className="d-flex gap-2 align-items-center justify-content-end">
          {canEnterData && showCommentIcon && commentUI()}
          {canEnterData
            && isShowUploadIcon
            && answer
            && answer?.length > 0
            && renderProviderIcons()}
          {canReview && renderReviewerIcons()}
        </div>
      </div>
      {isShowCreateComments && (
        <div className="mt-3 rounded-2 p-0">
          <div>
            {question?.task_comments?.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
          <div>
            <TextField
              type="text"
              placeholder="Reply"
              isValid={false}
              isCustomRequired
              rightIcon
              value={currentComments}
              onChange={(e) => setCurrentComments(e?.target?.value)}
              onKeyPress={(e: { key: string }) => {
                if (e.key === 'Enter' && currentComments?.length) {
                  setCurrentComments('');
                  sendComments(currentComments || '');
                }
              }}
              icon={(
                <TbSend
                  size={20}
                  color="#A6A6A6"
                  onClick={() => {
                    if (currentComments?.length) {
                      setCurrentComments('');
                      sendComments(currentComments || '');
                    }
                  }}
                />
              )}
            />
          </div>
        </div>
      )}
    </>
  );
}
