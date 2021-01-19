import { Box, Button, Card, CardActions, CardContent, Container, FormControl, Grid, InputLabel, List, ListItem, ListItemIcon, ListItemText, makeStyles, MenuItem, Select } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Redirect } from 'react-router-dom';
import Typography from '../components/Typography';
import Step from '../components/Step';
import Comparator from '../components/Comparator';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { addTravel } from '../../redux/travel/actions';
import { getMobilitiesByUser } from '../../redux/mobility/actions';
import DateFnsUtils from '@date-io/date-fns';
import { getDistance } from 'geolib'
import { calculateur } from '../ademe/calcul'
import { useTranslation } from 'react-i18next';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import UnauthorizedContainer from './Unauthorized';
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';
import GrainIcon from '@material-ui/icons/Grain';

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
        maxWidth: "650px",
        margin:"auto",
        width: "92%",
        borderRadius: "10px",
        backgroundColor: '#eeeeff',
        display: "block",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
    },
    emissionCard: {
        display: "block"
    },
    actionButton: {
        flexDirection: "row-reverse"
    },
    etape: {
        marginLeft: "2%",
        marginBottom:theme.spacing(1)
    },
    form: {
        width: "60%",
        marginRight:"20%",
        marginLeft: "20%",
        marginTop: theme.spacing(2),
        minWidth: "100px"

    },
    cardTitle:{
        marginBottom: theme.spacing(3)
    },
    steps:{
        width:"90%",
        margin: "auto"
    },
    recap: {
        padding: "10px",
        marginTop:theme.spacing(1),
        width:"90%",
        marginLeft: "5%",
        marginRight: "5%",
        borderRadius: "10px",
        display: "inline-block",
        backgroundColor: '#e3e3ff',
    },
    arrow: {
        marginBottom: "-5px"
    },
    generalform:{
        display: "contents"
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
        if (props.user.isLoggedIn) {
            props.getMobilitiesByUser(props.user.user.username)
        }
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

    const checkMobilityId = () =>{
        return props.mobilityData.mobilites.find((mobility:any)=> (mobility.id===+urlParams.id))
    }

    const saveTravel = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let steps: Object[] = []
        const body = {
            mobilityId: urlParams.id,
            type: type,
            date: date?.toISOString(),
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

    const chooseType = () => {
        const mob = props.mobilityData.mobilites.find((m:any)=>m.id===+urlParams.id);
        if(mob.travels.find((go:any)=>go.type==="GO") && mob.travels.find((back:any)=>back.type==="BACK")){
            return(
                <Select required variant="outlined" fullWidth id="type" name="type" label={t("TYPE")} autoComplete="type" onChange={handleChangeType} value={type} >
                </Select>
            )
        }else if(mob.travels.find((go:any)=>go.type==="GO")){
            return(
                <Select required variant="outlined" fullWidth id="type" name="type" label={t("TYPE")} autoComplete="type" onChange={handleChangeType} value={type} >
                    <MenuItem value={'BACK'}>{t("BACK")}</MenuItem>
                </Select>
            )
        }else if(mob.travels.find((back:any)=>back.type==="BACK")){
            return(
                <Select required variant="outlined" fullWidth id="type" name="type" label={t("TYPE")} autoComplete="type" onChange={handleChangeType} value={type} >
                    <MenuItem value={'GO'}>{t("GO")}</MenuItem>
                </Select>
            )
        }else{
            return(
                <Select required variant="outlined" fullWidth id="type" name="type" label={t("TYPE")} autoComplete="type" onChange={handleChangeType} value={type} >
                    <MenuItem value={'GO'}>{t("GO")}</MenuItem>
                    <MenuItem value={'BACK'}>{t("BACK")}</MenuItem>
                </Select>
            )
        }
    }
    const displayListStep = listStep.map((step, index: number) =>
        <Step key={index} id={index} step={defaultStep} updateStep={updateStep}></Step>)

    const recap = listStep.map((step, index) => (
        <Card className={classes.recap} variant="outlined">
            <Typography variant="h5">
                {t("STEP")} {index + 1} : {step.from.name} <ArrowRightAltIcon className={classes.arrow}/> {step.to.name}
            </Typography>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <DriveEtaRoundedIcon />
                    </ListItemIcon>
                    <ListItemText>
                        {getDist(step)} km {t("BY")} {t(`${step.by}`)}
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <GrainIcon />
                    </ListItemIcon>
                    <ListItemText>
                        CO<sub>2</sub> equivalent : {Math.round(calculateur(getDist(step), step.by, step.nbPers) / 10) / 100} kg
                    </ListItemText>
                </ListItem>
            </List>
            <Comparator meansOfTransport={step.by} distance={getDist(step)} nbPers={step.nbPers} emissions={calculateur(getDist(step), step.by, step.nbPers)} ></Comparator>
        </Card>
    ))

    return (!props.user.isLoggedIn && urlParams.id) || (urlParams.id && !checkMobilityId()) ? (
        <UnauthorizedContainer/>
        ) : props.travel.error ?(
            <Typography variant="h3" gutterBottom marked="center" align="center">
                {props.travel.error} : Veuillez réessayer
            </Typography>
        ) : props.travel.success ?(
            <Redirect to="/mobilites" />
        ):(
            <React.Fragment>
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
                                    <div>{t("SUBTITLE")}{t(mobility.type)} {t("IN")} {mobility.place}.</div>)}
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
                <Grid container >
                    <form onSubmit={e => saveTravel(e)} className={classes.generalform}>
                    <Grid md={6} alignItems="center">
                    <Card className={classes.journeyCard} variant="outlined" >
                        <CardContent>
                            <Box display="flex" >
                                <Box m="auto">
                                    <Typography className={classes.cardTitle} variant="h4" marked="center" align="center" color="inherit">
                                        {t("YOUR_JOURNEY")}
                                    </Typography>
                                </Box>
                            </Box>
                            {(props.user.isLoggedIn && urlParams.id) &&
                                <div>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                        <KeyboardDatePicker className={classes.form} disableToolbar required inputVariant="outlined" format="dd/MM/yyyy" id="date" label="Date" value={date} onChange={handleChangeDate} onKeyDown={(event) => {if (event.key === 'Enter') event.preventDefault()}} KeyboardButtonProps={{ 'aria-label': 'change date', }} />
                                    </MuiPickersUtilsProvider>
                                    <FormControl variant="outlined" className={classes.form}>
                                        <InputLabel htmlFor="type">{t("TYPE")}</InputLabel>
                                        {chooseType()}
                                    </FormControl>
                                </div>
                            }
                            <h4 className={classes.etape}>{t("STEPS")} :</h4>
                            <div className={classes.steps}>
                                {displayListStep}
                            </div>
                            </CardContent>
                            <CardActions className={classes.actionButton}>
                                {displayListStep.length <= 1 ?
                                        <Button onClick={addStep}>{t("ADD_STEP")}</Button>
                                    :
                                    <div>
                                        <Button onClick={removeStep}>{t("REMOVE_STEP")}</Button>
                                        <Button onClick={addStep}>{t("ADD_STEP")}</Button>
                                    </div>}
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid md={6} alignItems="center">
                        <Card className={classes.journeyCard} variant="outlined">
                            <CardContent>
                                <Box display="flex" >
                                    <Box m="auto">
                                        <Typography className={classes.cardTitle} variant="h4" marked="center" align="center" color="inherit">
                                            {t("YOUR_EMISSIONS")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography className={classes.etape} variant="h5" color="inherit">
                                    {t("EMISSION_DESCRIPTION")}
                                </Typography>
                                <div className={classes.steps}>
                                    {recap}
                                </div>
                            </CardContent>
                            
                                {(props.user.isLoggedIn && urlParams.id) &&
                                    <CardActions className={classes.actionButton}>
                                        <Button type="submit">{t("SAVE")}</Button>
                                    </CardActions>
                                }
                        </Card>
                    </Grid>
                    </form>
                </Grid>
            </React.Fragment>
    )
}

export default connector(Simulation);
