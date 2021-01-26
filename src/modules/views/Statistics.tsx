import { Box, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { getAppSettings } from '../../redux/appSettings/actions';
import { getMobilitiesForStats } from '../../redux/mobility/actions';
import DepartmentCharts from '../components/charts/Department';
import SchoolYearCharts from '../components/charts/SchoolYear';
import TimeCharts from '../components/charts/Time';
import TotalCharts from '../components/charts/Total';
import TypeCharts from '../components/charts/Type';
import Typography from '../components/Typography';
import HomeHeaderLayout from './homePage/HomeHeaderLayout';

const useStyles = makeStyles((theme) => ({
  title: {
      marginBottom: theme.spacing(6),
      marginTop: theme.spacing(4),
      margin: 'auto'
  },
 
}));

const mapState = (state: RootState) => {
  return {
      mobilityData: state.mobility,
      settingsData: state.appSettings
  }
}

const mapDispatch = (dispatch:any) => {
  return {
      getMobilitiesForStats: () => dispatch(getMobilitiesForStats()),
      getAppSettings: () => dispatch(getAppSettings())
  }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function StatisticsView(props : Props) {
  const classes = useStyles();
  const  {t} = useTranslation('statistics');


  useEffect(()=> {
    props.getMobilitiesForStats()
    props.getAppSettings()
  }, [])

  return (
    <React.Fragment>
      <HomeHeaderLayout>
      <Box display="flex">
        <Box m="auto">
          <Typography variant="h2" color="inherit" gutterBottom marked="center" align="center" className={classes.title}>
            {t("STATISTICS")}
        </Typography>
        </Box>
      </Box>
      <TotalCharts/>

      </HomeHeaderLayout>
      <DepartmentCharts />
      <Grid container spacing={3}>
        <Grid item md={6}>
          <SchoolYearCharts />
        </Grid>
        <Grid item md={6}>
          <TypeCharts />
        </Grid>
      </Grid>
      <TimeCharts />

    </React.Fragment>
  );
}

export default connector(StatisticsView);
