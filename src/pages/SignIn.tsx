import React from 'react';
import withRoot from '../modules/withRoot';
import SignInContainer from '../modules/components/SignIn';


function SignIn() {

  return (
    <SignInContainer/>
  );
}

export default withRoot(SignIn);
