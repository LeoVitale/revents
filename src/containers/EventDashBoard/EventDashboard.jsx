import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from 'features/event/EventList';
import { getEvents, deleteEvent } from 'modules/events';

const EventDashboard = () => {
  const dispatch = useDispatch();
  const events = useSelector(getEvents);

  const onDeleteEvent = ({ id }) => () => {
    dispatch(deleteEvent(id));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} deleteEvent={onDeleteEvent} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity Feed</h2>
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
