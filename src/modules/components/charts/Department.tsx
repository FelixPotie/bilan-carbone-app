import { Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, makeStyles, Mark, Slider, Switch } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { RootState } from '../../../redux';
import Typography from '../Typography';


const mapState = (state: RootState) => {
  return {
      mobilityData: state.mobility,
      settingsData: state.appSettings
  }
}

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const useStyles = makeStyles((theme) => ({
  title: {
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(4),
      width: '90%',
      margin: 'auto'
  },
  graph: {
    margin: 'auto',
    marginTop :theme.spacing(3),
    width: '100%',
    height: 290
  },
  form: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    margin: 'auto'
  },
  checkBox: {
    margin: 'auto'
  },
  total: {
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(8),
  },
  chart: {
    marginLeft: '2.5%'
  },
  slider: {
    width: "80%",
    margin: "auto"
  }
}));


function DepartmentCharts(props: Props) {
  const classes = useStyles();
  const  {t} = useTranslation('statistics');

  const [data, setData] = React.useState([{}]);
  const [perTraject , setPerTraject] = React.useState(false);
  const [min, setMin] = React.useState<number>();
  const [max, setMax] = React.useState<number>();
  const [years, setYears] = React.useState<number[]>([2018, 2021]);
  const [marks, setMarks] = React.useState<Mark[]>([]);

  useEffect(()=> {
    if(props.settingsData.success && props.mobilityData.success) {
      collectYears();
    }
  }, [props.settingsData.success, props.mobilityData.success])
  
  useEffect(()=> {
    if(props.settingsData.success && props.mobilityData.success) {
      collectData();
    }
  }, [props.settingsData.success, props.mobilityData.success, years, perTraject])


  const collectData = () => {     
    const departments = props.settingsData.appSettings.department.sort((a:any,b:any)=>((a.status < b.status) ? 1 : ((b.status < a.status) ? -1 : 0)) || ((a.name > b.name) ? 1 :((b.name > a.name) ? -1 : 0)));
    const infos :{name:string, carbone: number}[]=[]
    departments.forEach((department: { [x: string]: string; }) => {
      infos.push({name:department.name, carbone: calculCarbone(department.name)})
    })
    setData(infos);
  }

  
  function calculCarbone(department: string) : number{
    var sum = 0;
    var nbTraject=0;
    props.mobilityData.mobilitiesStats.forEach((mobility:any) => {
      const date = Number(mobility.startDate.substring(0, 4));
      if(mobility.departmentTypeName===department && date>=years[0] && date<=years[1]){
        mobility.travels.forEach((travel:any) => {
          travel.steps.forEach( (step:any) => {
            sum=sum+step.carboneEmission/1000;
          })
          nbTraject++;
        })
      }
    });
    if(perTraject) return sum/nbTraject;
    return sum;
  }
  

  const collectYears = () => {     
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
 
  const handlePerTraject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerTraject(()=> (event.target.checked));
  };

  const handleYear = (event: any, newValue: number | number[]) => {
    setYears(newValue as number[]);
  };

  

  const displayYears = () => {
    if(props.settingsData.success){
      return (
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
      )
    }
  }
  const displayData = () => {
    if(props.settingsData.success && props.mobilityData.success){
      return (
        <ResponsiveContainer width="90%" height={350}>
          <BarChart
            data={data}
            className={classes.chart}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'kg', angle: -90, position: 'insideLeft' }}/>
            <Tooltip />
            <Bar dataKey="carbone" barSize={20} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

      )
    }else{
      return(
        <CircularProgress disableShrink />
      )
    }
  }

  return(
    <React.Fragment>
        <Grid style={{width:'100%'}} container spacing={3} className={classes.total}>
          <Grid item md={6}>
            <Typography variant="h4" marked="left" gutterBottom align="center" className={classes.title}>
              {t("WHICH_DEPARTMENT")} ?
            </Typography>
            <Typography variant="h5" gutterBottom marked="center" align="center" className={classes.title}>
              {t("TEXT_DEPARTMENT")} ?
            </Typography>
            {displayYears()}
          </Grid>
          <Grid item md={6} className={classes.graph}>
            {displayData()}
          </Grid>
        </Grid>
    </React.Fragment>
  )
}

export default connector(DepartmentCharts);
