import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addYears } from 'date-fns';
import { Segment, Form, Header, Divider, Button } from 'semantic-ui-react';

import { updateProfile, profileSelector } from 'modules/user';

import TextInput from 'components/form/TextInput';
import DateInput from 'components/form/DateInput';
import PlaceInput from 'components/form/PlaceInput';
import RadioInput from 'components/form/RadioInput';

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required('The Display Name is required'),
  dateOfBirth: Yup.string()
    .required('Required')
    .nullable(),
  gender: Yup.string().required('The gender is required'),
  city: Yup.string().required('The city is required'),
});

const Basic = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(profileSelector);

  const form = {
    displayName: profile.displayName || '',
    dateOfBirth: (profile.dateOfBirth && profile.dateOfBirth.toDate()) || '',
    gender: profile.gender || '',
    city: profile.city || '',
  };

  if (profile.isEmpty) {
    return null;
  }

  return (
    <Segment>
      <Header dividing size="large" content="Basic" />
      <Formik
        initialValues={{ ...form }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          dispatch(updateProfile({ ...values }));
          actions.setSubmitting(false);
        }}>
        {props => (
          <Form autoComplete="off" onSubmit={props.handleSubmit}>
            <TextInput
              width={8}
              name="displayName"
              type="text"
              placeholder="Known As"
              label="Known As"
            />
            <Form.Group inline>
              <label>Gender: </label>
              <RadioInput
                id="gender1"
                type="radio"
                name="gender"
                label="Male"
                value="male"
              />
              <RadioInput
                id="gender2"
                type="radio"
                name="gender"
                label="Female"
                value="female"
              />
            </Form.Group>

            <DateInput
              width={8}
              name="dateOfBirth"
              placeholder="Date of Birth"
              dateFormat="dd LLL yyyy"
              maxDate={addYears(new Date(), -18)}
              label="Date of Birth"
              dropdownMode="select"
              showYearDropdown
              showMonthDropdown
            />
            <PlaceInput
              name="city"
              placeholder="Home Town"
              options={{ types: ['(cities)'] }}
              label="Home Town"
              width={8}
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

export default Basic;
