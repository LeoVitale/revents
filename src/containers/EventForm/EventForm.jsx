import React, { useState, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents, updateEvent, createEvent } from 'modules/events';
import cuid from 'cuid';

const cleanForm = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: '',
};

const EventForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const events = useSelector(getEvents);
  const dispatch = useDispatch();

  const selectedEvent =
    id && events.length > 0 && events.find(e => e.id === id);

  const [form, setForm] = useState(cleanForm);

  useEffect(() => {
    setForm(selectedEvent ? { ...selectedEvent } : cleanForm);
  }, [selectedEvent]);

  const handleInputChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleCreateEvent = () => {
    if (form.id) {
      dispatch(updateEvent(form));
      history.goBack();
    } else {
      form.id = cuid();
      form.hostPhotoURL = '/assets/user.png';
      dispatch(createEvent(form));
      history.push('/events');
    }
    setForm(cleanForm);
  };

  return (
    <Segment>
      <Form>
        <Form.Field>
          <label htmlFor="title">
            Event Title
            <input
              id="title"
              name="title"
              placeholder="First Name"
              value={form.title}
              onChange={handleInputChange}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="date">
            Event Date
            <input
              id="date"
              name="date"
              type="date"
              placeholder="Event Date"
              value={form.date}
              onChange={handleInputChange}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="city">
            City
            <input
              id="city"
              name="city"
              placeholder="City event is taking place"
              value={form.city}
              onChange={handleInputChange}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="venue">
            Venue
            <input
              id="venue"
              name="venue"
              placeholder="Enter the Venue of the event"
              value={form.venue}
              onChange={handleInputChange}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label htmlFor="hostedBy">
            Hosted By
            <input
              id="hostedBy"
              name="hostedBy"
              placeholder="Enter the name of person hosting"
              value={form.hostedBy}
              onChange={handleInputChange}
            />
          </label>
        </Form.Field>
        <Button positive type="submit" onClick={handleCreateEvent}>
          Submit
        </Button>
        <Button type="button" onClick={() => history.push('/events')}>
          Cancel
        </Button>
      </Form>
    </Segment>
  );
};

export default EventForm;
