import {
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from '@material-ui/core/styles';
import Button from '../components/Button';
import Typography from '../components/Typography';
import HomeHeaderLayout from './HomeHeaderLayout';
import { useTranslation} from 'react-i18next'

const styles = (theme: Theme) =>
  createStyles({
    button: {
      minWidth: 200,
      color: 'white',
      fontWeight: 900,//theme.typography.fontWeightRegular,
      fontSize: 20
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

function HomeHeader(props: WithStyles<typeof styles>) {
  const { classes } = props;

  const  {t} = useTranslation('homePage');

  return (
    <HomeHeaderLayout >
      {/* Increase the network loading priority of the background image. */}
      <Typography color="inherit" align="center" variant="h2" marked="center">
       {t("SIMULATE_YOUR_JOURNEY")}
      </Typography>
      <Typography color="inherit" align="center" variant="h5" className={classes.h5}>
       {t("ENTER_SIMULATE_DESCIPTION")}
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component="a"
        href="/simulation"
      >
        {t("LAUNCH_SIMULATION")}
      </Button>
    </HomeHeaderLayout>
  );
}

export default withStyles(styles)(HomeHeader);
