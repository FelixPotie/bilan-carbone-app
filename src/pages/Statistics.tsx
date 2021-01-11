import React from 'react';
import withRoot from '../modules/withRoot';
import DepartmentCharts from '../modules/components/charts/Department';
import SchoolYearCharts from '../modules/components/charts/SchoolYear';
import TypeCharts from '../modules/components/charts/Type';
import TimeCharts from '../modules/components/charts/Time';
import Typography from '../modules/components/Typography';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      width: '90%',
      margin: 'auto'
  },
 
}));

function Statistics() {
  const classes = useStyles();

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

export default withRoot(Statistics);
