import { createSelector } from 'reselect';
import { createReducer } from '../utils/reducer';
import { closeModal } from './modal';

const LOGIN_USER = 'events/LOGIN_USER';
const SIGN_OUT_USER = 'events/SIGN_OUT_USER';

const initialState = {
  authenticated: false,
  currentUser: null,
};

/*
  REDUCERS
*/

const loginUser = (state, payload) => {
  return {
    authenticated: true,
    currentUser: payload.creds.email,
  };
};

const signOutUser = () => {
  return {
    authenticated: false,
    currentUser: null,
  };
};

export default createReducer(initialState, {
  [LOGIN_USER]: loginUser,
  [SIGN_OUT_USER]: signOutUser,
});

/*
  ACTION CREATORS
*/

export const login = creds => {
  return dispatch => {
    dispatch({
      type: LOGIN_USER,
      payload: {
        creds,
      },
    });
    dispatch(closeModal());
  };
};

export const logOut = () => {
  return {
    type: SIGN_OUT_USER,
  };
};

/*
  SELECTOR
*/

export const getAuth = createSelector(
  state => state.auth,
  auth => auth,
);
