import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Loader } from 'semantic-ui-react';
import Loading from 'components/layout/Loading';
import EventActivity from 'features/event/EventActivity';
import EventList from 'features/event/EventList';
import { eventsSelector, getPagedEvents } from 'modules/events';

const EventDashboard = () => {
  const dispatch = useDispatch();
  const [loadingInitial, setLoadingInitial] = useState(true);
  const { events, loading, moreEvents } = useSelector(eventsSelector);

  useEffect(() => {
    const getEvents = async () => {
      await dispatch(getPagedEvents());
    };
    if (events.length === 0 && !loading) {
      getEvents().then(() => {
        setLoadingInitial(false);
      });
    } else {
      setLoadingInitial(false);
    }
  }, [dispatch, events, loading]);

  const handleGetNextEvents = async () => {
    await dispatch(getPagedEvents());
  };

  if (loadingInitial) {
    return <Loading />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          loading={loading}
          moreEvents={moreEvents}
          getNextEvents={handleGetNextEvents}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventActivity />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loading} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
