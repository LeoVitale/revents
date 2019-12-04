import React from 'react';
import EventListItem from 'features/event/EventList/EventListItem';

const EventList = ({ events }) => {
  return (
    <>
      {events.map(event => (
        <EventListItem key={event.id} event={event} />
      ))}
    </>
  );
};

export default EventList;
