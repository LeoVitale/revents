import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useField, useFormikContext } from 'formik';

const DateInput = ({ placeholder, label, width, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const { touched, error } = meta;

  return (
    <Form.Field error={touched && !!error} width={width}>
      <label htmlFor={field.name}>{label}</label>
      <DatePicker
        {...field}
        {...props}
        placeholderText={placeholder}
        selected={
          field.value
            ? Object.prototype.toString.call(field.value) !== '[object Date]'
              ? field.value.toDate()
              : field.value
            : null
        }
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
