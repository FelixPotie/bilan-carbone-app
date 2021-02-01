import { CardContent, Checkbox, Card, FormControlLabel, FormGroup, makeStyles, CircularProgress, Mark, Slider } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
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
    backgroundColor: '#d5d5ff',
    borderRadius:"10%",
    width: "90%",
    maxWidth:"400px",
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
  },
  slider: {
    width: "80%",
    margin: "auto"
  },
  content: {
    marginBottom:theme.spacing(4)
  }
}));


function TotalCharts(props: Props) {
  const classes = useStyles();
  const  {t} = useTranslation('statistics');

  const [data, setData] = React.useState(0);
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
      setData(calculCarbone());
    }
  }, [props.settingsData.success, props.mobilityData.success, years])


  
  function calculCarbone() : number{
    var sum = 0;
    props.mobilityData.mobilitiesStats.forEach((mobility:any) => {
      const date = Number(mobility.startDate.substring(0, 4));
      if(date>=years[0] && date<=years[1] ){
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
  
  const handleYear = (event: any, newValue: number | number[]) => {
    setYears(newValue as number[]);
  };
  
  const displayData = () => {
    if(props.settingsData.success && props.mobilityData.success){
      return (
        <div>
          <Typography variant="h5" gutterBottom marked="center" align="center" className={classes.subtitle}>
            <h3>{(data/1000).toFixed(2)}  kg</h3>{t("OF")} CO<sub>2</sub>
          </Typography>
          <FormGroup className={classes.form}>
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
    } else {
      return (
        <CircularProgress disableShrink/>
      )
    }
  }

  return (
    <React.Fragment>
        <Card className={classes.total}>
            <CardContent className={classes.content}>
                <Typography variant="h5" gutterBottom marked="center" align="center" className={classes.title}>
                    {t("TOTAL")} :
                </Typography>
                {displayData()}
            </CardContent>
        </Card>
    </React.Fragment>
  )
}

export default connector(TotalCharts);
