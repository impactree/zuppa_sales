'use client';

import { useState } from 'react';
import { TiWarning } from 'react-icons/ti';
import { Button } from '../Button/Button';
import { ActionType } from '../types';

export default function BlockOrUnblockOrDelete({
  actionType,
  onConfirm,
  onClose,
  deleteText,
}: Readonly<{
  actionType: ActionType;
  onConfirm: (data: string) => void;
  onClose: () => void;
  deleteText: string;
}>) {
  const [reason, setReason] = useState('');

  return (
    <div className="text-center">
      <div className="d-flex align-items-center justify-content-center pb-2">
        <TiWarning color="var(--danger)" size={40} className="me-2" />
        <h5 className="fw-bold text-dark mb-0">{deleteText}</h5>
      </div>
      {actionType === 'Block' && (
        <textarea
          rows={4}
          cols={40}
          value={reason}
          onChange={(e) => setReason(e?.target?.value)}
          placeholder="Enter reason for blocking"
          className="form-control"
        />
      )}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button onClick={onClose} text="Cancel" />
        <Button
          text={actionType as string}
          isDisabled={actionType === 'Block' && !reason}
          onClick={() => onConfirm(reason)}
          isSolid
        />
      </div>
    </div>
  );
}
