import { useEffect, useState } from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import './Modal.css';
import { ModalProps } from '../types';

export function Modal({
  show = false,
  onHide,
  title,
  children,
  className = '',
  size = '',
  fullscreen,
  onClose,
}: ModalProps) {
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    setModalShow(show);
  }, [show]);

  return (
    <BootstrapModal
      show={modalShow}
      onHide={() => {
        setModalShow(false);
        if (onHide) onHide();
        if (onClose) onClose();
      }}
      centered
      className={className}
      fullscreen={fullscreen}
      size={size || undefined}
      keyboard={false}
      backdrop="static"
      data-testid="close-button"
    >
      {(title ?? !!onClose) && (
        <BootstrapModal.Header
          data-testid="close-button"
          closeButton={!!onClose}
          className="p-0"
        >
          <div
            style={{ padding: '0px 0px 0px 0px' }}
            className=" text-center w-100"
          >
            {title && (
              <BootstrapModal.Title
                data-testid="Test Title"
                className="flex-grow-1"
              >
                <h2 className=" text-center fw-bold mb-0">{title}</h2>
              </BootstrapModal.Title>
            )}
          </div>
        </BootstrapModal.Header>
      )}
      <BootstrapModal.Body data-testid="Test Content" className="p-0">
        <div style={{ padding: '39px 42px' }}>{children}</div>
      </BootstrapModal.Body>
    </BootstrapModal>
  );
}
