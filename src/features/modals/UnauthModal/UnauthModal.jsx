import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Modal, Button, Divider } from 'semantic-ui-react';

import { openModal, closeModal } from 'modules/modal';

function UnauthModal() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { goBack } = useHistory();

  const onCloseModal = () => {
    if (pathname.includes('/event')) {
      dispatch(closeModal());
    } else {
      goBack();
      dispatch(closeModal());
    }
  };

  const dispatchOpenModal = typeModal => () => dispatch(openModal(typeModal));

  return (
    <Modal size="mini" open onClose={onCloseModal}>
      <Modal.Header>You need to be signed in to do that!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Please either login or register to see this page</p>
          <Button.Group widths={4}>
            <Button
              fluid
              color="teal"
              onClick={dispatchOpenModal('LoginModal')}>
              Login
            </Button>
            <Button.Or />
            <Button fluid positive onClick={dispatchOpenModal('RegisterModal')}>
              Register
            </Button>
          </Button.Group>
          <Divider />
          <div style={{ textAlign: 'center' }}>
            <p>Or click cancel to continue as a guest</p>
            <Button onClick={onCloseModal}>Cancel</Button>
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}

export default UnauthModal;
