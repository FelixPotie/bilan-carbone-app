import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import Typography from '../Typography';

const data = [
  {
    name: '2018', carbon: 4000,
  },
  {
    name: '2019', carbon: 3000,
  },
  {
    name: '2020', carbon: 2000,
  },
  {
    name: '2021', carbon: 2780,
  }
];

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
    width: 550,
    height: 300
  },
}));


function TimeCharts(){
  const classes = useStyles();


    return (
      <React.Fragment>
        <Grid container spacing={3}>
        <Grid item md={6}>
            <Typography variant="h4" gutterBottom marked="center" align="center" className={classes.title}>
              Evolution des émissions carbones au fil du temps
            </Typography>
            <Typography variant="h5" gutterBottom marked="center" align="center" className={classes.title}>
              Au fur et à mesure des années, les émissions carbones de Polytech Montpellier liées aux mobilités internationnales ont elles tendances à diminuer ?
            </Typography>
          </Grid>
          <Grid item md={6}>
            <div className={classes.graph}>
              <ResponsiveContainer>
                <AreaChart
                  data={data}
                  margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="carbon" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Grid>
          
        </Grid>
      </React.Fragment>

    );
}
export default TimeCharts;