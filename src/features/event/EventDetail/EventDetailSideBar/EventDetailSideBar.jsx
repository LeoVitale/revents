import React from 'react';
import { Segment, Item, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const EventDetailSideBar = ({ attendees }) => {
  const isHost = false;

  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: 'none' }}
        attached="top"
        secondary
        inverted
        color="teal">
        <span>
          {attendees?.length} {attendees?.length === 1 ? 'Person' : 'People'}{' '}
          Going
        </span>
      </Segment>
      <Segment attached>
        {attendees &&
          attendees.map(attendee => (
            <Item.Group key={attendee.id} divided>
              <Item style={{ position: 'relative' }}>
                {isHost && (
                  <Label
                    style={{ position: 'absolute' }}
                    color="orange"
                    ribbon="right">
                    Host
                  </Label>
                )}
                <Item.Image size="tiny" src={attendee.photoURL} />
                <Item.Content verticalAlign="middle">
                  <Item.Header as="h3">
                    <Link to={`/profile/${attendee.id}`}>
                      {attendee.displayName}
                    </Link>
                  </Item.Header>
                </Item.Content>
              </Item>
            </Item.Group>
          ))}
      </Segment>
    </>
  );
};

export default EventDetailSideBar;
