import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { updateProfile, profileSelector } from 'modules/user';

import RadioInput from 'components/form/RadioInput';
import TextArea from 'components/form/TextArea';
import SelectInput from 'components/form/SelectInput';
import TextInput from 'components/form/TextInput';
import PlaceInput from 'components/form/PlaceInput';

const interests = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

const validationSchema = Yup.object().shape({
  status: Yup.string().required('The status is required'),
  about: Yup.string()
    .required('Required')
    .nullable(),
  interests: Yup.array().required('The interests is required'),
  occupation: Yup.string().required('The occupation is required'),
  origin: Yup.string().required('The origin is required'),
});

const About = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(profileSelector);

  const form = {
    status: profile.status || '',
    about: profile.about || '',
    interests: profile.interests || [],
    occupation: profile.occupation || '',
    origin: profile.origin || '',
  };

  if (profile.isEmpty) {
    return null;
  }

  return (
    <Segment>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile to get the most out of this site</p>
      <Formik
        initialValues={{ ...form }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          dispatch(updateProfile({ ...values }));
          actions.setSubmitting(false);
        }}>
        {props => (
          <Form autoComplete="off" onSubmit={props.handleSubmit}>
            <Form.Group inline>
              <label>Tell us your status: </label>
              <RadioInput
                id="status1"
                name="status"
                type="radio"
                value="single"
                label="Single"
              />
              <RadioInput
                id="status2"
                name="status"
                type="radio"
                value="relationship"
                label="Relationship"
              />
              <RadioInput
                id="status3"
                name="status"
                type="radio"
                value="married"
                label="Married"
              />
            </Form.Group>
            <Divider />
            <label>Tell us about yourself</label>
            <TextArea name="about" placeholder="About Me" />
            <SelectInput
              name="interests"
              label="Interests"
              options={interests}
              placeholder="Select your interests"
              multiple
            />
            <TextInput
              width={8}
              label="Occupation"
              name="occupation"
              type="text"
              placeholder="Occupation"
            />
            <PlaceInput
              width={8}
              label="Origin"
              name="origin"
              options={{ types: ['(regions)'] }}
              placeholder="Country of Origin"
            />
            <Divider />
            <Button
              disabled={!props.isValid || props.isSubmitting}
              size="large"
              positive
              content="Update Profile"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default About;
