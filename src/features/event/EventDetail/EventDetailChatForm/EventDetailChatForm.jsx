import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import TextArea from 'components/form/TextArea';

import { addEventComment } from 'modules/events';

const EventDetailChatForm = ({ eventId, parentId, closeForm }) => {
  const validationSchema = Yup.object().shape({
    comment: Yup.string().required('The comment is required'),
  });
  const dispatch = useDispatch();
  const fields = {
    comment: '',
  };

  const onFormSubmit = values => {
    const { comment } = values;
    console.log(eventId, comment, parentId);

    dispatch(addEventComment(eventId, comment, parentId));
  };

  return (
    <Formik
      initialValues={{ ...fields }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        onFormSubmit(values);
        actions.resetForm();
        if (parentId !== 0) {
          closeForm();
        }
      }}>
      {props => (
        <Form reply onSubmit={props.handleSubmit}>
          <TextArea name="comment" type="text" rows={2} />
          <Button
            type="submit"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      )}
    </Formik>
  );
};

export default EventDetailChatForm;
