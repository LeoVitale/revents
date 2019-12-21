import { combineReducers } from 'redux';
import app from './app';
import events from './events';
import modals from './modal';
import auth from './auth';

const rootReducer = combineReducers({
  app,
  events,
  modals,
  auth,
});

export default rootReducer;
