import React from 'react';
import { AppBarProps, WithStyles } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from './AppBar';
import SignInOutButton from '../SignInOutButton';
import Toolbar, { styles as toolbarStyles } from '../Toolbar';

const styles = (theme: Theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 0,
    display: 'flex',
    justifyContent: 'flex-start'
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    // color: theme.palette.secondary.main,
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  }
});



function NavBarAdmin(props: WithStyles<typeof styles> & AppBarProps) {
  const { classes } = props;

  return (
    <div>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <div className={classes.left} />
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              className={classes.title}
            >
              {'Bilan Carbone des mobilités'}
            </Link>

            <div className={classes.center} />
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
            >
              {'Admin'}
            </Link>
            <div className={classes.right}>
              <SignInOutButton className={classes.rightLink} classes={classes} label="admin"/>
            </div>
          </Toolbar>
        </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

export default withStyles(styles)(NavBarAdmin);
