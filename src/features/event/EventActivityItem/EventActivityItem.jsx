import React from 'react';
import { Feed } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

const EventActivityItem = ({ activity }) => {
  const renderSummary = act => {
    switch (act.type) {
      case 'newEvent':
        return (
          <div>
            New Event!{' '}
            <Feed.User as={Link} to={{ pathname: '/profile/' + act.hostUid }}>
              {act.hostedBy}
            </Feed.User>{' '}
            is hosting{' '}
            <Link to={{ pathname: '/event/' + act.eventId }}>{act.title}</Link>
          </div>
        );
      case 'cancelledEvent':
        return (
          <div>
            Event Cancelled!{' '}
            <Feed.User as={Link} to={{ pathname: '/profile/' + act.hostUid }}>
              {act.hostedBy}
            </Feed.User>{' '}
            has cancelled{' '}
            <Link to={{ pathname: '/event/' + act.eventId }}>{act.title}</Link>
          </div>
        );
      default:
    }
    return null;
  };

  return (
    <Feed.Event>
      <Feed.Label>
        <img src={activity.photoURL || '/assets/user.png'} alt="" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>{renderSummary(activity)}</Feed.Summary>
        <Feed.Meta>
          <Feed.Date>
            {formatDistance(
              activity.timestamp && activity.timestamp.toDate(),
              Date.now(),
            )}{' '}
            ago
          </Feed.Date>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

export default EventActivityItem;
