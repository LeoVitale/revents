import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import app from './app';
import events from './events';
import modals from './modal';
import auth from './auth';
import async from './async';

const rootReducer = combineReducers({
  app,
  events,
  modals,
  auth,
  async,
  toastr,
});

export default rootReducer;
