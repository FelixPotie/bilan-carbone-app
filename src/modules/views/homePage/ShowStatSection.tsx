import React from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button';
import Typography from '../../components/Typography';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(15),
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      backgroundColor: theme.palette.secondary.light,
    },
    title: {
      fontSize: theme.typography.h4.fontSize,
      margin: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(2),
      borderRadius: "10px"

    },
  });

function HowItWorks(props: WithStyles<typeof styles>) {
  const { classes } = props;
  const { t } = useTranslation('homePage');

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <Typography
          variant="h4"
          marked="left"
          className={classes.title}
          component="h4"
        >
          {t("STAT_TEXT")}
        </Typography>
        <Link
        to="/statistics"
        className={classes.button}>
          <Button
            color="secondary"
            size="large"
            variant="contained"
            className={classes.button}
            component="a"
            // onClick={() => history.push("/statistics")}
          >
            {t("STAT")}
          </Button>
        </Link>
      </div>
    </section>
  );
}
export default withStyles(styles)(HowItWorks);
