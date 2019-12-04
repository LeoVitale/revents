import React from 'react';
import { hot } from 'react-hot-loader/root';

import EventDashboard from 'features/event/EventDashBoard';
import NavBar from 'features/nav/NavBar';
import { Container } from 'semantic-ui-react';

const App = () => {
  return (
    <>
      <NavBar />
      <Container className="main">
        <EventDashboard />
      </Container>
    </>
  );
};

export default hot(App);
