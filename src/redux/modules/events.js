import { createSelector, createStructuredSelector } from 'reselect';
import { fetchSampleData } from 'app/data/mockApi';
import { createReducer } from '../utils/reducer';
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async';
import { toastr } from 'react-redux-toastr';

const CREATE_EVENT = 'events/CREATE_EVENT';
const UPDATE_EVENT = 'events/UPDATE_EVENT';
const DELETE_EVENT = 'events/DELETE_EVENT';
const FETCH_EVENTS = 'events/FETCH_EVENTS';

const initialState = {
  list: [],
};

/*
  REDUCERS
*/

const createEventReducer = (state, payload) => {
  return { ...state, list: [...state.list, payload.event] };
};

const updateEventReducer = (state, payload) => {
  return {
    ...state,
    list: [
      ...state.list.filter(event => event.id !== payload.event.id),
      payload.event,
    ],
  };
};

const deleteEventReducer = (state, payload) => {
  return {
    ...state,
    list: [...state.list.filter(event => event.id !== payload.id)],
  };
};

const fetchEventsReducer = (state, payload) => {
  return {
    ...state,
    list: payload.events,
  };
};

export default createReducer(initialState, {
  [CREATE_EVENT]: createEventReducer,
  [UPDATE_EVENT]: updateEventReducer,
  [DELETE_EVENT]: deleteEventReducer,
  [FETCH_EVENTS]: fetchEventsReducer,
});

/*
  ACTIONS CREATORS
*/

export const createEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: { event },
      });

      toastr.success('Success!', 'Event has been created');
    } catch (error) {
      console.log(error);
      toastr.error('Oops', 'Something went wrong');
    }
  };
};

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  payload: { event },
});

export const deleteEvent = id => ({
  type: DELETE_EVENT,
  payload: { id },
});

export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENTS, payload: { events } });
      dispatch(asyncActionFinish());
    } catch (err) {
      console.log(err);
      dispatch(asyncActionError());
    }
  };
};

/*
  SELECTOR
*/

export const getEvents = createStructuredSelector({
  events: state => state.events.list,
  loading: state => state.async.loading,
});
