import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from './Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Grid, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../redux';
import { connect, ConnectedProps } from 'react-redux';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AppForm from '../views/AppForm';
import { Redirect } from 'react-router-dom';
import UnauthorizedContainer from './Unauthorized';
import { addAdmin } from '../../redux/admin/actions';
import UnauthorizedAdminContainer from './UnauthorizedAdmin';


const mapState = (state: RootState) => {
    return {
        admin: state.admin
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        addAdmin : (body: object) => dispatch(addAdmin(body)),
    }
}


const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const useStyles = makeStyles((theme) => ({
    title: {
        marginRight: '-8%',
        marginLeft: '-8%',
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

function AddAdminContainer(props: Props) {
    const classes = useStyles();

    
    const [state, setState] = React.useState({
        username: "",
        password:  "",
    });

    const {username, password} = state;
    
    const handleChange = (event: React.ChangeEvent<any>) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body ={
            "username": username,
            "password": password
        }
        props.addAdmin(body);
    }

    
    return !props.admin.isLoggedIn ? (
            <UnauthorizedAdminContainer/>
        ) : props.admin.failure ?(
            <Typography variant="h3" gutterBottom marked="center" align="center">
                {props.admin.failure} : Veuillez réessayer
            </Typography>
        ) : props.admin.success ?(
            <Redirect to="list"/>
        ) : (
        <React.Fragment>
            <Grid container justify="space-evenly" alignItems="center" >
                <Grid item md={12}>
                <AppForm>

                    <div className={classes.title}>
                        <React.Fragment>
                            <Typography variant="h3" gutterBottom marked="center" align="center">
                                Ajouter un compte administrateur
                            </Typography>
                        </React.Fragment>
                    </div>

                    <form onSubmit={e => onSubmit(e)}>
                        <div className={classes.form}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Identifiant Polytech"
                                name="username"
                                autoComplete="username"
                                onChange={handleChange}
                                value={username}
                                autoFocus
                            />
                        </div>
                        <div className={classes.form}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={handleChange}
                                value={password}
                            />
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

export default connector(AddAdminContainer);
