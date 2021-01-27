import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react'
import withRoot from '../modules/withRoot'
import Typography from '../modules/components/Typography';
import Auth from '../modules/components/Auth';

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        margin: 'auto',
        width: '50%'
    },
    subtitle: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        margin: 'auto',
        width: '80%'
    }
   
}));

function NotFound() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Auth/>
            <Container>
                <Box>
                    <Typography variant="h2" gutterBottom marked="center" align="center" className={classes.title}>
                        Erreur 404 !
                    </Typography>
                    <Typography variant="h5" gutterBottom marked="center" align="center" className={classes.subtitle}>
                        Bonjour, le contenu que vous recherchez n'existe pas ou plus sur carbone.polytech.umontpellier.fr
                    </Typography>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default withRoot(NotFound);
