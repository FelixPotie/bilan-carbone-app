import React from 'react';
import clsx from 'clsx';
import { AppBarProps, useScrollTrigger, WithStyles } from '@material-ui/core';
import { withStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import AppBar from '../components/AppBar';
import SignInOutButton from '../components/SignInOutButton';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';

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



function NavBar(props: WithStyles<typeof styles> & AppBarProps) {
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
              href="/home"
            >
              {'Bilan Carbone des mobilités'}
            </Link>

            <div className={classes.center} />
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              href="/home"
            >
              {'Accueil'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              className={clsx(classes.rightLink, classes.linkSecondary)}
              href="/simulation"
            >
              {'Simuler'}
            </Link>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              className={classes.rightLink}
              href="statistics"
            >
              {'Statistiques'}
            </Link>
            <div className={classes.right}>
              <SignInOutButton classes={classes}/>
            </div>
          </Toolbar>
        </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

export default withStyles(styles)(NavBar);
