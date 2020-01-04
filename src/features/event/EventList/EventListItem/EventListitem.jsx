import React from 'react';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import EventListAttendee from 'features/event/EventList/EventListAttendee';
import { objectToArray } from 'app/util/helpers';

const EventListitem = ({ event }) => {
  const {
    hostPhotoURL,
    hostedBy,
    title,
    date,
    venue,
    description,
    cancelled,
  } = event;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={hostPhotoURL} />
            <Item.Content>
              <Item.Header as={Link} to={`/events/${event.id}`}>
                {title}
              </Item.Header>
              <Item.Description>
                Hosted by{' '}
                <Link to={`/profile/${event.hostUid}`}>{hostedBy}</Link>
              </Item.Description>
              {cancelled && (
                <Label
                  style={{ top: '-40px' }}
                  ribbon="right"
                  color="red"
                  content="This event has been cancelled"
                />
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(date.toDate(), 'EEEE do LLL')} at{' '}
          {format(date.toDate(), 'h:mm a')} |
          <Icon name="marker" /> {venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {objectToArray(event.attendees).map((attendee, index) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{description}</span>
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
