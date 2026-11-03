import { toast } from 'react-toastify';
import { ToastProps } from '../types';

export const Notify = ({
  message,
  type,
  position = 'top-right',
  autoClose = 3000,
}: ToastProps) => {
  const getIconAndBgColor = () => {
    let bgColor;
    let color;
    switch (type) {
      case 'SUCCESS':
        bgColor = 'var(--success)';
        return { bgColor };
      case 'ERROR':
        bgColor = 'var(--danger)';
        return { bgColor };
      case 'LOADING':
        bgColor = 'white';
        color = 'black';
        return { bgColor, color };
      default:
        return {};
    }
  };

  toast(message, {
    position,
    style: {
      background: getIconAndBgColor()?.bgColor,
      borderRadius: '50px',
      color: getIconAndBgColor()?.color ?? '#fff',
      width: 'fit-content',
      textWrap: 'wrap',
    },
    autoClose,
    closeButton: false,
    hideProgressBar: true,
    containerId: message,
  });
};
