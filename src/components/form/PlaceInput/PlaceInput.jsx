import React from 'react';
import PlacesAutoComplete from 'react-places-autocomplete';
import { Form, Label, Segment, List } from 'semantic-ui-react';
import { useField, useFormikContext } from 'formik';

const PlaceInput = ({ placeholder, options, label, onSelect, ...props }) => {
  const [field, meta] = useField(props);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const { onBlur } = field;

  const onChangePlaces = value => {
    setFieldValue(field.name, value, true);
    setFieldTouched(field.name);
  };

  const onSelectPlaces = value => {
    setFieldValue(field.name, value, true);
    setFieldTouched(field.name);
    onSelect(value);
  };

  return (
    <PlacesAutoComplete
      {...field}
      searchOptions={options}
      onChange={onChangePlaces}
      onSelect={onSelectPlaces}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Form.Field
          style={{
            position: 'relative',
          }}>
          <Form.Input
            type="text"
            label={label}
            placeholder={placeholder}
            {...getInputProps({ placeholder, onBlur })}
          />
          {meta?.touched && meta?.error && (
            <Label basic color="red">
              {meta?.error}
            </Label>
          )}
          {suggestions.length > 0 && (
            <Segment
              style={{
                marginTop: 0,
                position: 'absolute',
                zIndex: 1000,
                width: '100%',
                top: '64px',
              }}>
              {loading && <div>Loading...</div>}
              <List selection>
                {suggestions.map(suggestion => (
                  <List.Item {...getSuggestionItemProps(suggestion)}>
                    <List.Header>
                      {suggestion.formattedSuggestion.mainText}
                    </List.Header>
                    <List.Description>
                      {suggestion.formattedSuggestion.secondaryText}
                    </List.Description>
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
        </Form.Field>
      )}
    </PlacesAutoComplete>
  );
};

export default PlaceInput;
