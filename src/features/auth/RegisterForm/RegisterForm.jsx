import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Form, Button, Label, Divider } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser, getAuth } from 'modules/auth';
import TextInput from 'components/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required('Known As is required'),
  email: Yup.string()
    .required('The email is required')
    .email('The email is invalid'),
  password: Yup.string().required('The password is required'),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector(getAuth);

  const form = {
    displayName: '',
    email: '',
    password: '',
  };

  return (
    <Segment>
      <Formik
        initialValues={{ ...form }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          dispatch(registerUser(values));
        }}>
        {props => (
          <Form error size="large" onSubmit={props.handleSubmit}>
            <TextInput name="displayName" type="text" label="Known As" />
            <TextInput name="email" type="text" label="Email" />
            <TextInput name="password" type="password" label="Password" />
            {error && (
              <Label basic color="red">
                {error}
              </Label>
            )}
            <Button type="submit" fluid size="large" color="teal">
              Register
            </Button>
            <Divider horizontal>Or</Divider>
            <SocialLogin />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default RegisterForm;
