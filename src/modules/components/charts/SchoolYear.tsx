import { Checkbox, CircularProgress, FormControlLabel, FormGroup, makeStyles, Switch } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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


function SchoolYearCharts(props: Props) {
  const classes = useStyles();
  const  {t} = useTranslation('statistics');

  const [data, setData] = React.useState([{}]);

  interface Years {
    [unit: string]: boolean
  }
  const [years , setYears] = React.useState<Years>({});
  const [perTraject , setPerTraject] = React.useState(false);

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
  }, [props.settingsData.success, props.mobilityData.success, years, perTraject])


  const collectData = () => {
    const data = [
      { name: '3A', value: calculCarbone(3) },
      { name: '4A', value: calculCarbone(4) },
      { name: '5A', value: calculCarbone(5) },
    ]; 
    setData(data);
  }

  const colectYears = () => {     
    const years = props.settingsData.appSettings.allYear.sort();
    years.forEach((year: number) => {
      setYears((prevState)=> ({...prevState, [year.toString()]: true}))
    })
  }


  function calculCarbone(year: number) : number{
    var sum = 0;
    var nbTraject=0;
    props.mobilityData.mobilitiesStats.forEach((mobility:any) => {
      if(+mobility.year===year && getKeyValue(years)(mobility.startDate.substring(0, 4))){
        mobility.travels.forEach((travel:any) => {
          travel.steps.forEach( (step:any) => {
            sum=sum+step.carboneEmission;
          })
          nbTraject++;
        })
      }
    });
    if(perTraject) return sum/nbTraject;
    return sum;
  }

  const handleYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYears((prevState) => ({...prevState, [event.target.name]: event.target.checked }));
  };

  const handlePerTraject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerTraject(()=> (event.target.checked));
  };


  const displayData = () => {
    if(props.settingsData.success && props.mobilityData.success){
      return (
        <div>
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
          <FormControlLabel className={classes.checkBox} control={<Switch onChange={e => handlePerTraject(e)} checked={perTraject}/>} label={t("PER_TRAJECT")} />
          {Object.keys(years).map((row:any) => (
              <FormControlLabel className={classes.checkBox} control={<Checkbox  onChange={e => handleYear(e)} checked={getKeyValue(years)(row)?true:false} name={row}/>} label={row} />
          ))}
        </FormGroup>
        </div>
      )
    }else{
      return(
        <CircularProgress disableShrink />
      )
    }
  }
  
  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom marked="center" align="center" className={classes.title}>
          {t("SCHOOL_YEAR")} ?
      </Typography>
       {displayData()}
    </React.Fragment>
  );
}
export default connector(SchoolYearCharts);
