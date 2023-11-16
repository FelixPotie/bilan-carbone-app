import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '../components/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AppForm from './AppForm';
import { RootState } from '../../redux';
import { connect, ConnectedProps } from 'react-redux';
import { login } from '../../redux/user/actions';
import { loginAdmin } from '../../redux/admin/actions';
import { Redirect } from 'react-router-dom';


const mapState = (state: RootState, ownProps: any) => {
  return {
    user: state.user,
    admin: state.admin,
    label: ownProps.label
  }
}

const mapDispatch = (dispatch: any) => {
  return {
    login: (username: string, password: string) => dispatch(login(username, password)),
    loginAdmin: (username: string, password: string) => dispatch(loginAdmin(username, password)),
  }
}



const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  formContainer: {
    backgroundColor: '#f8f8ff',
    paddingBottom: theme.spacing(6),
    paddingTop: theme.spacing(3),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
  image: {
    maxHeight: 150,
    height: 'auto',
    maxWidth: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    Right: theme.spacing(2),
  },
  button:{
    marginTop: '16px',
  },
}));

function SignInContainer(props: Props) {
  const classes = useStyles();
  const  {t} = useTranslation('signIn');

  const [stateLogin, setStateLogin] = React.useState({
    username: "",
    password: "",
    usernameError: false
  });

  const { username, password , usernameError} = stateLogin;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'username' && event.target.value.includes('@')) {
      setStateLogin({ ...stateLogin, [event.target.name]: event.target.value , usernameError: true});
    } else {
      setStateLogin({ ...stateLogin, [event.target.name]: event.target.value , usernameError: false});
    }

  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.label === "admin") {
      props.loginAdmin(username, password)
    } else {
      props.login(username, password);
    }
  }


  return props.user.isLoggedIn ? (
    <Redirect to="/" />
  ) : props.admin.isLoggedIn ? (
    <Redirect to="/admin/export-data" />
  ) : (props.label === "admin") ? (
    <React.Fragment>
      <Grid container className={classes.formContainer} justify="space-evenly" alignItems="center" >
        <Grid item md={12}>
          <AppForm>
            <React.Fragment>
              <Typography variant="h3" gutterBottom marked="center" align="left">
                Connexion {props.label}
              </Typography>
              <Typography variant="h5">
                {props.admin.failure}
              </Typography>

            </React.Fragment>
            <form className={classes.form} onSubmit={e => onSubmit(e)}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Identifiant"
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
              <Button
                  className={classes.button}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Connexion
                        </Button>
            </form>
          </AppForm>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex">
            <Box m="auto">
              <img src="/polytech.png"
                alt="polytech"
                className={classes.image}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
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
  ) : (
          <React.Fragment>
            <Grid className={classes.formContainer} container justify="space-evenly" alignItems="center" >
              <Grid item md={12} >
                <AppForm >
                  <React.Fragment >
                    <Typography variant="h3" gutterBottom marked="center" align="left">
                      {t("CONNECTION")}
                        </Typography>
                    <Typography variant="h5">
                      {props.user.failure}
                    </Typography>

                  </React.Fragment>
                  <form className={classes.form} onSubmit={e => onSubmit(e)}>
                    <TextField
                        error={usernameError}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label={t("ID")}
                      name="username"
                      autoComplete="username"
                      onChange={handleChange}
                      value={username}
                      autoFocus
                        helperText={usernameError? t('USERNAME_FORMAT') : ""}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label={t("PASSWORD")}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      value={password}
                    />
                    <Button
                        className={classes.button}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      {t("CONNECTION")}
                        </Button>
                  </form>
                </AppForm>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display="flex">
                  <Box m="auto">
                    <img src="/polytech.png"
                      alt="polytech"
                      className={classes.image}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
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
