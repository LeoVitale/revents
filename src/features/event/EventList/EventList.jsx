import React from 'react';
import EventListItem from 'features/event/EventList/EventListItem';

const EventList = ({ events, selectEvent }) => {
  return (
    <>
      {events &&
        events.map(event => (
          <EventListItem
            key={event.id}
            event={event}
            selectEvent={selectEvent}
          />
        ))}
    </>
  );
};

export default EventList;
