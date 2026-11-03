'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { IModalProps, IModalStyleProps } from '../types';
import { Modal } from './Modal';
import './Modal.css';

const ModalContext = createContext<
  | {
      showModal:(
        content: ReactNode,
        ModalProps?: Partial<IModalProps>
      ) => void;
      hideModal: () => void;
        }
        | undefined
        >(undefined,
        );

function ModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const [modalProps, setModalProps] = useState<IModalProps>({
    show: false,
    onHide: () => {},
    children: null,
    size: 'sm',
  });

  const hideModal = useCallback(() => {
    setModalContent(null);
    setModalProps((prevProps) => ({
      ...prevProps,
      show: false,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialModalProps: IModalProps = {
    show: false,
    onHide: hideModal,
    children: null,
    size: 'sm',
  };

  const showModal = useCallback(
    (content: ReactNode, ModalProps: Partial<IModalProps> = {}) => {
      const mergedModalProps: IModalProps = {
        ...initialModalProps,
        ...ModalProps,
        show: true,
      };

      setModalContent(content);
      setModalProps(mergedModalProps);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const contextValue = useMemo(
    () => ({
      showModal,
      hideModal,
    }),
    [showModal, hideModal],
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modalContent && (
        <div className="modal-wrapper" aria-hidden="true" onClick={hideModal}>
          <div
            className="modal-content"
            aria-hidden="true"
            onClick={(e) => e.stopPropagation()}
          >
            <Modal {...modalProps}>{modalContent}</Modal>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

const useModal = ({
  style,
  content,
}: {
  style?: IModalStyleProps;
  content?: ReactNode;
}) => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  const triggerModal = () => {
    if (content) {
      context.showModal(content, style);
    } else {
      context.hideModal();
    }
  };

  return triggerModal;
};

const useModalControls = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalControls must be used within a ModalProvider');
  }
  return context;
};

export { ModalProvider, useModal, useModalControls };
