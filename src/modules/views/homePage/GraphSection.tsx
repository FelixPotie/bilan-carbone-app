import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../../components/Typography';
import { useTranslation } from 'react-i18next/';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: theme.palette.secondary.light,
    },
    container: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(6),
      display: 'flex',
      position: 'relative',
    },
    item: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',
      alignItems: 'center',
      marginTop:theme.spacing(2)
    },
    image: {
      maxHeight: 250,
      height: 'auto',
      maxWidth: 500,
    },
    imagePopo: {
      maxHeight: 250,
      height: 'auto',
      maxWidth: 500,
      width: "90%",
    },
    title: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(5),
      textAlign:'center'
    },
    text: {
      textAlign: "justify",
    },
    imageBox: {
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    },
  });

function ProductValues(props: WithStyles<typeof styles>) {
  const { classes } = props;
  const { t } = useTranslation('homePage');

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        
        <Grid container spacing={8}>
          <Grid container item direction="row">
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <img
                  className={classes.image}
                  src="mobilan.png"
                  alt="logo mobilan"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <Typography variant="h4" className={classes.title}>
                  MOBILAN
              </Typography>
                <Typography variant="h5" className={classes.text}>
                  {t('MOBILAN_TEXT')}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container item direction="row-reverse" >
            <Grid item xs={12} md={6}  className={classes.imageBox}>
              <div className={classes.item} >
                <img
                  className={classes.imagePopo}
                  src="polytech.png"
                  alt="logo polytech"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.item}>
                <Typography variant="h4" className={classes.title}>
                  POLYTECH MONTPELLIER
              </Typography>
                <Typography variant="h5" className={classes.text}>
                  {t('POLYTECH_TEXT')}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container item direction="row">
            <Grid item xs={12} md={6} className={classes.imageBox}>
              <div className={classes.item}>
                <img
                  className={classes.image}
                  src="ddrs.png"
                  alt=""
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} >
              <div className={classes.item}>
                <Typography variant="h4" className={classes.title}>
                  {'DD&RS'}
              </Typography>
                <Typography variant="h5" className={classes.text}>
                  {t("DDRS_TEXT")}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default withStyles(styles)(ProductValues);
