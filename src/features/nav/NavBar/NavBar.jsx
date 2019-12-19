import React, { useState } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import SignedOut from 'features/nav/Menus/SignedOut';
import SignedIn from 'features/nav/Menus/SignedIn';

const NavBar = () => {
  const [authenticated, setAuthenticanted] = useState(false);
  const history = useHistory();

  const onSignIn = () => setAuthenticanted(true);

  const onSignOut = () => {
    setAuthenticanted(false);
    history.push('/');
  };

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src="/assets/logo.png" alt="logo" />
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} exact to="/events" name="Events" />
        <Menu.Item as={NavLink} exact to="/people" name="People" />
        <Menu.Item>
          <Button
            as={Link}
            to="/createEvent"
            floated="right"
            positive
            inverted
            content="Create Event"
          />
        </Menu.Item>
        {authenticated ? (
          <SignedIn signOut={onSignOut} />
        ) : (
          <SignedOut signIn={onSignIn} />
        )}
      </Container>
    </Menu>
  );
};

export default NavBar;
