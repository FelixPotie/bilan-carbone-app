import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '../modules/components/Typography';
import AppForm from '../modules/views/AppForm';
import withRoot from '../modules/withRoot';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Box, Grid } from '@material-ui/core';

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

function SignIn() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container justify="space-evenly" alignItems="center" >
        <Grid item md={6}>
          <AppForm>
            <React.Fragment>
              <Typography variant="h3" gutterBottom marked="center" align="center">
                Sign In
              </Typography>
            </React.Fragment>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              // className={classes.submit}
              >
                Sign In
              </Button>
            </form>
            <Typography align="center">
              <Link underline="always" href="/premium-themes/onepirate/forgot-password/">
                Forgot password?
              </Link>
            </Typography>
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

export default withRoot(SignIn);
