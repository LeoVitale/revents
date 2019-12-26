import React from 'react';
import { Segment, Form, Button, Label, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { login, getAuth, socialLogin } from 'modules/auth';

import TextInput from 'components/form/TextInput';
import SocialLogin from '../SocialLogin';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('The email is required'),
  password: Yup.string().required('The password is required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(getAuth);

  const form = {
    email: '',
    password: '',
  };

  const onFormSubmit = (values, actions) => {
    dispatch(login(values));
  };

  const onSocialLogin = selectedProvider => {
    dispatch(socialLogin(selectedProvider));
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
            <TextInput name="password" type="password" label="Password" />
            {error && (
              <Label basic color="red">
                {error}
              </Label>
            )}
            <Button type="submit" fluid size="large" color="teal">
              Login
            </Button>
            <Divider horizontal>Or</Divider>
            <SocialLogin onSocialLogin={onSocialLogin} />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default LoginForm;
