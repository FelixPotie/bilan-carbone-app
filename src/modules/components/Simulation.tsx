import { Box, Button, Container, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Redirect } from 'react-router-dom';
import Typography from './Typography';
import Step from './Step';
import Comparator from './Comparator';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { addTravel } from '../../redux/travel/actions';
import { getMobilitiesByUser } from '../../redux/mobility/actions';
import DateFnsUtils from '@date-io/date-fns';
import { getDistance } from 'geolib'
import { calculateur } from '../ademe/calcul'
import { useTranslation } from 'react-i18next';

const mapState = (state: RootState) => {
    return {
        user: state.user,
        travel: state.travel,
        mobilityData: state.mobility,
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        addTravel: (body: object) => dispatch(addTravel(body)),
        getMobilitiesByUser: (username: string) => dispatch(getMobilitiesByUser(username)),
    }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux



interface place {
    name: string,
    country: string,
    lat: number,
    lng: number
}

interface stepInterface {
    from: place,
    to: place,
    by: string,
    nbPers: number
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
    by: "CAR",
    nbPers: 1
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
    },
    field: {
        marginTop: "15px",
        marginBottom: "15px",
        marginLeft: "10px",
        minWidth: "100px"
    }


}));




function Simulation(props: Props) {
    const { t } = useTranslation('simulationPage');
    const classes = useStyles();
    const [listStep, setlistStep] = useState(defaultListStep)
    const [date, setDate] = useState<Date | null>(
        null
    )
    const [type, setType] = useState(null)

    useEffect(() => {
        if (props.user.isLoggedIn) props.getMobilitiesByUser(props.user.user.username)
    }, [props.user.isLoggedIn])

    const urlParams: any = useParams()


    const removeStep = (event: any) => {
        setlistStep(listStep.slice(0, -1))
        event.preventDefault();
    }


    const updateStep = (updatedStep: stepInterface, id: number) => {
        const newList = listStep.map((step: stepInterface, index: number) => {
            if (index === id) {
                return updatedStep;
            }

            return step;
        });
        setlistStep(newList);
    }

    const addStep = (event: any) => {
        setlistStep(listStep.concat(defaultStep))
        event.preventDefault();

    }

    const handleChangeDate = (date: Date | null) => {
        setDate(date)
    }

    const handleChangeType = (event: any) => {
        setType(event.target.value)
    }

    const getDist = (step: stepInterface): number => {
        return Math.round(getDistance({ latitude: step.from.lat, longitude: step.from.lng }, { latitude: step.to.lat, longitude: step.to.lng }) / 10) / 100
    }

    const saveTravel = () => {
        if (!date) {
            console.log("date non valide")
        }
        else {
            let steps: Object[] = []
            const body = {
                mobilityId: urlParams.id,
                type: type,
                date: date.toISOString(),
                steps: steps
            }
            listStep.map((step, index: number) => {
                steps.push({
                    rank: index,
                    departure: `${step.from.name}, ${step.from.country}`,
                    arrival: `${step.to.name}, ${step.to.country}`,
                    distance: Math.round(getDist(step)),
                    meansOfTransport: step.by,
                    carboneEmission: Math.round(calculateur(getDist(step), step.by, step.nbPers))
                })
                if (index === listStep.length - 1) {
                    props.addTravel(body)
                }
            })

        }
    }

    const displayListStep = listStep.map((step, index: number) =>
        <Step key={index} id={index} step={defaultStep} updateStep={updateStep}></Step>)

    const recap = listStep.map((step, index) => (
        <li>
            <Typography variant="h5">
                {t("STEP")} {index + 1} : {step.from.name} <ArrowForwardIcon /> {step.to.name}
            </Typography>
            <Typography variant="h5">
                {getDist(step)} km {t("BY")} {t(`${step.by}`)}
            </Typography>
            <Typography variant="h5">
                CO<sub>2</sub> equivalent : {Math.round(calculateur(getDist(step), step.by, step.nbPers) / 10) / 100} kg
            </Typography>
            <Comparator meansOfTransport={step.by} distance={getDist(step)} nbPers={step.nbPers} emissions={calculateur(getDist(step), step.by, step.nbPers)} ></Comparator>
        </li>
    ))


    return (
        props.travel.success ?
            <Redirect to="/mobilites" />
            :
            <React.Fragment>
                <Grid container justify="space-evenly" alignItems="flex-start" >
                    {(props.user.isLoggedIn && urlParams.id) ?
                        <Container className={classes.title}>
                            <Box display="flex">
                                <Box m="auto">
                                    <Typography variant="h3" gutterBottom marked="center" align="center" color="inherit">
                                        {t("ENTER_YOUR_JOURNEY")}
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography variant="h5" gutterBottom marked="center" align="center">
                                {props.mobilityData.mobilites.map((mobility: any) => mobility.id === Number(urlParams.id) &&
                                    <div>Enter here your journey for your {t(mobility.type)} in {mobility.place}.</div>)}
                            </Typography>
                        </Container>
                        :
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
                    }
                    <Grid md={6} alignItems="center">
                        <Container className={classes.journeyCard}>
                            <Box>
                                <Typography variant="h4" marked="center" align="center" color="inherit">
                                    {t("YOUR_JOURNEY")}
                                </Typography>
                                {(props.user.isLoggedIn && urlParams.id) &&
                                    <div>
                                        <div className={classes.field}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker disableToolbar inputVariant="outlined" format="dd/MM/yyyy" id="date" label="date" value={date} onChange={handleChangeDate} KeyboardButtonProps={{ 'aria-label': 'change date', }} />
                                            </MuiPickersUtilsProvider>
                                        </div>
                                        <FormControl variant="outlined">
                                            <InputLabel htmlFor="type">{t("TYPE")}</InputLabel>
                                            <Select variant="outlined" fullWidth id="type" name="type" label={t("TYPE")} autoComplete="type" onChange={handleChangeType} value={type} className={classes.field}>
                                                <MenuItem value={'GO'}>{t("GO")}</MenuItem>
                                                <MenuItem value={'BACK'}>{t("BACK")}</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>}
                                <div>
                                    <label><h4>{t("STEPS")} :</h4></label>
                                    {displayListStep}
                                </div>

                                <div className={classes.actionButton}>
                                    {displayListStep.length <= 1 ?
                                        <Button onClick={addStep}>{t("ADD_STEP")}</Button>
                                        :
                                        <div>
                                            <Button onClick={removeStep}>{t("REMOVE_STEP")}</Button>
                                            <Button onClick={addStep}>{t("ADD_STEP")}</Button>
                                        </div>
                                    }
                                </div>
                            </Box>
                        </Container>
                    </Grid>

                    <Grid md={6} alignItems="center">
                        <Container className={classes.journeyCard}>
                            <Box>
                                <Typography variant="h4" marked="center" align="center" color="inherit">
                                    {t("YOUR_EMISSIONS")}
                                </Typography>

                                <br></br>

                                <Typography variant="h5" marked="center" align="center" color="inherit">
                                    {t("EMISSION_DESCRIPTION")}
                                </Typography>
                                <ul>
                                    {recap}
                                </ul>
                                {(props.user.isLoggedIn && urlParams.id) &&
                                    <Button onClick={saveTravel}>{t("SAVE")}</Button>}
                            </Box>
                        </Container>
                    </Grid>
                </Grid>
            </React.Fragment>
    )
}

export default connector(Simulation);
