import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import { useField } from 'formik';

const TextInput = ({ width, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Field error={meta?.touched && !!meta?.error} width={width}>
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
