import { createSelector } from 'reselect';
import { createReducer } from '../utils/reducer';

const CREATE_EVENT = 'events/CREATE_EVENT';
const UPDATE_EVENT = 'events/UPDATE_EVENT';
const DELETE_EVENT = 'events/DELETE_EVENT';

const initialState = {
  list: [
    {
      id: '1',
      title: 'Trip to Empire State building',
      date: '2018-03-21',
      category: 'culture',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
      city: 'NY, USA',
      venue: 'Empire State Building, 5th Avenue, New York, NY, USA',
      venueCord: {
        lat: 40.7484405,
        lng: -73.98566440000002,
      },
      hostedBy: 'Bob',
      hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      attendees: [
        {
          id: 'a',
          name: 'Bob',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        },
        {
          id: 'b',
          name: 'Tom',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
        },
      ],
    },
    {
      id: '2',
      title: 'Trip to Punch and Judy Pub',
      date: '2018-03-18',
      category: 'drinks',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
      city: 'London, UK',
      venue: 'Punch & Judy, Henrietta Street, London, UK',
      venueCord: {
        lat: 51.5118074,
        lng: -0.12300089999996544,
      },
      hostedBy: 'Tom',
      hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      attendees: [
        {
          id: 'a',
          name: 'Bob',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        },
        {
          id: 'b',
          name: 'Tom',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
        },
      ],
    },
  ],
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

export default createReducer(initialState, {
  [CREATE_EVENT]: createEventReducer,
  [UPDATE_EVENT]: updateEventReducer,
  [DELETE_EVENT]: deleteEventReducer,
});

/*
  ACTIONS CREATORS
*/

export const createEvent = event => ({
  type: CREATE_EVENT,
  payload: { event },
});

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  payload: { event },
});

export const deleteEvent = id => ({
  type: DELETE_EVENT,
  payload: { id },
});

/*
  SELECTOR
*/

export const getEvents = createSelector(
  state => state.events.list,
  events => events,
);
