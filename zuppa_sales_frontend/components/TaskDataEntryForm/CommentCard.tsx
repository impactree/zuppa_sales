import { ITaskComments } from '@/lib/interface/ITask.interface';
import moment from 'moment';
import Avatar from '../Avatar/Avatar';

export default function CommentCard({
  comment,
}: {
  comment: ITaskComments
}) {
  return (
    <div className="col-lg-12">
      <div className="d-flex justify-content-start">
        <Avatar
          name={comment?.commented_by?.name}
          size="45px"
          avator={comment?.commented_by?.avatar_url || ''}
          className="rounded-circle"
        />
        <div className="ms-2">
          <p className="text-dark fs-14 fw-600 m-0 mb-1">
            {comment.comment}
          </p>
          <p className="text-dark fs-13 fw-500 m-0">
            {comment?.commented_by?.name}
            {' '}
            -
            {moment(comment?.createdAt).format('MMM DD YYYY - HH:mm:ss')}
          </p>
        </div>
      </div>
      <hr className="mt-3 mb-3" />
    </div>
  );
}
