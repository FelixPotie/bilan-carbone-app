import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { getAppSettings } from '../../redux/appSettings/actions';
import { getMobilities } from '../../redux/mobility/actions';
import DepartmentCharts from '../components/charts/Department';
import SchoolYearCharts from '../components/charts/SchoolYear';
import TimeCharts from '../components/charts/Time';
import TypeCharts from '../components/charts/Type';
import Typography from '../components/Typography';

const useStyles = makeStyles((theme) => ({
  title: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      width: '90%',
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
      getMobilities: () => dispatch(getMobilities()),
      getAppSettings: () => dispatch(getAppSettings())
  }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function StatisticsView(props : Props) {
  const classes = useStyles();

  useEffect(()=> {
    props.getMobilities()
    props.getAppSettings()
  }, [])

  return (
    <React.Fragment>
      <Typography variant="h2" gutterBottom marked="center" align="center" className={classes.title}>
          Statistiques
       </Typography>
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
