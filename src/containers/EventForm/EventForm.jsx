import React from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cuid from 'cuid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getEvents, updateEvent, createEvent } from 'modules/events';
import TextInput from 'components/form/TextInput';
import TextArea from 'components/form/TextArea';
import DateInput from 'components/form/DateInput';
import SelectInput from 'components/form/SelectInput';

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required('The event title is required'),
  category: Yup.string().required('The category  is required'),
  description: Yup.string()
    .required('Please enter the description')
    .min(4, 'Description needs to be at least 5 characters'),
  city: Yup.string().required('The city is required'),
  venue: Yup.string().required('The venue is required'),
  date: Yup.string().required('Required'),
});

const EventForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const events = useSelector(getEvents);
  const dispatch = useDispatch();

  const event =
    id && events.length > 0
      ? events.find(e => e.id === id)
      : {
          title: '',
          category: '',
          description: '',
          city: '',
          date: '',
          venue: '',
          hostedBy: '',
        };

  const onFormSubmit = (values, actions) => {
    if (values.id) {
      dispatch(updateEvent(values));
      history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
      };
      dispatch(createEvent(newEvent));
      history.push(`/events/${newEvent.id}`);
    }
    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment>
          <Header sub color="teal" content="Event Details" />
          <Formik
            key={event.id}
            initialValues={{ ...event }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              console.log(values);
              onFormSubmit(values, actions);
            }}>
            {props => (
              <Form autoComplete="off" onSubmit={props.handleSubmit}>
                {' '}
                <TextInput
                  name="title"
                  type="text"
                  label="Event Name"
                  placeholder="Give your event a name"
                />
                <SelectInput
                  name="category"
                  label="Category"
                  placeholder="Whats is your event about?"
                  options={category}
                />
                <TextArea
                  name="description"
                  type="text"
                  label="Description"
                  placeholder="Tell us about your event"
                  rows={4}
                />
                <Header sub color="teal" content="Event Location Details" />
                <TextInput name="city" type="text" label="Event City" />
                <DateInput
                  name="date"
                  dateFormat="dd LLL yyyy h:mm a"
                  label="Event date"
                  showTimeSelect
                  timeFormat="HH:mm"
                  type="text"
                />
                <TextInput name="venue" type="text" label="Venue" />
                <Button positive type="submit">
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    props.values.id
                      ? history.push(`/events/${props.values.id}`)
                      : history.push('/events')
                  }>
                  Cancel
                </Button>
              </Form>
            )}
          </Formik>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default EventForm;
