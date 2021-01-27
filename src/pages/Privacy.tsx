import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '../modules/components/Typography';
import withRoot from '../modules/withRoot';
import Auth from '../modules/components/Auth';

function Privacy() {
  return (
    <React.Fragment>
      <Auth/>
      <Container>
        <Box>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Privacy
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default withRoot(Privacy);
