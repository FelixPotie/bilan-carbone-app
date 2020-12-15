import React from 'react';
import clsx from 'clsx';
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.common.white,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('sm')]: {
        height: '80vh',
        minHeight: 500,
        maxHeight: 1300,
      },
    },
    container: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(14),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    backdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.5,
      zIndex: -1,
    },
    background: {
      backgroundImage: 'linear-gradient(to bottom, #004978, #056095, #0979b3, #0892d1, #00adef)',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      zIndex: -2,
    },
    arrowDown: {
      position: 'absolute',
      bottom: theme.spacing(4),
    },
  });


function HomeHeaderLayout(
  props: WithStyles<typeof styles> &
    React.HTMLAttributes<HTMLDivElement>) {
  const { children, classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {children}
        <div className={classes.backdrop} />
        <div className={clsx(classes.background)} />
      </Container>
    </section>
  );
}

export default withStyles(styles)(HomeHeaderLayout);
