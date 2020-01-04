import React from 'react';
import {
  Segment,
  Header,
  Form,
  Divider,
  Label,
  Button,
  Icon,
} from 'semantic-ui-react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { updatePassword, getAuth } from 'modules/auth';
import TextInput from 'components/form/TextInput';

const validationSchema = Yup.object({
  newPassword1: Yup.string().required('Password is required'),
  newPassword2: Yup.string()
    .oneOf([Yup.ref('newPassword1'), null], "Passwords don't match")
    .required('Password confirm is required'),
});

const Account = () => {
  const dispatch = useDispatch();
  const { error, auth } = useSelector(getAuth);

  const providerId = auth.providerData?.[0]?.providerId;

  const form = {
    newPassword1: '',
    newPassword2: '',
  };
  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {providerId === 'password' && (
        <div>
          <Header color="teal" sub content="Change password" />
          <p>Use this form to update your account settings</p>
          <Formik
            initialValues={{ ...form }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              dispatch(updatePassword(values));
              actions.resetForm();
            }}>
            {props => (
              <Form onSubmit={props.handleSubmit}>
                <TextInput
                  name="newPassword1"
                  type="password"
                  pointing="left"
                  placeholder="New Password"
                  inline
                />

                <TextInput
                  name="newPassword2"
                  type="password"
                  pointing="left"
                  placeholder="Confirm Password"
                  inline
                />
                {error && (
                  <Label basic color="red">
                    {error}
                  </Label>
                )}
                <Divider />
                <Button
                  disabled={!props.isValid || props.isSubmitting}
                  type="submit"
                  size="large"
                  positive
                  content="Update Password"
                />
              </Form>
            )}
          </Formik>
        </div>
      )}

      {providerId === 'facebook.com' && (
        <div>
          <Header color="teal" sub content="Facebook Account" />
          <p>Please visit Facebook to update your account settings</p>
          <Button type="button" color="facebook">
            <Icon name="facebook" />
            Go to Facebook
          </Button>
        </div>
      )}

      {providerId === 'google.com' && (
        <div>
          <Header color="teal" sub content="Google Account" />
          <p>Please visit Google to update your account settings</p>
          <Button type="button" color="google plus">
            <Icon name="google plus" />
            Go to Google
          </Button>
        </div>
      )}
    </Segment>
  );
};

export default Account;
