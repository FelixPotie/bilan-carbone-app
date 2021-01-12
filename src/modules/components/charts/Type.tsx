import { makeStyles } from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { RootState } from '../../../redux';
import Typography from '../Typography';

const dataDemo = [
  { name: 'Stage', value: 700 },
  { name: 'Semestre', value: 200 },
  { name: 'Double diplôme', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (data : any) => {
   const radius = data.innerRadius + (data.outerRadius - data.innerRadius) * 0.5;
  const x = data.cx + radius * Math.cos(-data.midAngle * RADIAN);
  const y = data.cy + radius * Math.sin(-data.midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > data.cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(data.percent * 100).toFixed(0)}%`}
    </text>
  );
};

const useStyles = makeStyles((theme) => ({
  title: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(4),
      width: '90%',
      margin: 'auto'
  },
  graph: {
    margin: 'auto',
  },
}));



const mapState = (state: RootState) => {
  return {
      mobilityData: state.mobility
  }
}

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux


function TypeCharts(props : Props) {
  const classes = useStyles();


  function calculCarbone(type: string) : number{
    var sum = 0;
    props.mobilityData.mobilites.forEach((mobility:any) => {
      if(mobility.type===type){
        mobility.travels.forEach((travel:any) => {
          travel.steps.forEach( (step:any) => {
            sum=sum+step.carboneEmission;
          })
        })
      }
    });
    return sum;
  }
  const data = [
    { name: 'Stage', value: calculCarbone('INTERNSHIP') },
    { name: 'Semestre', value: calculCarbone('SEMESTER') },
    { name: 'Double diplôme', value: calculCarbone('DOUBLE_DEGREE') },
  ];

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom marked="center" align="center" className={classes.title}>
          Quel type de mobilité émet le moins ?
      </Typography>
      <PieChart width={300} height={270} className={classes.graph}>
      <Legend />

      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={115}
        fill="#8884d8"
        dataKey="value"
      >

        {
          data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>

    </PieChart>
    
    </React.Fragment>

  );
}
export default connector(TypeCharts);
