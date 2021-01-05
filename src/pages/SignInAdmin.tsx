import React from 'react';
import withRoot from '../modules/withRoot';
import SignInContainer from '../modules/components/SignIn';


function SignIn() {

  return (
    <SignInContainer label="admin"/>
  );
}

export default withRoot(SignIn);
