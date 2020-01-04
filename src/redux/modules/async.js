import { createReducer } from '../utils/reducer';

const ASYNC_ACTION_START = 'events/ASYNC_ACTION_START';
const ASYNC_ACTION_FINISH = 'events/ASYNC_ACTION_FINISH';
const ASYNC_ACTION_ERROR = 'events/ASYNC_ACTION_ERROR';

const initialState = {
  loading: false,
  elementName: null,
};

/*
  REDUCERS
*/

const asyncActionStartedReducer = (state, payload) => {
  return {
    ...state,
    loading: true,
    elementName: payload,
  };
};

const asyncActionFinishedReducer = state => {
  return {
    ...state,
    loading: false,
    elementName: null,
  };
};

const asyncActionErrorReducer = state => {
  return {
    ...state,
    loading: false,
    elementName: null,
  };
};

export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncActionStartedReducer,
  [ASYNC_ACTION_FINISH]: asyncActionFinishedReducer,
  [ASYNC_ACTION_ERROR]: asyncActionErrorReducer,
});

/*
  ACTIONS CREATORS
*/
export const asyncActionStart = () => {
  return {
    type: ASYNC_ACTION_START,
  };
};

export const asyncActionFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH,
  };
};

export const asyncActionError = () => {
  return {
    type: ASYNC_ACTION_ERROR,
  };
};
