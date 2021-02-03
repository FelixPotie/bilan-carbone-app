import { Box, Button, Card, CardActions, CardContent, CircularProgress, Container, FormControl, Grid, InputLabel, List, ListItem, ListItemIcon, ListItemText, makeStyles, MenuItem, Select } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link, Redirect } from 'react-router-dom';
import Typography from '../components/Typography';
import Step from '../components/Step';
import Comparator from '../components/Comparator';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { addTravel, initTravel, updateTravel } from '../../redux/travel/actions';
import { getMobilitiesByUser } from '../../redux/mobility/actions';
import DateFnsUtils from '@date-io/date-fns';
import { getDistance } from 'geolib'
import { calculateur } from '../ademe/calcul'
import { useTranslation } from 'react-i18next';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import UnauthorizedContainer from './Unauthorized';
import DriveEtaRoundedIcon from '@material-ui/icons/DriveEtaRounded';
import GrainIcon from '@material-ui/icons/Grain';
import Alert from '@material-ui/lab/Alert';
import NotFound from '../../pages/NotFound';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import TrainIcon from '@material-ui/icons/Train';
import { wait } from '@testing-library/react';

const mapState = (state: RootState, ownProps: any) => {
    return {
        user: state.user,
        travel: state.travel,
        mobilityData: state.mobility,
        label: ownProps.label
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        addTravel: (body: object) => dispatch(addTravel(body)),
        updateTravel: (body: object) => dispatch(updateTravel(body)),
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

const defaultListStep: stepInterface[] = []

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    button: {
        marginBottom: theme.spacing(1),
        justifyContent: 'center',
        textDecoration: 'none'
    },
    tableContainer: {
        padingLeft: theme.spacing(4),
        padingRight: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    table: {
        minWidth: 700,
    },
    cardContainer: {
        width: "100%",
    },
    journeyCard: {
        // maxWidth: "650px",
        margin: "auto",
        width: "92%",
        borderRadius: "10px",
        backgroundColor: '#eeeeff',
        display: "flex",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(4),
        //margin: "none",
        boxShadow: 'none',
        justifyContent: "center",
        flexDirection: "column"
    },
    cardContent: {
        padding: "0px 0px 4px 0px"
    },
    emissionCard: {
        display: "block"
    },
    actionButton: {
        flexDirection: "row",
        justifyContent: "center"

    },
    etape: {
        marginLeft: "2%",
        marginBottom: theme.spacing(1)
    },
    form: {
        width: "60%",
        marginRight: "20%",
        marginLeft: "20%",
        marginTop: theme.spacing(2),
        minWidth: "100px"

    },
    cardTitle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    steps: {
        width: "90%",
        margin: "auto"
    },
    recap: {
        padding: "10px",
        marginTop: theme.spacing(1),
        width: "90%",
        marginLeft: "5%",
        marginRight: "5%",
        borderRadius: "10px",
        //display: "inline-block",
        backgroundColor: '#f8f8ff',
        boxShadow: 'none'
    },
    arrow: {
        marginBottom: "-5px"
    },
    generalform: {
        display: "contents"
    },
    alert:{
        width:"80%",
        margin:"auto",
        marginTop: theme.spacing(2)
    },
    load:{
        display:"flex",
        justifyContent: "center",
        marginTop: theme.spacing(4)
    }
}));


function Simulation(props: Props) {
    const { t } = useTranslation('simulationPage');
    const classes = useStyles();
    const [listStep, setlistStep] = React.useState(defaultListStep)
    const [date, setDate] = React.useState<Date | null>(
        null
    )
    const [type, setType] = useState(null);
    const [mobility, setMobility] = React.useState<any>();
    const [travel, setTravel] = React.useState<any>();
    const [show, setShow] = React.useState(false)

    useEffect(() => {
        setTimeout(() => {
            setShow(true)
        }, 1000)
    }, [show])

    useEffect(() => {
        if (props.user.isLoggedIn && (props.label==="add" || props.label==="update")) {
            props.getMobilitiesByUser(props.user.user.username);
        }
    }, [props.user.isLoggedIn])

    useEffect(() => {
        if(props.user.isLoggedIn && props.label==="update") setMobility(props.mobilityData.mobilites.find((mobility: any) => (mobility.id === +mobilityId)));
    }, [props.mobilityData.success])

    useEffect(() => {
        if(props.user.isLoggedIn && props.label==="update" && mobility) setTravel(mobility.travels.find((t:any)=>t.id===+travelId))
    }, [props.mobilityData.success, mobility])

    useEffect(() => {
        if(props.user.isLoggedIn && props.label==="update" && travel) initData()
    }, [props.mobilityData.success, travel])

    const urlParams: any = useParams()
    const mobilityId = props.label==="add"? urlParams.id : props.label==="update"? urlParams.id : undefined;
    const travelId = props.label==="update"? urlParams.journeyid: undefined;
        
    const initData = () => {
        if(travel){
            setDate(travel.date);
            setType(travel.type);
            const list : stepInterface[] = [];
            travel.steps.forEach((s:any)=>{
                const place1 : place = {
                    name: s.departure.split(',')[0],
                    country: "",
                    lat: 0,
                    lng: 0
                }
                const place2 : place = {
                    name: s.arrival.split(',')[0],
                    country: "",
                    lat: 0,
                    lng: 0
                }
                const newStep : stepInterface = {
                    from: place1,
                    to: place2,
                    by: s.meansOfTransport,
                    nbPers: 1
                }
                list.push(newStep);
            })
            setlistStep(list);
        }
    }

    const removeStep = (event: any, index: number) => {
        const newFeatures = [...listStep];
        newFeatures.splice(index, 1);
        setlistStep(newFeatures);
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
        var step = defaultStep;
        step.from=listStep[listStep.length -1].to;
        setlistStep(listStep.concat(step))
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

    const checkMobilityId = () => {
        return !props.mobilityData.mobilites.find((mobility: any) => (mobility.id === +mobilityId))
    }

    const checkTravelId = () => {
        return !props.mobilityData.mobilites.find((mobility: any) => mobility.travels.find((travel:any) => (travel.id === +travelId)))
    }


    const saveTravel = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let steps: Object[] = []
        const body = {
            mobilityId: mobilityId,
            travel:travel,
            travelId: travelId,
            type: type,
            date: date,
            steps: steps
        }
        listStep.forEach((step, index: number) => {
            steps.push({
                rank: index,
                departure: `${step.from.name}, ${step.from.country}`,
                arrival: `${step.to.name}, ${step.to.country}`,
                distance: Math.round(getDist(step)),
                meansOfTransport: step.by,
                carboneEmission: Math.round(calculateur(getDist(step), step.by, step.nbPers))
            })
            if (index === listStep.length - 1) {
                if(props.label==="add"){
                    props.addTravel(body)
                } else if(props.label==="update"){
                    props.updateTravel(body);
                }
            }
        })
        
    }

    const chooseType = () => {
        const mob = props.mobilityData.mobilites.find((m: any) => m.id === +urlParams.id);
        if(props.label==="update"){
            return (
                <Select disabled variant="outlined" fullWidth id="type" name="type" label={t("TYPE")} value={type} >
                    <MenuItem value={'GO'}>{t("GO")}</MenuItem>
                    <MenuItem value={'BACK'}>{t("BACK")}</MenuItem>
                </Select>
            )
        } else if (mob.travels.find((go: any) => go.type === "GO") && mob.travels.find((back: any) => back.type === "BACK")) {
            return (
                <Select required variant="outlined" fullWidth id="type" name="type" label={t("TYPE")} autoComplete="type" onChange={handleChangeType} value={type} >
                </Select>
            )
        } else if (mob.travels.find((go: any) => go.type === "GO")) {
            return (
                <Select required variant="outlined" fullWidth id="type" name="type" label={t("TYPE")} autoComplete="type" onChange={handleChangeType} value={type} >
                    <MenuItem value={'BACK'}>{t("BACK")}</MenuItem>
                </Select>
            )
        } else if (mob.travels.find((back: any) => back.type === "BACK")) {
            return (
                <Select required variant="outlined" fullWidth id="type" name="type" label={t("TYPE")} autoComplete="type" onChange={handleChangeType} value={type} >
                    <MenuItem value={'GO'}>{t("GO")}</MenuItem>
                </Select>
            )
        } else {
            return (
                <Select required variant="outlined" fullWidth id="type" name="type" label={t("TYPE")} autoComplete="type" onChange={handleChangeType} value={type} >
                    <MenuItem value={'GO'}>{t("GO")}</MenuItem>
                    <MenuItem value={'BACK'}>{t("BACK")}</MenuItem>
                </Select>
            )
        }
    }


    const displayListStep = listStep.map((step, index: number) => {
        return <Step key={index} id={index} step={step} updateStep={updateStep} deleteAction={removeStep}></Step>
    });

    const displayIcon = (means:string) => {
        if(means==="PLANE") return <AirplanemodeActiveIcon/>
        else if (means==="BUS") return <AirportShuttleIcon/>
        else if (means==="MOTO") return <MotorcycleIcon/>
        else if (means==="TER" || means==="TGV") return <TrainIcon/>
        else return <DriveEtaRoundedIcon />
            
    }

    const recap = listStep.map((step, index) => (
        <Card className={classes.recap} key={index}>
            <Typography variant="h5">
                {t("STEP")} {index + 1} : {step.from.name} <ArrowRightAltIcon className={classes.arrow} /> {step.to.name}
            </Typography>
            <List>
                <ListItem>
                    <ListItemIcon>
                        {displayIcon(step.by)}
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
            <Comparator key={index} meansOfTransport={step.by} distance={getDist(step)} nbPers={step.nbPers} emissions={calculateur(getDist(step), step.by, step.nbPers)} />
        </Card>
    ))

    const displayButton = () =>{
        var good=true;
        listStep.forEach((step:stepInterface)=>{
            if(step.from.country==="" || step.to.country==="") good=false;
        });
        if(good){
            if(props.label==="add"){
                return(
                    <Button variant="contained" color="primary" type="submit">{t("SAVE")}</Button>
                )
            } else {
                return(
                    <Button variant="contained" color="primary" type="submit">{t("UPDATE")}</Button>
                )
            }
            
        }else{
            if(props.label==="add"){
                return(
                    <Button variant="contained" color="primary" disabled>{t("SAVE")}</Button>
                )
            } else {
                return(
                    <Button variant="contained" color="primary" disabled>{t("UPDATE")}</Button>

                )
            }
        }
    }

    if (listStep.length === 0) {
        listStep.push(defaultStep);
        setlistStep(listStep);
    }

    const displayError = () => {
        if(show) return (<NotFound/>)
        else {
            return (
                <div className={classes.load}>
                    <CircularProgress/>
                </div>
            )
        }
    }

    return (!props.user.isLoggedIn && urlParams.id) ? (
        <UnauthorizedContainer />
    ) : (mobilityId && checkMobilityId()) ? (
        <React.Fragment>
            {displayError()}
        </React.Fragment>
    ) : (travelId && checkTravelId()) ? (
        <React.Fragment>
            {displayError()}
        </React.Fragment>
    )  : props.travel.error ? (
        <Typography variant="h3" gutterBottom marked="center" align="center">
            {props.travel.error} : Veuillez réessayer
        </Typography>
    ) : props.travel.success ? (
        <Redirect to="/mobilites" />
    ) : (
        <React.Fragment>
            {(props.user.isLoggedIn && (props.label==="add" || props.label==="update")) ?
                <Container className={classes.title}>
                    <Box display="flex">
                        <Box m="auto">
                            {props.label==="add"?
                            <Typography variant="h3" gutterBottom marked="center" align="center" color="inherit">
                                {t("ENTER_YOUR_JOURNEY")}
                            </Typography>
                            :
                            <Typography variant="h3" gutterBottom marked="center" align="center" color="inherit">
                                {t("UPDATE_YOUR_JOURNEY")}
                            </Typography>
                            }
                        </Box>
                    </Box>
                    <Typography variant="h5" gutterBottom marked="center" align="center">
                        {props.mobilityData.mobilites.map((mobility: any) => mobility.id === Number(mobilityId) &&
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
                    {props.user.isLoggedIn ?
                        <Alert variant="outlined" severity="warning" className={classes.alert}>{t("ALERT_CONNECTED")}<strong><Link to='/mobilites'>{t("MOBILITIES")}</Link></strong> !</Alert>
                        :
                        <Alert variant="outlined" severity="warning" className={classes.alert}>{t("ALERT_DISCONNECTED")} <strong><Link to='/signin'>{t("LOGIN")}</Link></strong></Alert>
                    }
                </Container>
            }
            <Grid container>
                <form onSubmit={e => saveTravel(e)} className={classes.generalform}>
                    <Grid item md={6} className={classes.cardContainer} >
                        <Card className={classes.journeyCard} >
                            <CardContent className={classes.cardContent}>
                                <Box display="flex" >
                                    <Box m="auto">
                                        <Typography className={classes.cardTitle} variant="h4" marked="center" align="center" color="inherit">
                                            {t("YOUR_JOURNEY")}
                                        </Typography>
                                    </Box>
                                </Box>
                                {(props.user.isLoggedIn && (props.label==="add" || props.label==="update")) &&
                                    <div>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                            <KeyboardDatePicker className={classes.form} required inputVariant="outlined" format="dd/MM/yyyy" id="date" label="Date" value={date} onChange={handleChangeDate} onKeyDown={(event) => { if (event.key === 'Enter') event.preventDefault() }} KeyboardButtonProps={{ 'aria-label': 'change date', }} />
                                        </MuiPickersUtilsProvider>
                                        <FormControl variant="outlined" className={classes.form} style={{ marginBottom: "16px" }}>
                                            {props.label==="add" &&<InputLabel htmlFor="type">{t("TYPE")}</InputLabel>}
                                            {chooseType()}
                                        </FormControl>
                                    </div>
                                }
                                <div className={classes.steps}>
                                    {displayListStep}
                                </div>
                            </CardContent>
                            <CardActions className={classes.actionButton}>
                                <Button onClick={addStep}>{<AddIcon fontSize="large" />}</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item md={6} className={classes.cardContainer}>
                        <Card className={classes.journeyCard} >
                            <CardContent className={classes.cardContent}>
                                <Box display="flex" >
                                    <Box m="auto">
                                        <Typography className={classes.cardTitle} variant="h4" marked="center" align="center" color="inherit">
                                            {t("YOUR_EMISSIONS")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography key="emission" className={classes.etape} variant="h5" color="inherit">
                                    {t("EMISSION_DESCRIPTION")}
                                </Typography>
                                <div className={classes.steps}>
                                    {recap}
                                </div>
                            </CardContent>

                            {(props.user.isLoggedIn && (props.label==="add" || props.label==="update")) &&
                                <CardActions className={classes.actionButton}>
                                    {displayButton()}
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
