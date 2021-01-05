import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: theme.palette.secondary.light,
    },
    container: {
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(30),
      display: 'flex',
      position: 'relative',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0, 5),
    },
    image: {
      maxHeight: 300,
      height: 'auto',
      maxWidth: '100%'
    },
    title: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    curvyLines: {
      pointerEvents: 'none',
      position: 'absolute',
      top: -180,
    },
  });

function ProductValues(props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={10}>
          <Grid container item direction="row">
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <img
                  className={classes.image}
                  src="/assets/img/homePage/graphe1_t.png"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <Typography variant="h6" className={classes.title}>
                  New experiences
              </Typography>
                <Typography variant="h5">
                  {
                    'Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… '
                  }
                  {'your Sundays will not be alike.'}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container item direction="row-reverse" >
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <img
                  className={classes.image}
                  src="/assets/img/homePage/graphe2_t.png"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <Typography variant="h6" className={classes.title}>
                  New experiences
              </Typography>
                <Typography variant="h5">
                  {
                    'Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… '
                  }
                  {'your Sundays will not be alike.'}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container item direction="row">
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <img
                  className={classes.image}
                  src="/assets/img/homePage/graphe3_t.png"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <Typography variant="h6" className={classes.title}>
                  New experiences
              </Typography>
                <Typography variant="h5">
                  {
                    'Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… '
                  }
                  {'your Sundays will not be alike.'}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default withStyles(styles)(ProductValues);
