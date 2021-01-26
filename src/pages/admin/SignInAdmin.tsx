import React from 'react';
import withRoot from '../../modules/withRoot';
import SignInContainer from '../../modules/views/SignIn';
import Auth from '../../modules/components/Auth';


function SignIn() {

  return (
    <div>
      <Auth label="admin"/>
      <SignInContainer label="admin"/>
    </div>
    
  );
}

export default withRoot(SignIn);
