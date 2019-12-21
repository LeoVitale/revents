import React from 'react';
import { Menu, Button } from 'semantic-ui-react';

const SignedOut = ({ signIn, register }) => {
  return (
    <Menu.Item position="right">
      <Button basic inverted content="Login" onClick={signIn} />
      <Button
        basic
        inverted
        style={{ marginLeft: '0.5em' }}
        content="Register"
        onClick={register}
      />
    </Menu.Item>
  );
};

export default SignedOut;
