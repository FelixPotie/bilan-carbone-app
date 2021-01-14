import { Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { RootState } from '../../../redux';
import Typography from '../Typography';


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
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  chart: {
    marginLeft: '2.5%'
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


function TimeCharts(props: Props){
  const classes = useStyles();
  const  {t} = useTranslation('statistics');

  const [data, setData] = React.useState([{}]);
  interface Departments {
    [unit: string]: boolean
  }
  const [departments , setDepartments] = React.useState<Departments>({})
  const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];


  useEffect(()=> {
    if(props.settingsData.success && props.mobilityData.success) {
      collectDepartments();
    }
  }, [props.settingsData.success, props.mobilityData.success])
  
  useEffect(()=> {
    if(props.settingsData.success && props.mobilityData.success) {
      if(Object.keys(departments).length>0){
        collectData();
      }
    }
  }, [props.settingsData.success, props.mobilityData.success, departments])

  const collectDepartments = () => {     
    const departments = props.settingsData.appSettings.department;
    departments.forEach((department: any) => {
      setDepartments((prevState)=> ({...prevState, [department.name]: true}))
    })
  }
  

  const collectData = () => {     
    const years = props.settingsData.appSettings.allYear;
    const infos :{name:string, carbone: number}[]=[]
    years.forEach((year: number) => {
      infos.push({name: year.toString(), carbone: calculCarbone(year)})
    })
    setData(infos);
}


  function calculCarbone(year: number) : number{
    var sum = 0;
    props.mobilityData.mobilites.forEach((mobility:any) => {
      if(+mobility.startDate.substring(0, 4)===year && getKeyValue(departments)(mobility.departmentTypeName)){
        mobility.travels.forEach((travel:any) => {
          travel.steps.forEach( (step:any) => {
            sum=sum+step.carboneEmission/1000;
          })
        })
      }
    });
    return sum;
  }

  const handleDepartment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDepartments((prevState) => ({...prevState, [event.target.name]: event.target.checked }));
  };

  const displayYears = () => {
    if(props.settingsData.success){
      return(
        <FormGroup className={classes.form}>
          {Object.keys(departments).map((row:any) => (
              <FormControlLabel className={classes.checkBox} control={<Checkbox  onChange={e => handleDepartment(e)} checked={getKeyValue(departments)(row)?true:false} name={row}/>} label={row} />
          ))}
        </FormGroup>
      )
    }
  }
  
  const displayData = () => {
    if(props.settingsData.success && props.mobilityData.success){
      return (
        // <div className={classes.graph}>
          <ResponsiveContainer width="90%" height={250}>
            <AreaChart
              data={data}
              className={classes.chart}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: 'kg', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Area type="monotone" dataKey="carbone" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        // </div>
      )
    }else{
      return(
        <CircularProgress disableShrink />
      )
    }
  }

    return (
      <React.Fragment>
        <Grid container spacing={3} className={classes.total}>
        <Grid item md={6}>
            <Typography variant="h4" gutterBottom marked="center" align="center" className={classes.title}>
              {t("TIME_TITLE")}
            </Typography>
            <Typography variant="h5" gutterBottom marked="center" align="center" className={classes.title}>
              {t("TIME_TEXT")}
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
export default connector(TimeCharts);