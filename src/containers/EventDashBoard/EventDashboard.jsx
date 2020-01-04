import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import Loading from 'components/layout/Loading';
import EventActivity from 'features/event/EventActivity';
import EventList from 'features/event/EventList';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';

const EventDashboard = () => {
  useFirestoreConnect('events');

  const { events } = useSelector(state => state.firestore.ordered);

  if (!isLoaded(events)) {
    return <Loading />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventActivity />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
