import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import { getEvents, deleteEvent } from 'modules/events';
import Loading from 'components/layout/Loading';
import EventActivity from 'features/event/EventActivity';
import EventList from 'features/event/EventList';
import { useFirestoreConnect } from 'react-redux-firebase';

const EventDashboard = () => {
  useFirestoreConnect('events');
  const dispatch = useDispatch();
  const { loading } = useSelector(getEvents);

  const { events } = useSelector(state => state.firestore.ordered);

  const onDeleteEvent = ({ id }) => () => {
    dispatch(deleteEvent(id));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} deleteEvent={onDeleteEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventActivity />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
