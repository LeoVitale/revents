import React, { useState } from 'react';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import EventDetailMap from 'features/event/EventDetail/EventDetailMap';

const EventDetailInfo = ({ event }) => {
  const [isMapOpen, setShowMapToggle] = useState(false);
  const { description, date, venue, venueCord } = event;

  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            {date && (
              <span>
                {format(date.toDate(), 'EEEE do LLL')} at{' '}
                {format(date.toDate(), 'h:mm a')}
              </span>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              color="teal"
              size="tiny"
              content={isMapOpen ? 'Hide Map' : 'Show Map'}
              onClick={() => setShowMapToggle(!isMapOpen)}
            />
          </Grid.Column>
        </Grid>
      </Segment>
      {isMapOpen && <EventDetailMap {...venueCord} />}
    </Segment.Group>
  );
};

export default EventDetailInfo;
