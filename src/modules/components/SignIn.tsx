import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from './Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Box, Grid } from '@material-ui/core';
import AppForm from '../views/AppForm';
import { RootState } from '../../redux';
import { connect, ConnectedProps } from 'react-redux';
import { login } from '../../redux/user/actions';
import { Redirect } from 'react-router-dom';


const mapState = (state: RootState, ownProps: any) => {
    return {
        user: state.user,
        label: ownProps.label
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        login : (username: string, password: string) => dispatch(login(username, password)),
    }
}



const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
  image: {
    height: 150,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

function SignInContainer(props: Props) {
    const classes = useStyles();
    
    const [stateLogin, setStateLogin] = React.useState({
        username: "",
        password:  "",
    });

    const {username, password} = stateLogin;
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateLogin({ ...stateLogin, [event.target.name]: event.target.value });
    };

    
    return props.user.success ? (
            <Redirect to="/" />
        ) : (
        <React.Fragment>
            <Grid container justify="space-evenly" alignItems="center" >
                <Grid item md={6}>
                <AppForm>
                    <React.Fragment>
                        <Typography variant="h3" gutterBottom marked="center" align="center">
                            Connexion {props.label}
                        </Typography>
                        <Typography variant="h5">
                            {props.user.failure}
                        </Typography>
        
                    </React.Fragment>
                    <form className={classes.form}>
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Se souvenir de moi"
                        />
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => props.login(username,password)}
                        >
                            Connexion
                        </Button>
                    </form>
                </AppForm>
                </Grid>
                <Grid item md={6}>
                    <Box display="flex">
                        <Box m="auto">
                            <img src="/polytech.png"
                                alt="polytech"
                                className={classes.image}
                            />
                        </Box>
                    </Box>
                    <Box display="flex">
                        <Box m="auto">
                        <img src="/ddrs.png"
                            alt="ddrs"
                            className={classes.image}
                        />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default connector(SignInContainer);
