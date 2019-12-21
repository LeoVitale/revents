import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentModal } from 'modules/modal';

import LoginModal from 'features/modals/LoginModal';
import RegisterModal from 'features/modals/RegisterModal';
import UnauthModal from 'features/modals/UnauthModal';

const modalLookup = {
  LoginModal,
  RegisterModal,
  UnauthModal,
};

const ModalManager = () => {
  const currentModal = useSelector(getCurrentModal);

  console.log(currentModal);

  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }
  return <div>{renderedModal}</div>;
};

export default ModalManager;
