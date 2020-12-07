import React from 'react';
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://steamuserimages-a.akamaihd.net/ugc/956336538496054615/AEF72FC419F4E49F1127F64DF6CC93BC3DDB16EE/';

const styles = (theme: Theme) =>
  createStyles({
    background: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundColor: '#7fc7d9', // Average color of the background image.
      backgroundPosition: 'center',
    },
    button: {
      minWidth: 200,
    },
    h5: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(10),
      },
    },
    more: {
      marginTop: theme.spacing(2),
    },
  });

function ProductHero(props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      {/* Increase the network loading priority of the background image. */}
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Simuler votre trajet
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
        Entrer sur notre simulateur pour découvrir l'empreinte carbone de votre trajet
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/premium-themes/onepirate/sign-up/"
      >
        Lancer la simulation
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}

export default withStyles(styles)(ProductHero);
