import { createStructuredSelector } from 'reselect';
import { toastr } from 'react-redux-toastr';
import { fetchSampleData } from 'app/data/mockApi';
import { createNewEvent, objectToArray } from 'app/util/helpers';
import { createReducer } from '../utils/reducer';
import { asyncActionStart, asyncActionFinish, asyncActionError } from './async';

const FETCH_EVENTS = 'events/FETCH_EVENTS';
const MORE_EVENTS = 'events/MORE_EVENTS';

const initialState = {
  list: [],
  moreEvents: true,
};

/*
  REDUCERS
*/

const fetchEventsReducer = (state, payload) => {
  return {
    ...state,
    list: [...state.list, ...payload.events],
  };
};

export const moreEventsReducer = state => {
  return {
    ...state,
    moreEvents: false,
  };
};

export default createReducer(initialState, {
  [FETCH_EVENTS]: fetchEventsReducer,
  [MORE_EVENTS]: moreEventsReducer,
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

export const getPagedEvents = () => async (
  dispatch,
  getState,
  { getFirestore },
) => {
  const firestore = getFirestore();
  dispatch(asyncActionStart());
  const LIMIT = 2;
  let nextEventSnapshot = null;
  const {
    firestore: {
      data: { events: items },
    },
  } = getState();
  if (items && Object.keys(items).length >= LIMIT) {
    const itemsArray = objectToArray(items);
    nextEventSnapshot = await firestore
      .collection('events')
      .doc(itemsArray[itemsArray.length - 1].id)
      .get();
  }

  const querySnap = await firestore.get({
    collection: 'events',
    limit: LIMIT,
    where: ['date', '>=', new Date()],
    orderBy: ['date'],
    startAfter: nextEventSnapshot,
  });

  const events = querySnap.docs.map(snap => ({ ...snap.data(), id: snap.id }));

  if (querySnap.docs.length < LIMIT) {
    dispatch({ type: MORE_EVENTS });
  }

  if (events.length > 0) {
    dispatch({ type: FETCH_EVENTS, payload: { events } });
  }

  dispatch(asyncActionFinish());
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

export const eventsSelector = createStructuredSelector({
  events: state => state.events.list || [],
  moreEvents: state => state.events.moreEvents,
  event: state => state.firestore.data.event,
  loading: state => state.async.loading,
});
