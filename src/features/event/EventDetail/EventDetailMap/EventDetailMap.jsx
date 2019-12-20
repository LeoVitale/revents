import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Segment, Icon } from 'semantic-ui-react';

const Marker = () => (
  <Icon name="map marker alternate" size="big" color="red" />
);

const EventDetailMap = ({ lat, lng }) => {
  return (
    <Segment
      attached="bottom"
      style={{ height: '300px', width: '100%', padding: 0 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={{ lat, lng }}
        defaultZoom={11}>
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </Segment>
  );
};

export default EventDetailMap;
