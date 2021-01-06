import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from './Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { RootState } from '../../redux';
import { connect, ConnectedProps } from 'react-redux';
import { login } from '../../redux/user/actions';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AppForm from '../views/AppForm';
import { addMobility } from '../../redux/mobility/actions';
import { Redirect } from 'react-router-dom';


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
        marginTop: theme.spacing(4),
        marginRight: '10%',
        marginLeft: '10%',
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
            "user_id": props.user.user.username,
            "user_department": props.user.user.department,
            "user_gender": "M", //AJOUTER LE GENRE
            "type": type,
            "place": place,
            "year": year,
            "start_date": start_date?.toISOString().substring(0, 10),
            "end_date": end_date?.toISOString().substring(0, 10)
        }
        console.log(body)
        props.addMobility(body);
    }

    
    return !props.user.isLoggedIn ? (
            <div>Vous devez être connecté pour acceder à cette page</div>
        ) : props.mobility.error ?(
            <h2>{props.mobility.error} : Veuillez réessayer</h2>
        ) : props.mobility.success ?(
            <Redirect to="/mobilites"/>
        ) : (
        <React.Fragment>
            <Grid container justify="space-evenly" alignItems="center" >
                <Grid item md={12}>
                    <div className={classes.title}>
                        <React.Fragment>
                            <Typography variant="h3" gutterBottom marked="center" align="center">
                                Ajouter une mobilité
                            </Typography>
                        </React.Fragment>
                    </div>
                <AppForm>

                    <form onSubmit={e => onSubmit(e)}>
                        <FormControl className={classes.form} variant="outlined">
                            <InputLabel htmlFor="type">Type de mobilité *</InputLabel>
                            <Select
                                required
                                variant="outlined"
                                fullWidth
                                id="type"
                                name="type"
                                label="Type de mobilité *"
                                autoComplete="type"
                                onChange={handleChange}
                                value={type}
                                className={classes.field}
                            >
                                <MenuItem value={'Semestre'}>Semestre</MenuItem>
                                <MenuItem value={'Stage'}>Stage</MenuItem>
                                <MenuItem value={'Double diplôme'}>Double diplôme</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.form}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="place"
                                label="Ville, Pays"
                                id="place"
                                autoComplete="place"
                                onChange={handleChange}
                                value={place}
                                className={classes.field}
                            />
                        </div>
                        <FormControl className={classes.form} variant="outlined">
                            <InputLabel id="year">Année d'étude *</InputLabel>
                            <Select
                                required
                                fullWidth
                                labelId="year"
                                id="year"
                                name="year"
                                label="Année d'étude *"
                                autoComplete="year"
                                onChange={handleChange}
                                value={year}
                                className={classes.field}
                            >
                                <MenuItem value={'3'}>3e année</MenuItem>
                                <MenuItem value={'4'}>4e année</MenuItem>
                                <MenuItem value={'5'}>5e année</MenuItem>
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
                                    label="Date de début"
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
                                    label="Date de fin"
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
                            Ajouter
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
