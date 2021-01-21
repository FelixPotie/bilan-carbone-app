import React from 'react';
import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '../../components/Typography';
import Button from '../../components/Button';
import { Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const styles = (theme: Theme) =>
  createStyles({
    textBloc: {
      marginLeft: '2%', 
      marginRight:'2%'
    },
    title: {
      fontSize: theme.typography.h4.fontSize,
    },
    text: {
      marginTop: '5%',
    },
    grid:{
      marginTop: '5%'
    },
    gif: {
      maxHeight: 500,
      maxWidth: '100%',
      height: 'auto'
    },
    root: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(4),
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom:theme.spacing(2)
    },
  });

function ProductCategories(props: WithStyles<typeof styles>) {
  const { classes } = props;

  const { t } = useTranslation('homePage');

  return (
    <Container className={classes.root} component="section">
      <Grid container className={classes.grid} spacing={2} direction="row" justify="center" >
        <Grid item xs={12} md={4} className={classes.textBloc}>
          <Typography variant="h3" marked="left" className={classes.title}>
          {t('ADEME_COLABORATION')}
          </Typography>
          <div className={classes.item}>
            <Typography className={classes.text}  >
              {t('ADEME_TEXT_PART1')} <a href="https://ecolab.ademe.fr/">Ecolab</a>
            </Typography>
          </div>
          <div >
            <Button
              color="secondary"
              size="large"
              variant="contained"
              component="a"
              href="/ecolab"
              style={{margin: '5% 0% 5% 0%'}}
            >
              {t('ADEME_SIMULATOR')}
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={7}>
          <div
            className={classes.item}
          >
            <img
              className={classes.gif}
              src="/assets/img/homePage/ademe_ecolab3.gif"
              alt=""
            />
          </div>
        </Grid>
      </Grid>



    </Container>
  );
}

export default withStyles(styles)(ProductCategories);
