import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import NavBar from 'features/nav/NavBar';
import Home from 'containers/Home';
import EventDashboard from 'containers/EventDashBoard';
import EventDetail from 'containers/EventDetail';
import PeopleDashboard from 'containers/PeopleDashboard';
import UserDetail from 'containers/UserDetail';
import SettingsDashboard from 'containers/settings/SettingsDashboard';
import EventForm from 'features/event/EventForm';

const App = () => {
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Switch>
                <Route path="/events" component={EventDashboard} />
                <Route path="/events/:id" component={EventDetail} />
                <Route path="/people" component={PeopleDashboard} />
                <Route path="/profile/:id" component={UserDetail} />
                <Route path="/settings" component={SettingsDashboard} />
                <Route path="/createEvent" component={EventForm} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default hot(App);
