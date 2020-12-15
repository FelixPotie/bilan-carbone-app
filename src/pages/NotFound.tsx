import { Box, Container } from '@material-ui/core';
import React from 'react'
import withRoot from '../modules/withRoot'
import Typography from '../modules/components/Typography';

function NotFound() {
    return (
        <React.Fragment>
            <Container>
                <Box>
                    <Typography variant="h5" gutterBottom marked="center" align="center">
                        Ce que vous cherchez ne se trouve pas ici
                    </Typography>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default withRoot(NotFound);
