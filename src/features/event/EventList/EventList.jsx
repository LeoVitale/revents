import React from 'react';
import EventListItem from 'features/event/EventList/EventListItem';

const EventList = ({ events, selectEvent, deleteEvent }) => {
  return (
    <>
      {events &&
        events.map(event => (
          <EventListItem
            key={event.id}
            event={event}
            selectEvent={selectEvent}
            deleteEvent={deleteEvent}
          />
        ))}
    </>
  );
};

export default EventList;
