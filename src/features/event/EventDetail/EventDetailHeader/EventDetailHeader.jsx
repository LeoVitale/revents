import React from 'react';
import { useDispatch } from 'react-redux';
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { goingToEvent, cancelGoingToEvent } from 'modules/user';

const eventImageStyle = {
  filter: 'brightness(30%)',
};

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

const EventDetailHeader = ({ event, isGoing, isHost }) => {
  const dispatch = useDispatch();

  const { category, title, date, hostedBy, id } = event;

  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={title}
                  style={{ color: 'white' }}
                />
                <p>
                  {date && (
                    <span>
                      {format(date.toDate(), 'EEEE do LLL')} at{' '}
                      {format(date.toDate(), 'h:mm a')}
                    </span>
                  )}
                </p>
                <p>
                  Hosted by{' '}
                  <strong>
                    <Link
                      style={{ color: 'white' }}
                      to={`/profile/${event.hostUid}`}>
                      {hostedBy}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom" clearing>
        {!isHost && (
          <>
            {isGoing ? (
              <Button onClick={() => dispatch(cancelGoingToEvent(event))}>
                Cancel My Place
              </Button>
            ) : (
              <Button
                color="teal"
                onClick={() => dispatch(goingToEvent(event))}>
                JOIN THIS EVENT
              </Button>
            )}
          </>
        )}

        {isHost && (
          <Button as={Link} to={`/manage/${id}`} color="orange" floated="right">
            Manage Event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default EventDetailHeader;
