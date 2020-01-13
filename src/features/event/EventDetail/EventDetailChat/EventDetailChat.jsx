import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Segment, Header, Comment } from 'semantic-ui-react';
import { useFirebaseConnect, isEmpty } from 'react-redux-firebase';
import { formatDistance } from 'date-fns';

import EventDetailChatForm from 'features/event/EventDetail/EventDetailChatForm';

import { eventChatSelector } from 'modules/events';
import { Link } from 'react-router-dom';
import { createDataTree } from 'app/util/helpers';

const EventDetailChat = ({ eventId }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [selectedCommentId, setSelectedComment] = useState(null);
  useFirebaseConnect(`event_chat/${eventId}`);
  const { chat } = useSelector(eventChatSelector(eventId));
  const eventChat = !isEmpty(chat) && createDataTree(chat);

  console.log(eventChat);

  const handleCloseReplyForm = () => {
    setShowReplyForm(false);
    setSelectedComment(null);
  };

  const handleOpenReplyForm = id => () => {
    setShowReplyForm(true);
    setSelectedComment(id);
  };

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: 'none' }}>
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          {eventChat &&
            eventChat.map(comment => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(comment.date, Date.now())} ago</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action onClick={handleOpenReplyForm(comment.id)}>
                      Reply
                    </Comment.Action>
                    {showReplyForm && selectedCommentId === comment.id && (
                      <EventDetailChatForm
                        eventId={eventId}
                        closeForm={handleCloseReplyForm}
                        parentId={comment.id}
                      />
                    )}
                  </Comment.Actions>
                </Comment.Content>
                {comment.childNodes &&
                  comment.childNodes.map(child => (
                    <Comment.Group key={child.id}>
                      <Comment>
                        <Comment.Avatar
                          src={child.photoURL || '/assets/user.png'}
                        />
                        <Comment.Content>
                          <Comment.Author
                            as={Link}
                            to={`/profile/${child.uid}`}>
                            {child.displayName}
                          </Comment.Author>
                          <Comment.Metadata>
                            <div>
                              {formatDistance(child.date, Date.now())} ago
                            </div>
                          </Comment.Metadata>
                          <Comment.Text>{child.text}</Comment.Text>
                          <Comment.Actions>
                            <Comment.Action
                              onClick={handleOpenReplyForm(child.id)}>
                              Reply
                            </Comment.Action>
                            {showReplyForm &&
                              selectedCommentId === child.id && (
                                <EventDetailChatForm
                                  eventId={eventId}
                                  closeForm={handleCloseReplyForm}
                                  parentId={child.parentId}
                                />
                              )}
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>
                    </Comment.Group>
                  ))}
              </Comment>
            ))}
        </Comment.Group>
        <EventDetailChatForm parentId={0} eventId={eventId} />
      </Segment>
    </>
  );
};

export default EventDetailChat;
