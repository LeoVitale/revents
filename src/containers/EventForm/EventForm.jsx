/* global google */

import React, { useState, useMemo } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  eventsSelector,
  updateEvent,
  createEvent,
  cancelToggle,
} from 'modules/events';
import TextInput from 'components/form/TextInput';
import TextArea from 'components/form/TextArea';
import DateInput from 'components/form/DateInput';
import SelectInput from 'components/form/SelectInput';
import PlaceInput from 'components/form/PlaceInput';

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
  date: Yup.string()
    .required('Required')
    .nullable(),
});

const EventForm = () => {
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();
  const [cityLatLng, setCityLatLng] = useState({});
  const [venueCord, setVenueCord] = useState({});

  const { event } = useSelector(eventsSelector);
  const eventQuery = useMemo(
    () => ({
      collection: 'events',
      doc: id,
      storeAs: 'event',
    }),
    [id],
  );

  useFirestoreConnect(eventQuery);

  if (id && !event) {
    return null;
  }

  const eventState =
    id && event
      ? { ...event, id }
      : {
          title: '',
          category: '',
          description: '',
          city: '',
          date: '',
          venue: '',
          hostedBy: '',
        };

  const onFormSubmit = async (values, actions) => {
    values.venueCord =
      values.venueCord && Object.entries(values.venueCord).length !== 0
        ? values.venueCord
        : venueCord;
    try {
      if (values.id) {
        await dispatch(updateEvent(values));
        history.goBack();
      } else {
        const createdEvent = await dispatch(createEvent(values));
        history.push(`/events/${createdEvent.id}`);
      }
      actions.resetForm();
    } catch (error) {
      console.log(error);
    }
    actions.setSubmitting(false);
  };

  const onCitySelect = city => {
    geocodeByAddress(city)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        setCityLatLng(latLng);
      })
      .catch(error => console.error('Error', error));
  };

  const onVenueSelect = city => {
    geocodeByAddress(city)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        setVenueCord(latLng);
      })
      .catch(error => console.error('Error', error));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment>
          <Header sub color="teal" content="Event Details" />
          <Formik
            enableReinitialize
            initialValues={{ ...eventState }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              onFormSubmit(values, actions);
            }}>
            {props => (
              <Form autoComplete="off" onSubmit={props.handleSubmit}>
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
                <PlaceInput
                  name="city"
                  type="text"
                  label="Event City"
                  onSelect={onCitySelect}
                  options={{ types: ['(cities)'] }}
                />
                <PlaceInput
                  name="venue"
                  type="text"
                  label="Venue"
                  onSelect={onVenueSelect}
                  options={{
                    location: new google.maps.LatLng(cityLatLng),
                    radius: 1000,
                    types: ['establishment'],
                  }}
                />
                <DateInput
                  name="date"
                  dateFormat="dd LLL yyyy h:mm a"
                  label="Event date"
                  showTimeSelect
                  timeFormat="HH:mm"
                  type="text"
                />
                <Button positive type="submit" disabled={!props.isValid}>
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
                <Button
                  type="button"
                  color={eventState.cancelled ? 'green' : 'red'}
                  floated="right"
                  content={
                    eventState.cancelled ? 'Reactivate event' : 'Cancel event'
                  }
                  onClick={() =>
                    dispatch(cancelToggle(!eventState.cancelled, id))
                  }
                />
              </Form>
            )}
          </Formik>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default EventForm;
