import { Checkbox, FormControlLabel, FormGroup, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
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
    marginTop :theme.spacing(2),
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


function DepartmentCharts(props: Props) {
  const classes = useStyles();

  const [data, setData] = React.useState([{}]);
  interface Years {
    [unit: string]: boolean
  }
  const [years , setYears] = React.useState<Years>({})

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
  }, [props.settingsData.success, props.mobilityData.success, years])


  const collectData = () => {     
    const departments = props.settingsData.appSettings.department;
    const infos :{name:string, carbone: number}[]=[]
    departments.forEach((department: { [x: string]: string; }) => {
      infos.push({name:department.name, carbone: calculCarbone(department.name)})
    })
    setData(infos);
  }

  
  function calculCarbone(department: string) : number{
    var sum = 0;
    props.mobilityData.mobilites.forEach((mobility:any) => {
      if(mobility.departmentTypeName===department && getKeyValue(years)(mobility.startDate.substring(0, 4)) ){
        mobility.travels.forEach((travel:any) => {
          travel.steps.forEach( (step:any) => {
            sum=sum+step.carboneEmission/1000;
          })
        })
      }
    });
    return sum;
  }
  
  const collectYears = () => {     
    const years = props.settingsData.appSettings.allYear;
    years.forEach((year: number) => {
      setYears((prevState)=> ({...prevState, [year.toString()]: true}))
    })
  }
  const getKeyValue = <T extends object, U extends keyof T>(obj: T) => (key: U) => obj[key];
 
  const handleYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYears((prevState) => ({...prevState, [event.target.name]: event.target.checked }));
  };

  return (props.settingsData.success && props.mobilityData.success)?(
    <React.Fragment>
        <Grid container spacing={3}>
          <Grid item md={6}>
            <Typography variant="h4" gutterBottom marked="center" align="center" className={classes.title}>
              Quel départments émettent le moins ?
            </Typography>
            <Typography variant="h5" gutterBottom marked="center" align="center" className={classes.title}>
              Lors de l'année en cours, quels sont les département ayant dégagés le moins d'émission de CO2 lors de leurs trajets lié aux mobilitées internationnales ?
            </Typography>
            <FormGroup className={classes.form}>
              {Object.keys(years).map((row:any) => (
                  <FormControlLabel className={classes.checkBox} control={<Checkbox  onChange={e => handleYear(e)} checked={getKeyValue(years)(row)?true:false} name={row}/>} label={row} />
              ))}
            </FormGroup>
          </Grid>

          <Grid item md={6}>
            <BarChart
              width={550}
              height={290}
              data={data}
              className={classes.graph}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="carbone" barSize={20} fill="#8884d8" />
            </BarChart>
          </Grid>
        </Grid>
    </React.Fragment>
  ):(
    <div>Loading</div>
  )
}

export default connector(DepartmentCharts);
