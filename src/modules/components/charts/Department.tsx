import { Checkbox, CircularProgress, FormControlLabel, FormGroup, Grid, makeStyles, Switch } from '@material-ui/core';
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
  }
}));


function DepartmentCharts(props: Props) {
  const classes = useStyles();
  const  {t} = useTranslation('statistics');

  const [data, setData] = React.useState([{}]);
  interface Years {
    [unit: string]: boolean
  }
  const [years , setYears] = React.useState<Years>({})
  const [perTraject , setPerTraject] = React.useState(false);

  useEffect(()=> {
    if(props.settingsData.success && props.mobilityData.success) {
      collectYears();
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
      if(mobility.departmentTypeName===department && getKeyValue(years)(mobility.startDate.substring(0, 4)) ){
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
    const years = props.settingsData.appSettings.allYear.sort();
    years.forEach((year: number) => {
      setYears((prevState)=> ({...prevState, [year.toString()]: true}))
    })
  }
  const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];
 
  const handleYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYears((prevState) => ({...prevState, [event.target.name]: event.target.checked }));
  };

  const handlePerTraject = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPerTraject(()=> (event.target.checked));
  };

  const displayYears = () => {
    if(props.settingsData.success){
      return (
        <FormGroup className={classes.form}>
          <FormControlLabel className={classes.checkBox} control={<Switch onChange={e => handlePerTraject(e)} checked={perTraject}/>} label={t("PER_TRAJECT")} />
          {Object.keys(years).map((row:any) => (
              <FormControlLabel className={classes.checkBox} control={<Checkbox  onChange={e => handleYear(e)} checked={getKeyValue(years)(row)?true:false} name={row}/>} label={row} />
          ))}
        </FormGroup>
      )
    }
  }
  const displayData = () => {
    if(props.settingsData.success && props.mobilityData.success){
      return (
        <ResponsiveContainer width="90%" height={290}>
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
