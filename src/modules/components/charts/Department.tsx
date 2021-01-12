import { Container, Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import Typography from '../Typography';

const data = [
    {
      name: 'IG', carbon: 4000,
    },
    {
      name: 'GBA', carbon: 3000,
    },
    {
      name: 'STE', carbon: 2000,
    },
    {
      name: 'MEA', carbon: 2780,
    },
    {
      name: 'MAT', carbon: 1890,
    },
    {
      name: 'MI', carbon: 2390,
    },
    {
      name: 'SE', carbon: 3490,
    },
    {
      name: 'EGC', carbon: 2490,
    },
    {
      name: 'DO', carbon: 1490,
    },
    {
      name: 'MSI', carbon: 3090,
    },
  ]

const useStyles = makeStyles((theme) => ({
  title: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      width: '90%',
      margin: 'auto'
  },
  graph: {
    margin: 'auto',
    marginTop :theme.spacing(2),
  },
}));


function DepartmentCharts() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Typography variant="h4" gutterBottom marked="center" align="center" className={classes.title}>
              Quel départments émettent le moins ?
            </Typography>
            <Typography variant="h5" gutterBottom marked="center" align="center" className={classes.title}>
              Lors de l'année en cours, quels sont les département ayant dégagés le moins d'émission de CO2 lors de leurs trajets lié aux mobilitées internationnales ?
            </Typography>
          </Grid>

          <Grid item md={6}>
            <BarChart
              width={550}
              height={300}
              data={data}
              className={classes.graph}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="carbon" barSize={20} fill="#8884d8" />
            </BarChart>
          </Grid>

        </Grid>
        
                
    </React.Fragment>
  )
}

export default DepartmentCharts;
