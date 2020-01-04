import { createStructuredSelector } from 'reselect';
import { toastr } from 'react-redux-toastr';
import { fetchSampleData } from 'app/data/mockApi';
import { createNewEvent } from 'app/util/helpers';
import { createReducer } from '../utils/reducer';
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async';

const FETCH_EVENTS = 'events/FETCH_EVENTS';

const initialState = {
  list: [],
};

/*
  REDUCERS
*/

const fetchEventsReducer = (state, payload) => {
  return {
    ...state,
    list: payload.events,
  };
};

export default createReducer(initialState, {
  [FETCH_EVENTS]: fetchEventsReducer,
});

/*
  ACTIONS CREATORS
*/

export const createEvent = event => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const { photoURL } = getState().firebase.profile;
    const newEvent = createNewEvent(user, photoURL, event);
    try {
      const createdEvent = await firestore.add('events', newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true,
      });
      toastr.success('Success!', 'Event has been created');
      return createdEvent;
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
    return null;
  };
};

export const updateEvent = event => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`events/${event.id}`, event);
      toastr.success('Success!', 'Event has been updated');
    } catch (error) {
      toastr.error('Oops', 'Something went wrong');
    }
    return null;
  };
};

export const cancelToggle = (cancelled, eventId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const message = cancelled
      ? 'Are you sure you want to cancel the event?'
      : 'This will reactivate the event, are you sure?';
    try {
      toastr.confirm(message, {
        onOk: async () =>
          firestore.update(`events/${eventId}`, {
            cancelled,
          }),
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadMockEvents = () => {
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
  events: state => state.firestore.ordered.events,
  event: state => state.firestore.data.event,
  loading: state => state.async.loading,
});
