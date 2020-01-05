import React, { useMemo } from 'react';
import { Grid } from 'semantic-ui-react';

import { useSelector } from 'react-redux';
import { eventsSelector } from 'modules/events';
import { getAuth } from 'modules/auth';
import { useParams } from 'react-router-dom';
import { useFirestoreConnect } from 'react-redux-firebase';

import { objectToArray } from 'app/util/helpers';

import EventDetailHeader from 'features/event/EventDetail/EventDetailHeader';
import EventDetailInfo from 'features/event/EventDetail/EventDetailInfo';
import EventDetailChat from 'features/event/EventDetail/EventDetailChat';
import EventDetailSideBar from 'features/event/EventDetail/EventDetailSideBar';

const EventDetail = () => {
  const { id } = useParams();
  const { event } = useSelector(eventsSelector);
  const { auth } = useSelector(getAuth);

  const eventQuery = useMemo(
    () => ({
      collection: 'events',
      doc: id,
      storeAs: 'event',
    }),
    [id],
  );

  useFirestoreConnect(eventQuery);

  if (!event) {
    return null;
  }

  const isHost = event.hostUid === auth.uid;
  const attendees = event.attendees && objectToArray(event.attendees);
  const isGoing = attendees && attendees.some(a => a.id === auth.uid);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader
          event={{ ...event, id }}
          isGoing={isGoing}
          isHost={isHost}
        />
        <EventDetailInfo event={event} />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSideBar attendees={attendees} />
      </Grid.Column>
    </Grid>
  );
};

export default EventDetail;
