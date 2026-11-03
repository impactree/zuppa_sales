'use client';

import { IUser } from '@/lib/interface/IUser.interface';
import { UserService } from '@/lib/service';
import { convertToPascalCase, getDomainFromSubdomain, userRole } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import Avatar from 'react-avatar';
import toast from 'react-hot-toast';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import { useUser } from '../Context/userProvider';
import './ChangeAvatar.css';

export default function ChangeAvatar({
  user,
  apiKey,
  isUser,
}: Readonly<{
  user: IUser;
  apiKey: string;
  isUser: boolean;
}>) {
  const router = useRouter();
  const context = useUser();
  const uploadProfilePicture = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const response = isUser
        ? await UserService.updateAvatar(formData, apiKey)
        : await UserService?.updateAccountAvatar(formData, apiKey);
      const { success, error } = response?.data as {
        success: boolean;
        error: string[];
      };
      if (success) {
        toast.success('Avatar updated successfully');
        router.refresh();
        context?.getCurrentUser();
      } else {
        toast.error(error[0]);
      }
      router.refresh();
    }
  };

  const deleteProfileAttachment = async () => {
    const response = isUser
      ? await UserService?.deleteAvatar(apiKey)
      : await UserService?.deleteAccountAvatar(apiKey);
    const { success, error } = response?.data as {
      success: boolean;
      error: string[];
    };
    if (success) {
      toast.success('Avatar deleted successfully');
      context?.getCurrentUser();
      router.refresh();
    } else {
      toast.error(error[0]);
    }
  };

  const displayName = isUser ? user?.name : user?.account?.account_name;

  const truncatedName = displayName && displayName.length > 15
    ? `${displayName.slice(0, 15)}...`
    : displayName;

  return (
    <div className="py-0">
      <div className="px-0 pb-0  d-flex align-items-center flex-column">
        <div className="d-flex position-relative avatar-text-size">
          <Avatar
            name={displayName}
            size="160px"
            className="avatarImgRound rounded-circle"
            src={(isUser ? user?.avatar_url : user?.account?.logo_path) ?? ''}
          />
          <div className="d-flex justify-content-center">
            <div className=" d-flex">
              <label className="avatar-add">
                <span className="curser-pointer">
                  <AiOutlineEdit size={24} />
                </span>
                <input
                  type="file"
                  className="file-input"
                  accept="image/*"
                  onChange={(e) => uploadProfilePicture(e)}
                  data-testid="avatar-input"
                  style={{ display: 'none' }}
                />
              </label>
              {!!(isUser ? user?.avatar_url : user?.account?.logo_path) && (
                <div className="avatar-delete">
                  <span
                    aria-hidden
                    className="curser-pointer"
                    onClick={() => deleteProfileAttachment()}
                    data-testid="avatar-delete"
                  >
                    <MdOutlineDelete size={24} />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <h4
          className="text-center account-name fw-700 pt-4"
          title={displayName}
        >
          {truncatedName}
        </h4>
        <p className="text-center fs-14" style={{ color: '#8F8F8F' }}>
          {isUser
            ? user?.email
            : (user?.account?.official_email_id ?? user?.email)}
        </p>
        <span>
          <span className="me-2 fs-14">
            {`${isUser ? 'Role' : 'Workspace URL'} -`}
          </span>
          <span
            className="  px-2 py-1 rounded-4 fs-12"
            style={{ background: '#499da91a', color: '#305B61' }}
          >
            {isUser
              ? convertToPascalCase(userRole(user?.role)?.replaceAll('_', ' ') || '')
              : `${user?.account?.slug}.${getDomainFromSubdomain(window.location.hostname)}`}
          </span>
        </span>
      </div>
    </div>
  );
}
