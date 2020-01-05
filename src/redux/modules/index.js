import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import { firebaseReducer as firebase } from 'react-redux-firebase';
import { firestoreReducer as firestore } from 'redux-firestore';
import app from './app';
import events from './events';
import modals from './modal';
import auth from './auth';
import async from './async';
import user from './user';

const rootReducer = combineReducers({
  app,
  user,
  events,
  modals,
  auth,
  async,
  toastr,
  firebase,
  firestore,
});

export default rootReducer;
