import { Checkbox, FormControlLabel, FormGroup, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { RootState } from '../../../redux';
import Typography from '../Typography';

const dataDemo = [
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
    flexDirection: 'row'
  },
  checkBox: {
    flex: 'auto',
    margin: 'auto'
  }
}));


function DepartmentCharts(props: Props) {
  const classes = useStyles();

  useEffect(()=> {
    if(props.settingsData.success && props.mobilityData.success) colectData();
  }, [props.settingsData.success, props.mobilityData.success])
  
  const [data, setData] = React.useState([{}]);

  const colectData = () => {     
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
      if(mobility.departmentTypeName===department){
        mobility.travels.forEach((travel:any) => {
          travel.steps.forEach( (step:any) => {
            sum=sum+step.carboneEmission/1000;
          })
        })
      }
    });
    return sum;
  }

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
              {props.settingsData.appSettings.allYear.map((row:any) => (
                  <FormControlLabel className={classes.checkBox} control={<Checkbox />} label={row} />
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
