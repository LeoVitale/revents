import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'semantic-ui-react';

import { closeModal } from 'modules/modal';
import RegisterForm from 'features/auth/RegisterForm';

const RegisterModal = () => {
  const dispatch = useDispatch();
  return (
    <Modal size="mini" open onClose={() => dispatch(closeModal())}>
      <Modal.Header>Sign Up to Re-vents!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <RegisterForm />
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default RegisterModal;
