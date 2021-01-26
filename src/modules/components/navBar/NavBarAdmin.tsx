import React from 'react';
import { AppBarProps, WithStyles } from '@material-ui/core';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from './AppBar';
import SignInOutButton from './SignInOutButton';
import Toolbar, { styles as toolbarStyles } from '../Toolbar';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
  title: {
    fontSize: 24,
    color: theme.palette.common.white,
    textDecoration: 'none',
    textTransform: 'uppercase'
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
    textDecoration: 'none',
    textTransform: 'uppercase'
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
              className={classes.title}
              to='/home'
            >
              Retourner sur MOBILAN
            </Link>
            <div className={classes.center} />
            <Link
              className={classes.rightLink}
              to='/admin/export-data'
            >
              Exporter les données
            </Link>
            <Link
                className={classes.rightLink}
                to='/admin/list'
            >
              Gestion des admins
            </Link>
            <Link
                className={classes.rightLink}
                to='/admin/departments'
            >
              Gestion des sections
            </Link>
            <div className={classes.right}>
              <SignInOutButton classesName={classes.rightLink} classes={classes} label="admin"/>
            </div>
          </Toolbar>
        </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

export default withStyles(styles)(NavBarAdmin);
