import { Checkbox, CircularProgress, FormControlLabel, FormGroup, makeStyles, Mark, Slider, Switch } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import {
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { RootState } from '../../../redux';
import Typography from '../Typography';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#BBBBBB'];

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
      marginTop: theme.spacing(4),
      width: '90%',
      margin: 'auto',
      // height:110
  },
  graph: {
    margin: 'auto',
  },
  form: {
    display: 'flex',
    marginTop:theme.spacing(1),
    width: '90%',
    flexDirection: 'row',
    margin: 'auto'
  },
  checkBox: {
    margin: 'auto'
  },
  slider: {
    width: "80%",
    margin: "auto"
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
  const  {t} = useTranslation('statistics');


  const [data, setData] = React.useState([{}]);
  const [perTraject , setPerTraject] = React.useState(false);
  const [min, setMin] = React.useState<number>();
  const [max, setMax] = React.useState<number>();
  const [years, setYears] = React.useState<number[]>([2018, 2021]);
  const [marks, setMarks] = React.useState<Mark[]>([]);

  const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];

  useEffect(()=> {
    if(props.settingsData.success && props.mobilityData.success) {
      colectYears();
    }
  }, [props.settingsData.success, props.mobilityData.success])

  useEffect(()=> {
    if(props.settingsData.success && props.mobilityData.success) {
      collectData();
    }
  }, [props.settingsData.success, props.mobilityData.success, years, perTraject])


  const collectData = () => {
    const data = [
      { name: 'Stage', value: calculCarbone('INTERNSHIP') },
      { name: 'Semestre', value: calculCarbone('SEMESTER') },
      { name: 'Double diplôme', value: calculCarbone('DOUBLE_DEGRE') },
      {name: 'Autre', value: calculCarbone('OTHER')}
    ];
    setData(data);
  }

  const colectYears = () => {     
    const years: number[]= props.settingsData.appSettings.allYear.sort();
    setMin(years[0]);
    setMax(years[years.length-1]);
    setYears([years[0],years[years.length-1]]);
    const list:Mark[] = [];
    years.forEach((year: number) => {
      list.push({value: year, label: year.toString()})
    })
    setMarks(list);
  }


  function calculCarbone(type: string) : number{
    var sum = 0;
    var nbTraject=0;
    props.mobilityData.mobilitiesStats.forEach((mobility:any) => {
      const date = Number(mobility.startDate.substring(0, 4));
      if(mobility.type===type && date>=years[0] && date<=years[1]){
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

  const handleYear = (event: any, newValue: number | number[]) => {
    setYears(newValue as number[]);
  };

  const handlePerTraject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerTraject(()=> (event.target.checked));
  };
  
  const displayData = () => {
    if(props.settingsData.success && props.mobilityData.success){
      return (
        <div>
          <PieChart width={300} height={270} className={classes.graph}>
            <Legend width={300} height={21}/>

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
            <Slider 
              min={min}
              max={max}
              onChange={handleYear}
              value={years} 
              marks={marks}
              className={classes.slider}
            />
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
      <Typography variant="h4" gutterBottom marked="left" align="center" className={classes.title}>
          {t("TYPE")} ?
      </Typography>
      {displayData()}
    </React.Fragment>
  )
}
export default connector(TypeCharts);
