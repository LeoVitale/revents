import React from 'react';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import EventListAttendee from 'features/event/EventList/EventListAttendee';

const EventListitem = ({ event, deleteEvent }) => {
  const {
    hostPhotoURL,
    hostedBy,
    title,
    date,
    venue,
    description,
    attendees,
  } = event;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={hostPhotoURL} />
            <Item.Content>
              <Item.Header as="a">{title}</Item.Header>
              <Item.Description>
                Hosted by <a href="/">{hostedBy}</a>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(new Date(date), 'EEEE do LLL')} at{' '}
          {format(new Date(date), 'h:mm a')} |
          <Icon name="marker" /> {venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {attendees?.map(attendee => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{description}</span>
        <Button
          as="a"
          color="red"
          floated="right"
          content="Delete"
          onClick={deleteEvent(event)}
        />
        <Button
          as={Link}
          to={`/events/${event.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
};

export default EventListitem;
