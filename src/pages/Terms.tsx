import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '../modules/components/Typography';
import withRoot from '../modules/withRoot';

function Terms() {
  return (
    <React.Fragment>
      <Container>
        <Box >
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Terms
          </Typography>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default withRoot(Terms);
