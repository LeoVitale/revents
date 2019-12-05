import React, { useState } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

const EventForm = ({ cancelFormOpen, onCreateEvent }) => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: '',
  });

  const handleInputChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleCreateEvent = () => {
    onCreateEvent(form);
    setForm({
      title: '',
      date: '',
      city: '',
      venue: '',
      hostedBy: '',
    });
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
        <Button type="button" onClick={cancelFormOpen}>
          Cancel
        </Button>
      </Form>
    </Segment>
  );
};

export default EventForm;
