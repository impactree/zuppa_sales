import React from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import warningImg from '@/assests/delete-warning.png';
import './PopupModal.css';

interface DeleteChartModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  message?: string;
}

export function DeleteModal({
  open,
  onCancel,
  onConfirm,
  message,
}: DeleteChartModalProps) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="delete-modal-overlay" />

        <Dialog.Content className="delete-modal-container">
          <div className="delete-content-row mb-2">
            <Image src={warningImg} alt="delete" className="delete-icon" />

            <h6 className="delete-text">{message}</h6>
          </div>

          <div className="delete-actions">
            <button
              type="button"
              className="delete-cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="button"
              className="delete-confirm-btn"
              onClick={onConfirm}
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// interface EditChartModalProps {
//   open: boolean;
//   onCancel: () => void;
//   onConfirm: () => void;
//   message?: string;
// }

// export function EditModal({
//   open,
//   onCancel,
//   onConfirm,
//   message,
// }: EditChartModalProps) {
//   return (
//     <Dialog.Root open={open}>
//       <Dialog.Portal>
//         <Dialog.Overlay className="delete-modal-overlay" />

//         <Dialog.Content className="delete-modal-container">
//           <h6 className="edit-text">{message}</h6>

//           <div className="delete-actions mt-2">
//             <button
//               type="button"
//               className="delete-cancel-btn"
//               onClick={onCancel}
//             >
//               Cancel
//             </button>

//             <button
//               type="button"
//               className="delete-edit-btn"
//               onClick={onConfirm}
//             >
//               Edit
//             </button>
//           </div>
//         </Dialog.Content>
//       </Dialog.Portal>
//     </Dialog.Root>
//   );
// }
