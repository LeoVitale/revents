import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import cuid from 'cuid';

import EventList from 'features/event/EventList';
import EventForm from 'features/event/EventForm';

import { addNewItem, getList } from 'modules/app';

const eventsMock = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
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
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
      },
    ],
  },
];

const EventDashboard = () => {
  const [events, setEvents] = useState(eventsMock);
  const [isOpen, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dispatch = useDispatch();
  const list = useSelector(getList);

  console.log('===============list=====================');
  console.log(list);
  console.log('====================================');

  const onCreateFormOpen = () => {
    setSelectedEvent(null);
    setOpen(true);
  };

  const onFormCancel = () => {
    setOpen(false);
  };

  const onCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    setEvents([...events, newEvent]);
  };

  const onSelectEvent = event => () => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const onUpdateEvent = updatedEvent => {
    const newEvents = events.map(event => {
      if (event.id === updatedEvent.id) {
        return { ...updatedEvent };
      }
      return event;
    });
    setEvents(newEvents);
  };

  const onDeleteEvent = deletedEvent => () => {
    const newEvents = events.filter(event => event.id !== deletedEvent.id);
    setEvents(newEvents);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          events={events}
          selectEvent={onSelectEvent}
          deleteEvent={onDeleteEvent}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <Button
          positive
          content="Add New Item"
          onClick={() => dispatch(addNewItem())}
        />

        <Button positive content="Create Event" onClick={onCreateFormOpen} />
        {isOpen && (
          <EventForm
            key={selectedEvent ? selectedEvent.id : 0}
            updateEvent={onUpdateEvent}
            selectedEvent={selectedEvent}
            cancelFormOpen={onFormCancel}
            createEvent={onCreateEvent}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
