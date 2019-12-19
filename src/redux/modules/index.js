import { combineReducers } from 'redux';
import app from './app';
import events from './events';

const rootReducer = combineReducers({
  app,
  events,
});

export default rootReducer;
