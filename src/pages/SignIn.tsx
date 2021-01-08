import React from 'react';
import withRoot from '../modules/withRoot';
import SignInContainer from '../modules/views/SignIn';


function SignIn() {

  return (
    <SignInContainer/>
  );
}

export default withRoot(SignIn);
