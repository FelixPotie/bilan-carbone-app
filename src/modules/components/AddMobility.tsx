import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from './Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Select, MenuItem, InputLabel, FormControl, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../redux';
import { connect, ConnectedProps } from 'react-redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AppForm from '../views/AppForm';
import { addMobility } from '../../redux/mobility/actions';
import { Redirect } from 'react-router-dom';
import UnauthorizedContainer from './Unauthorized';


const mapState = (state: RootState, ownProps: any) => {
    return {
        user: state.user,
        mobility: state.mobility,
        label: ownProps.label
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        addMobility : (body: object) => dispatch(addMobility(body)),
    }
}



const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(2),
      },
  form: {
    marginRight: '5%',
    marginLeft: '5%',
    width: '90%',
  },
  button: {
      margin: 'auto',
        width: '30%',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(8)

    },
  field: {
    marginBottom: theme.spacing(2),
    width:'100%',

  },
  date: {
  }
}));

function AddMobilityContainer(props: Props) {
    const classes = useStyles();
    const  {t} = useTranslation('mobility');

    
    const [state, setState] = React.useState({
        type: "",
        place:  "",
        year: "",
    });

    const [start_date, setSelectedStartDate] = React.useState<Date | null>(
        null,
    );
    const [end_date, setSelectedEndDate] = React.useState<Date | null>(
        null,
    );
    const {type, place, year} = state;
    
    const handleChange = (event: React.ChangeEvent<any>) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleStartDateChange = (date: Date | null) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date: Date | null) => {
        setSelectedEndDate(date);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body ={
            "userId": props.user.user.username,
            "departmentTypeName": props.user.user.department,
            "type": type,
            "place": place,
            "year": +year,
            "startDate": start_date?.toISOString(),
            "endDate": end_date?.toISOString()
        }
        props.addMobility(body);
    }

    
    return !props.user.isLoggedIn ? (
            <UnauthorizedContainer/>
        ) : props.mobility.error ?(
            <Typography variant="h3" gutterBottom marked="center" align="center">
                {props.mobility.error} : Veuillez réessayer
            </Typography>
        ) : props.mobility.success ?(
            <Redirect to="/mobilites"/>
        ) : (
        <React.Fragment>
            <Grid container justify="space-evenly" alignItems="center" >
                <Grid item md={12}>
                <AppForm>
                    <Box display="flex" className={classes.title}>
                        <Box m="auto">
                            <Typography variant="h3" gutterBottom marked="center" align="center">
                                {t("ADD_MOBILITY")}
                            </Typography>
                        </Box>
                    </Box>
                    <form onSubmit={e => onSubmit(e)}>
                        <FormControl className={classes.form} variant="outlined">
                            <InputLabel htmlFor="type">{t("TYPE")}</InputLabel>
                            <Select
                                required
                                variant="outlined"
                                fullWidth
                                id="type"
                                name="type"
                                label={t("TYPE")}
                                autoComplete="type"
                                onChange={handleChange}
                                value={type}
                                className={classes.field}
                            >
                                <MenuItem value={'SEMESTER'}>Semestre</MenuItem>
                                <MenuItem value={'INTERNSHIP'}>Stage</MenuItem>
                                <MenuItem value={'DOUBLE_DEGRE'}>Double diplôme</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.form}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="place"
                                label={t("CITY")}
                                id="place"
                                autoComplete="place"
                                onChange={handleChange}
                                value={place}
                                className={classes.field}
                            />
                        </div>
                        <FormControl className={classes.form} variant="outlined">
                            <InputLabel id="year">{t("STUDY_YEAR_")}</InputLabel>
                            <Select
                                required
                                fullWidth
                                labelId="year"
                                id="year"
                                name="year"
                                label={t("STUDY_YEAR_")}
                                autoComplete="year"
                                onChange={handleChange}
                                value={year}
                                className={classes.field}
                            >
                                <MenuItem value={'3'}>{t("3RD")}</MenuItem>
                                <MenuItem value={'4'}>{t("4TH")}</MenuItem>
                                <MenuItem value={'5'}>{t("5TH")}</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.form}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    required
                                    inputVariant="outlined"
                                    format="dd/MM/yyyy"
                                    id="start_date"
                                    label={t("START_DATE")}
                                    value={start_date}
                                    onChange={handleStartDateChange}
                                    className={classes.field}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className={classes.form}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <KeyboardDatePicker
                                    disableToolbar
                                    required
                                    inputVariant="outlined"
                                    format="dd/MM/yyyy"
                                    id="end_date"
                                    label={t("END_DATE")}
                                    value={end_date}
                                    onChange={handleEndDateChange}
                                    className={classes.field}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        
                        </div>
                                
                        <div className={classes.button}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            {t("ADD")}
                        </Button>
                        </div>
                    </form>
                </AppForm>

                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connector(AddMobilityContainer);
