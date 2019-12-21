import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Container } from 'semantic-ui-react';
import { Switch, Route, useLocation } from 'react-router-dom';
import NavBar from 'features/nav/NavBar';
import ModalManager from 'features/modals/ModalManager';

import Home from 'containers/Home';
import EventDashboard from 'containers/EventDashBoard';
import EventDetail from 'containers/EventDetail';
import PeopleDashboard from 'containers/PeopleDashboard';
import UserDetail from 'containers/UserDetail';
import SettingsDashboard from 'containers/settings/SettingsDashboard';
import EventForm from 'containers/EventForm';

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <ModalManager />
      <Route exact path="/" component={Home} />
      <Route
        path="/(.+)"
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Switch>
                <Route exact path="/events" component={EventDashboard} />
                <Route path="/events/:id" component={EventDetail} />
                <Route path="/people" component={PeopleDashboard} />
                <Route path="/profile/:id" component={UserDetail} />
                <Route path="/settings" component={SettingsDashboard} />
                <Route
                  path={['/createEvent', '/manage/:id']}
                  component={EventForm}
                />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default hot(App);
