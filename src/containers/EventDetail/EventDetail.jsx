import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventDetailHeader from 'features/event/EventDetail/EventDetailHeader';
import EventDetailInfo from 'features/event/EventDetail/EventDetailInfo';
import EventDetailChat from 'features/event/EventDetail/EventDetailChat';
import EventDetailSideBar from 'features/event/EventDetail/EventDetailSideBar';
import { useSelector } from 'react-redux';
import { getEvents } from 'modules/events';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();
  const events = useSelector(getEvents);
  const event = id && events.length > 0 && events.find(e => e.id === id);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSideBar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetail;
