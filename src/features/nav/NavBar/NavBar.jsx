import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from 'modules/modal';
import { getAuth, logOut } from 'modules/auth';

import SignedOut from 'features/nav/Menus/SignedOut';
import SignedIn from 'features/nav/Menus/SignedIn';
import { useFirebase } from 'react-redux-firebase';

const NavBar = () => {
  const dispatch = useDispatch();
  const { auth, profile } = useSelector(getAuth);
  const history = useHistory();
  const { logout } = useFirebase();
  const { isLoaded, isEmpty, displayName } = auth;
  const { photoURL } = profile;
  const authenticated = isLoaded && !isEmpty;

  const onSignIn = () => {
    dispatch(openModal('LoginModal'));
  };

  const onRegister = () => {
    dispatch(openModal('RegisterModal'));
  };

  const onSignOut = () => {
    dispatch(logOut());
    logout();
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
        {authenticated && (
          <>
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
          </>
        )}

        {authenticated ? (
          <SignedIn signOut={onSignOut} {...{ displayName, photoURL }} />
        ) : (
          <SignedOut signIn={onSignIn} register={onRegister} />
        )}
      </Container>
    </Menu>
  );
};

export default NavBar;
