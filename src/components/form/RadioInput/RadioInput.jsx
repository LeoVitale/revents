import React from 'react';
import { Form, Radio, Label } from 'semantic-ui-react';
import { useField } from 'formik';

const RadioInput = ({ label, width, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Form.Field error={meta?.touched && !!meta?.error} width={width}>
      <Radio {...field} {...props} label={label} />
      {meta?.touched && meta?.error && (
        <Label basic color="red">
          {meta?.error}
        </Label>
      )}
    </Form.Field>
  );
};

export default RadioInput;
