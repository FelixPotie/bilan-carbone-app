import { Box, Button, Container, Grid, makeStyles, TextField, ListItem, List } from '@material-ui/core';
import React, { useState } from 'react'
import withRoot from '../modules/withRoot'
import Typography from '../modules/components/Typography';
import FormButton from '../modules/form/FormButton';
import Step from '../modules/components/Step';
import { getDistance } from 'geolib'


interface place {
    name: string,
    country: string,
    lat: number,
    lng: number
}

interface stepInterface {
    from: place,
    to: place,
    by: string
}

const defaultPlace: place = {
    name: "Montpellier",
    country: "France",
    lat: 43.61093,
    lng: 3.87635

}

const defaultStep: stepInterface =
{
    from: defaultPlace,
    to: defaultPlace,
    by: "plane"
}

const defaultListStep: stepInterface[] = [defaultStep]

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    button: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        justifyContent: 'center',
    },
    tableContainer: {
        padingLeft: theme.spacing(4),
        padingRight: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    table: {
        minWidth: 700,
    },
    test: {
        height: "100%"
    },
    journeyCard: {
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "10px",
        borderStyle: "solid",
        border: "2px",
        borderRadius: "10px",
        display: "block",
        marginTop: "20px",
        marginBottom: "20px"
    },
    emissionCard: {
        display: "block"
    },

    actionButton: {
        textAlign: "right"
    }


}));




function Simulation() {
    const classes = useStyles();
    const [listStepInfo, setListStepInfo] = useState(defaultListStep)


    const removeStep = (event: any) => {
        setListStepInfo(listStepInfo.slice(0, -1))
        event.preventDefault();
    }


    const updateStep = (updatedStep: stepInterface, id: number) => {
        const newList = listStepInfo.map((step: any, index: number) => {
            if (index === id) {
                return updatedStep;
            }

            return step;
        });
        console.log(newList)
        setListStepInfo(newList);
    }

    const listStep = listStepInfo.map((step, index: number) =>
        <Step key={index} id={index} step={defaultStep} updateStep={updateStep}></Step>)


    const addStep = (event: any) => {
        setListStepInfo(listStepInfo.concat(defaultStep))
        event.preventDefault();

    }

    const distance = listStepInfo.map((step, index) => (
        <li>
            <Typography variant="h5">
                etape {index+1} : de {step.from.name} à {step.to.name} {getDistance({ latitude: step.from.lat, longitude: step.from.lng }, { latitude: step.to.lat, longitude: step.to.lng }) / 1000} km

                </Typography>
        </li>
    ))




    return (
        <React.Fragment>
            <Grid container justify="space-evenly" alignItems="flex-start" >
                <Container className={classes.title}>
                    <Box display="flex">
                        <Box m="auto">
                            <Typography variant="h3" gutterBottom marked="center" align="center" color="inherit">
                                Simuler votre trajet
                        </Typography>
                        </Box>
                    </Box>

                    <Typography variant="h5" gutterBottom marked="center" align="center">
                        Retrouvez vos différentes expériences à l'étranger effectuées durant vos études à Polytech Montpellier
                </Typography>
                </Container>
                <Grid md={6} alignItems="center">
                    <Container className={classes.journeyCard}>
                        <Box>
                            <Typography variant="h4" marked="center" align="center" color="inherit">
                                Votre trajet
                        </Typography>

                            <label><h4>Date du trajet: </h4></label>
                            <TextField type="date" />

                            <div>
                                <label><h4>Etape(s) du trajet</h4></label>
                                {listStep}
                            </div>

                            <div className={classes.actionButton}>
                                {listStep.length <= 1 ?
                                    <Button onClick={addStep}>add step</Button>
                                    :
                                    <div>
                                        <Button onClick={removeStep}>remove step</Button>
                                        <Button onClick={addStep}>add step</Button>
                                    </div>
                                }
                            </div>

                            <FormButton >Simuler</FormButton>
                        </Box>
                    </Container>
                </Grid>

                <Grid md={6} alignItems="center">
                    <div className={classes.test}>
                        <Container className={classes.journeyCard}>
                            <Box>
                                <Typography variant="h4" marked="center" align="center" color="inherit">
                                    Vos émissions
                        </Typography>

                                <Typography variant="h5" marked="center" align="center" color="inherit">
                                    Voici une estimations de CO2 pour chacune de vos étapes.
                        </Typography>
                                <ul>
                                    {distance}
                                </ul>
                                <FormButton >Enregistrer</FormButton>
                            </Box>
                        </Container>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default withRoot(Simulation);
