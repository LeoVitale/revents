import { createStructuredSelector } from 'reselect';
import { toastr } from 'react-redux-toastr';
import { createReducer } from '../utils/reducer';
import { closeModal } from './modal';

const LOGIN_USER = 'events/LOGIN_USER';
const AUTH_ERROR = 'events/AUTH_ERROR';
const SIGN_OUT_USER = 'events/SIGN_OUT_USER';

const initialState = {
  authenticated: false,
  currentUser: null,
  error: null,
};

/*
  REDUCERS
*/

const loginUserReducer = () => {
  return {
    authenticated: true,
    error: null,
  };
};

const authErrorReducer = (state, payload) => {
  return {
    authenticated: false,
    error: payload.message,
  };
};

const signOutUserReducer = () => {
  return {
    authenticated: false,
    error: null,
  };
};

export default createReducer(initialState, {
  [LOGIN_USER]: loginUserReducer,
  [AUTH_ERROR]: authErrorReducer,
  [SIGN_OUT_USER]: signOutUserReducer,
});

/*
  ACTION CREATORS
*/

export const authError = message => {
  return {
    type: AUTH_ERROR,
    payload: { message },
  };
};

export const login = ({ email, password }) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      dispatch(authError(error.message));
    }
  };
};

export const logOut = () => {
  return {
    type: SIGN_OUT_USER,
  };
};

export const registerUser = ({ displayName, email, password }) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(firebase, firestore);

    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(createdUser);
      await createdUser.user.updateProfile({
        displayName,
      });

      const newUser = {
        displayName,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      dispatch(authError(error.message));
    }
  };
};

export const socialLogin = selectedProvider => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    try {
      dispatch(closeModal());
      const user = await firebase.login({
        provider: selectedProvider,
        type: 'popup',
      });

      if (user.additionalUserInfo.isNewUser) {
        await firestore.set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.photoURL,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePassword = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;

    try {
      await user.updatePassword(creds.newPassword1);
      toastr.success('Success!', 'Your password has been updated');
    } catch (error) {
      console.log(error);
    }
  };
};

/*
  SELECTOR
*/

export const getAuth = createStructuredSelector({
  auth: state => state.firebase.auth,
  error: state => state.auth.error,
});
