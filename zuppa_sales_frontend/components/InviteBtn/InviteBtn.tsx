'use client';

import { BsDatabaseAdd } from 'react-icons/bs';
import { Button } from '../Button/Button';
import { useModal } from '../Modal/Context';
import UserInviteForm from '../UserInviteForm/UserInviteForm';
import './InviteBtn.css';

export default function InviteBtn({
  apiKey,
}: {
  apiKey: string;
}) {
  const hideModal = useModal({});
  const modal = useModal({
    style: {
      size: 'lg',
    },
    content: (
      <UserInviteForm
        slug={apiKey}
        closeModal={hideModal}
      />
    ),
  });
  return (
    <Button
      text="Create"
      onClick={() => modal()}
      btnclassName="d-flex align-items-center justify-content-center"
      className="custom-invite-btn"
      style={{ background: '#ffeac0' }}
      sufixIconChildren={(
        <BsDatabaseAdd
          color="var(--textsecondary)"
          className="mb-1 ms-2"
        />
      )}
    />
  );
}
