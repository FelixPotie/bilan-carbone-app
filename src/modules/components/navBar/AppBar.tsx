import * as React from 'react';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import MuiAppBar, { AppBarProps } from '@material-ui/core/AppBar';
import { useScrollTrigger } from '@material-ui/core';

const styles = (theme: Theme) => ({
  root: {
    color: theme.palette.common.white,
    backgroundColor: '#004978'
  },
});

interface Props {
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    //backgroundColor: trigger? '#00adef' : '#004978',
  });
}

function AppBar(props: WithStyles<typeof styles> & AppBarProps) {

  
  return (
    <ElevationScroll {...props}>
      <MuiAppBar position="fixed" {...props} />
    </ElevationScroll>
  );
}

export default withStyles(styles)(AppBar);
