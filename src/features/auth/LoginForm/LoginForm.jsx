import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { login } from 'modules/auth';

import TextInput from 'components/form/TextInput';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('The email is required'),
  password: Yup.string().required('The password is required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const form = {
    email: '',
    password: '',
  };

  const onFormSubmit = (values, actions) => {
    dispatch(login(values));
  };

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
            <TextInput name="email" type="text" label="Email Address" />
            <TextInput name="password" type="text" label="Password" />

            <Button type="submit" fluid size="large" color="teal">
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default LoginForm;
