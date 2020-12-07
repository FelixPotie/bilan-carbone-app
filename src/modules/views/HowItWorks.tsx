import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: theme.palette.secondary.light,
      overflow: 'hidden',
    },
    container: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(15),
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(0, 5),
    },
    title: {
      marginBottom: theme.spacing(14),
    },
    number: {
      fontSize: 24,
      fontFamily: theme.typography.fontFamily,
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
    },
    image: {
      height: 55,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
    curvyLines: {
      pointerEvents: 'none',
      position: 'absolute',
      top: -180,
      opacity: 0.7,
    },
    button: {
      marginTop: theme.spacing(8),
    },
  });

function HowItWorks(props: WithStyles<typeof styles>) {
  const { classes } = props;
  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/onepirate/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          Comment ça marche ?
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <img
                  src="/static/themes/onepirate/productHowItWorks1.svg"
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  vous rentrez votre destination et votre mode transport.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <img
                  src="/static/themes/onepirate/productHowItWorks2.svg"
                  alt="graph"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Le simulateur calcul l'impact carbone du trajet.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <img
                  src="/static/themes/onepirate/productHowItWorks3.svg"
                  alt="clock"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">

                  L'école obtient des statistiques sur son empreinte carbone.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component="a"
          href="/premium-themes/onepirate/sign-up/"
        >
          Commencer
        </Button>
      </Container>
    </section>
  );
}
export default withStyles(styles)(HowItWorks);
