import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';

import { closeModal } from 'modules/modal';
import LoginForm from 'features/auth/LoginForm';

const LoginModal = () => {
  const dispatch = useDispatch();
  return (
    <Modal size="mini" open onClose={() => dispatch(closeModal())}>
      <Modal.Header>Login to Re-vents</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <LoginForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default LoginModal;
