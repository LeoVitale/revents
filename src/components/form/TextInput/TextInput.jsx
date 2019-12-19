import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import { useField } from 'formik';

const TextInput = props => {
  const [field, meta] = useField(props);
  return (
    <Form.Field error={meta?.touched && !!meta?.error}>
      <Form.Input {...field} {...props} />
      {meta?.touched && meta?.error && (
        <Label basic color="red">
          {meta?.error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
