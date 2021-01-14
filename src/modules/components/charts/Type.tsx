import { Checkbox, FormControlLabel, FormGroup, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { RootState } from '../../../redux';
import Typography from '../Typography';

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
  form: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    margin: 'auto'
  },
  checkBox: {
    margin: 'auto'
  }
}));



const mapState = (state: RootState) => {
  return {
      mobilityData: state.mobility,
      settingsData: state.appSettings
  }
}

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux


function TypeCharts(props : Props) {
  const classes = useStyles();


  const [data, setData] = React.useState([{}]);

  interface Years {
    [unit: string]: boolean
  }
  const [years , setYears] = React.useState<Years>({})
  const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];

  useEffect(()=> {
    if(props.settingsData.success && props.mobilityData.success) {
      colectYears();
    }
  }, [props.settingsData.success, props.mobilityData.success])

  useEffect(()=> {
    if(props.settingsData.success && props.mobilityData.success) {
      if(Object.keys(years).length>0){
        collectData();
      }
    }
  }, [props.settingsData.success, props.mobilityData.success, years])


  const collectData = () => {
    const data = [
      { name: 'Stage', value: calculCarbone('INTERNSHIP') },
      { name: 'Semestre', value: calculCarbone('SEMESTER') },
      { name: 'Double diplôme', value: calculCarbone('DOUBLE_DEGRE') },
    ];
    setData(data);
  }

  const colectYears = () => {     
    const years = props.settingsData.appSettings.allYear;
    years.forEach((year: number) => {
      setYears((prevState)=> ({...prevState, [year.toString()]: true}))
    })
  }


  function calculCarbone(type: string) : number{
    var sum = 0;
    props.mobilityData.mobilites.forEach((mobility:any) => {
      if(mobility.type===type && getKeyValue(years)(mobility.startDate.substring(0, 4))){
        mobility.travels.forEach((travel:any) => {
          travel.steps.forEach( (step:any) => {
            sum=sum+step.carboneEmission;
          })
        })
      }
    });
    return sum;
  }

  const handleYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYears((prevState) => ({...prevState, [event.target.name]: event.target.checked }));
  };
  

  return (props.settingsData.success && props.mobilityData.success)?(
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

    <FormGroup className={classes.form}>
      {Object.keys(years).map((row:any) => (
          <FormControlLabel className={classes.checkBox} control={<Checkbox  onChange={e => handleYear(e)} checked={getKeyValue(years)(row)?true:false} name={row}/>} label={row} />
      ))}
    </FormGroup>
    
    </React.Fragment>

  ):(
    <div>Loading</div>
  )
}
export default connector(TypeCharts);
