import { combineReducers } from 'redux';
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
});

export default rootReducer;
