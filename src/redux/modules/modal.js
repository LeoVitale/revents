import { createSelector } from 'reselect';
import { createReducer } from '../utils/reducer';

const MODAL_OPEN = 'events/MODAL_OPEN';
const MODAL_CLOSE = 'events/MODAL_CLOSE';

const initialState = null;

/*
  REDUCERS
*/

const openModalReducer = (state, payload) => {
  const { modalType, modalProps } = payload;
  return { modalType, modalProps };
};

const closeModalReducer = state => {
  return null;
};

export default createReducer(initialState, {
  [MODAL_OPEN]: openModalReducer,
  [MODAL_CLOSE]: closeModalReducer,
});

/*
  ACTION CREATORS
*/

export const openModal = (modalType, modalProps) => {
  return {
    type: MODAL_OPEN,
    payload: {
      modalType,
      modalProps,
    },
  };
};

export const closeModal = () => {
  return {
    type: MODAL_CLOSE,
  };
};

/*
  SELECTOR
*/

export const getCurrentModal = createSelector(
  state => state.modals,
  modals => modals,
);
