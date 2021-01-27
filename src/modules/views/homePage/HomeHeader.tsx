import { makeStyles } from '@material-ui/core/styles';
import Button from '../../components/Button';
import Typography from '../../components/Typography';
import HomeHeaderLayout from './HomeHeaderLayout';
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core';
import { RootState } from '../../../redux';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 200,
    color: 'white',
    fontWeight: 900,//theme.typography.fontWeightRegular,
    fontSize: 20,
    margin: theme.spacing(1),
    textAlign: "center",
    width: '100%'
  },
  buttons: {
    marginTop: theme.spacing(2),
    maxWidth: 550

  },
  onebutton: {
    marginTop: theme.spacing(2),
    maxWidth: 275
  },
  subtitle: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
    },
  },
  h5: {
    marginTop: theme.spacing(2)
  },
  more: {
    marginTop: theme.spacing(2),
  },
  item: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  link: {
    textDecoration: "none"
  }
}));

const mapState = (state: RootState) => {
  return {
    user: state.user,
  }
}


const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function HomeHeader(props: Props) {
  const classes = useStyles();

  const history = useHistory();

  const { t } = useTranslation('homePage');

  const displayButtons = () => {
    if (props.user.isLoggedIn) {
      return (
        <Grid container spacing={1} className={classes.onebutton}>
          <Grid item md={12} className={classes.item}>
            <Link
              to="/mobilites"
              className={classes.link}>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                className={classes.button}
                component="a"
              >
                {t("MOBILITY")}
              </Button>
            </Link>
          </Grid>
        </Grid>

      )
    } else {
      return (
        <Grid container spacing={1} className={classes.buttons}>
          <Grid item md={6} className={classes.item}>
            <Link
              to="/signin"
              className={classes.link}>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                className={classes.button}
                component="a"
                // onClick={() => history.push("/signin")}
              >
                {t("SIGNIN")}
              </Button>
            </Link>
          </Grid>
          <Grid item md={6} className={classes.item}>
          <Link
              to="/simulation"
              className={classes.link}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              className={classes.button}
              component="a"
              // onClick={() => history.push("/simulation")}
            >
              {t("LAUNCH_SIMULATION")}
            </Button>
            </Link>
          </Grid>
        </Grid>
      )
    }
  }

  const displaySubtitles = () => {
    if (props.user.isLoggedIn) {
      return (
        <div className={classes.subtitle}>
          <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
            {t("ADD_MOBILITY")}
          </Typography>
        </div>
      )
    } else {
      return (
        <div className={classes.subtitle}>
          <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
            {t("LOGGIN")}
          </Typography>
          <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
            {t("SIMULATE")}
          </Typography>
        </div>
      )
    }
  }

  return (
    <HomeHeaderLayout >
      {/* Increase the network loading priority of the background image. */}
      <Typography color="inherit" align="center" variant="h2" marked="center">
        {t("SIMULATE_YOUR_JOURNEY")}
      </Typography>
      {displaySubtitles()}

      {displayButtons()}


    </HomeHeaderLayout>
  );
}

export default connector(HomeHeader);
