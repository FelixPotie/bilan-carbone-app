import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Button from '../../components/Button';
import Typography from '../../components/Typography';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      backgroundColor: theme.palette.secondary.light,
      paddingLeft: '24px',
      paddingRight: '24px'
    },
    container: {
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(15),
    },
    title: {
      fontSize: theme.typography.h4.fontSize
    },
    button: {

    },
  });

function HowItWorks(props: WithStyles<typeof styles>) {
  const { classes } = props;
  const  {t} = useTranslation('homePage');

  return (
    <section className={classes.root}>
      <Grid container justify="center" spacing={2} alignItems="center"  className={classes.container}>
        <Grid item xs={12} md={9} >
          <Typography
            variant="h4"
            marked="left"
            className={classes.title}
            component="h2"
          >
            {t("STAT_TEXT")}
        </Typography>
        </Grid>
        <Grid item xs={12} md={3} >
          <Button
            color="secondary"
            size="large"
            variant="contained"
            className={classes.button}
            component="a"
            href="/statistics"
          >
            {t("STAT")}
        </Button>
        </Grid>
      </Grid>
    </section>
  );
}
export default withStyles(styles)(HowItWorks);
