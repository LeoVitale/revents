import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useField, useFormikContext } from 'formik';

const DateInput = ({ placeholder, label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const { touched, error } = meta;

  return (
    <Form.Field error={touched && !!error}>
      <label htmlFor={field.name}>{label}</label>
      <DatePicker
        {...field}
        {...props}
        placeholderText={placeholder}
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setFieldValue(field.name, val);
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

export default DateInput;
