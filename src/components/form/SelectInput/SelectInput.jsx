import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import { useField, useFormikContext } from 'formik';

const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const { touched, error } = meta;

  return (
    <Form.Field error={touched && !!error}>
      <label htmlFor={field.name}>{label}</label>
      <Form.Select
        {...field}
        {...props}
        onChange={(e, { name, value }) => {
          setFieldTouched(name, true, true);
          setFieldValue(name, value, true);
        }}
        onBlur={(e, { name, value }) => {
          setFieldTouched(name, true, true);
          setFieldValue(name, value, true);
        }}
      />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default SelectInput;
