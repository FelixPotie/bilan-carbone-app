import { Box, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Auth from '../modules/components/Auth';
import Typography from '../modules/components/Typography';
import withRoot from '../modules/withRoot';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    box:{
        margin: 'auto',
        width: '50%',
    },
    title:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginRight: '5%',
        marginLeft:  '5%',
    }
}));

function Ecolab() {
    const [loaded, setLoaded] = useState(false)
    const classes = useStyles();

    useEffect(() => {
        if (document.getElementById('test') === null) {
            const scriptTag = document.createElement('script');
            scriptTag.src = 'https://ecolab.ademe.fr/apps/transport/iframe.js'
            scriptTag.id = 'test'
            scriptTag.async = true

            scriptTag.addEventListener('load', () => setLoaded(true))
            document.body.appendChild(scriptTag)
        }
    })

    useEffect(() => {
        if (!loaded) return;
    }, [loaded])

    return (
        <React.Fragment>
            <Auth/>
            <Container>
                <Box display="flex" className={classes.title}>
                    <Box m="auto">
                        <Typography variant="h3" gutterBottom marked="center" align="left">
                            Simulez votre trajet !
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.box}>
                    <div>
                        <script  style={{"height":"100%"}} id="ecolab-transport" data-distanceInitiale="29" src="https://ecolab.ademe.fr/apps/transport/iframe.js"></script>
                    </div>
                </Box>
            </Container>
        </React.Fragment>
    
    )
}
 
export default withRoot(Ecolab);