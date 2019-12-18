import React from 'react';
import { Grid } from 'semantic-ui-react';
import SettingsNav from 'features/nav/SettingsNav';
import { Route, Switch, Redirect } from 'react-router-dom';
import Basic from 'containers/settings/Basic';
import About from 'containers/settings/About';
import Photos from 'containers/settings/Photos';
import Account from 'containers/settings/Account';

const SettingsDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect
            exact
            from="/settings"
            to="/settings/basic"
            component={Basic}
          />
          <Route path="/settings/basic" component={Basic} />
          <Route path="/settings/about" component={About} />
          <Route path="/settings/photos" component={Photos} />
          <Route path="/settings/account" component={Account} />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

export default SettingsDashboard;
