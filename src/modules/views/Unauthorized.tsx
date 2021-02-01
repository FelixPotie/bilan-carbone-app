import { Box, Button, Container, makeStyles } from '@material-ui/core';
import React from 'react'
import { Link } from 'react-router-dom';
import Typography from '../components/Typography';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        margin: 'auto',
        width: '50%'
    },
    button: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        justifyContent: 'center',
        textDecoration: "none"
    }

}));

function UnauthorizedContainer() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Container>
                <Typography variant="h2" gutterBottom marked="center" align="center" className={classes.title}>
                    Erreur 401 !
                    </Typography>
                <Typography variant="h5" gutterBottom marked="center" align="center">
                    Bonjour, le contenu que vous recherchez nécessite une connexion. Connectez vous pour y accéder.
                    </Typography>
                <Box display="flex">
                    <Box m="auto">
                        <Link
                            to="/signin">
                            className={classes.button}
                            <Button
                                variant="contained"
                                // onClick={() => history.push("/signin")}
                                className={classes.button}
                            >
                                {'Se connecter'}
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default UnauthorizedContainer;
