import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import TextInput from 'components/form/TextInput';

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required('Known As is required'),
  email: Yup.string()
    .required('The email is required')
    .email('The email is invalid'),
  password: Yup.string().required('The password is required'),
});

const RegisterForm = () => {
  const form = {
    email: '',
    password: '',
  };

  const onFormSubmit = (values, actions) => {};

  return (
    <Segment>
      <Formik
        initialValues={{ ...form }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          onFormSubmit(values, actions);
        }}>
        {props => (
          <Form error size="large" onSubmit={props.handleSubmit}>
            <TextInput name="displayName" type="text" label="Known As" />
            <TextInput name="email" type="text" label="Email" />
            <TextInput name="password" type="password" label="Password" />

            <Button type="submit" fluid size="large" color="teal">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default RegisterForm;
