import { CardContent, Checkbox, Card, FormControlLabel, FormGroup, Grid, makeStyles, CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux';
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
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(3),
      width: '90%',
      margin: 'auto'
  },
  subtitle: {
    marginBottom: theme.spacing(1),
    width: '90%',
    margin: 'auto'
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
    margin: 'auto',
    width: '500px',
    backgroundColor: '#ccebff'
  }
}));


function TotalCharts(props: Props) {
  const classes = useStyles();

  const [data, setData] = React.useState(0);
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
        setData(calculCarbone());
      }
    }
  }, [props.settingsData.success, props.mobilityData.success, years])


  
  function calculCarbone() : number{
    var sum = 0;
    props.mobilityData.mobilites.forEach((mobility:any) => {
      if(getKeyValue(years)(mobility.startDate.substring(0, 4)) ){
        mobility.travels.forEach((travel:any) => {
          travel.steps.forEach( (step:any) => {
            sum=sum+step.carboneEmission;
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
        <Card className={classes.total}>
            <CardContent>
                <Typography variant="h5" gutterBottom marked="center" align="center" className={classes.title}>
                    Total des émissions carbones :
                </Typography>
                <Typography variant="h5" gutterBottom marked="center" align="center" className={classes.subtitle}>
                    {(data/1000).toFixed(2)} kg de CO<sub>2</sub>
                </Typography>
                <FormGroup className={classes.form}>
                    {Object.keys(years).map((row:any) => (
                        <FormControlLabel className={classes.checkBox} control={<Checkbox  onChange={e => handleYear(e)} checked={getKeyValue(years)(row)?true:false} name={row}/>} label={row} />
                    ))}
            </FormGroup>
            </CardContent>
        </Card>
    </React.Fragment>
  ):(
    <CircularProgress disableShrink />
  )
}

export default connector(TotalCharts);
