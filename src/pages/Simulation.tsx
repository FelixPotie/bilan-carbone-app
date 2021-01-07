import { Box, Button, Container, Grid, makeStyles, TextField} from '@material-ui/core';
import React, { useState } from 'react'
import withRoot from '../modules/withRoot'
import Typography from '../modules/components/Typography';
import FormButton from '../modules/form/FormButton';
import Step from '../modules/components/Step';
import { getDistance } from 'geolib'
import { useTranslation } from 'react-i18next';


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
    const {t} = useTranslation('simulationPage');
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
                {t("STEP")} {index + 1} : de {step.from.name} à {step.to.name} {getDistance({ latitude: step.from.lat, longitude: step.from.lng }, { latitude: step.to.lat, longitude: step.to.lng }) / 1000} km

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
                                {t("SIMULATE_YOUR_JOURNEY")}
                            </Typography>
                        </Box>
                    </Box>

                    <Typography variant="h5" gutterBottom marked="center" align="center">
                        {t("PAGE_DESCRIPTION")}
                    </Typography>
                </Container>
                <Grid md={6} alignItems="center">
                    <Container className={classes.journeyCard}>
                        <Box>
                            <Typography variant="h4" marked="center" align="center" color="inherit">
                                {t("YOUR_JOURNEY")}
                            </Typography>

                            <label><h4>{t("DATE")} :</h4></label>
                            <TextField type="date" />

                            <div>
                                <label><h4>{t("STEP")} :</h4></label>
                                {listStep}
                            </div>

                            <div className={classes.actionButton}>
                                {listStep.length <= 1 ?
                                    <Button onClick={addStep}>{t("ADD_STEP")}</Button>
                                    :
                                    <div>
                                        <Button onClick={removeStep}>{t("REMOVE_STEP")}</Button>
                                        <Button onClick={addStep}>{t("ADD_STEP")}</Button>
                                    </div>
                                }
                            </div>

                            <FormButton >{t("SIMULATE")}</FormButton>
                        </Box>
                    </Container>
                </Grid>

                <Grid md={6} alignItems="center">
                    <div className={classes.test}>
                        <Container className={classes.journeyCard}>
                            <Box>
                                <Typography variant="h4" marked="center" align="center" color="inherit">
                                    {t("YOUR_EMISSIONS")}
                                </Typography>

                                <Typography variant="h5" marked="center" align="center" color="inherit">
                                    {t("EMISSION_DESCRIPTION")}
                                </Typography>
                                <ul>
                                    {distance}
                                </ul>
                                <FormButton >{t("SAVE")}</FormButton>
                            </Box>
                        </Container>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default withRoot(Simulation);
