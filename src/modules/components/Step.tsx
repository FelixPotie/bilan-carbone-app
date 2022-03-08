// import classes from '*.module.css'
import { makeStyles, Select, Popover, FormControl, Button, Card, CardContent, CardHeader, IconButton, Typography, Menu } from '@material-ui/core'
import { TextField, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { geonames } from './../../utils/geonames'
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';
import { getDistance } from 'geolib';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: "5px",
        margin: "5px",
        borderRadius: "10px",
        backgroundColor: '#f8f8ff',
        position: 'relative',
        boxShadow: 'none'
    },
    transport: {
        marginTop: theme.spacing(2),
        width: "40%",
    },
    places: {
        borderStyle: "solid"
    },
    field: {
        width: "50%",
        marginTop: "28px",
        minWidth: "100px"
    },
    search: {
        verticalAlign: "middle"
    },
    city: {
        width: "90%",
    },
    button: {
        marginTop: "28px",
        width: "15%",
        right: '5%'
    },
    cityRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    country: {
        marginTop: "28px",
        right: '5%',
        width: "30%",
        padding: "16px 8px 0px 6px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
        color: "grey",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
    valid: {
        marginTop: "33px",
        width: "5%",
        right: '5%'
    }
}));

export default function Step(props: any) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [results, setResults] = useState([]);

    const { t } = useTranslation('simulationPage');

    const [popover, setPopover] = useState(false);

    const getFrom = () => {
        return props.step.from.name
    }
    const getTo = () => {
        return props.step.to.name
    }

    const getDist = (step: any): number => {
        return Math.round(getDistance({ latitude: step.from.lat, longitude: step.from.lng }, { latitude: step.to.lat, longitude: step.to.lng }) / 10) / 100
    }

    function updateDist(step: any) {
        let url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624884ad3bda18dc4f5895317c47566066a5&start=${step.from.lng},${step.from.lat}&end=${step.to.lng},${step.to.lat}`
        axios.get(url)
            .then((resp: any) => {
                let dist = resp?.data?.features[0]?.properties?.summary?.distance
                dist && dist !== 0 ?
                    step.dist = Math.round(dist / 10) / 100 :
                    step.dist = getDist(step)
                props.updateStep(step, props.id)
            })
            .catch(() => {
                step.dist = getDist(step)
                props.updateStep(step, props.id)
            })
    }

    const onChangeFrom = (event: any) => {
        let newStep = {
            ...props.step,
            from: {
                ...props.step.from,
                name: event.target.value,
                country: "",
            }
        }
        props.updateStep(newStep, props.id);
    }

    const onChangeTo = (event: any) => {
        let newStep = {
            ...props.step,
            to: {
                ...props.step.to,
                name: event.target.value,
                country: "",
            }
        }
        props.updateStep(newStep, props.id);
    }

    const find = (event: any, point: string) => {
        if (point && point !== '')
            geonames.search({ q: point, maxRows: 3 }).then((resp: any) => {
                setResults(resp.geonames)
                setAnchorEl(event.target);
            }).catch(err => { console.log(err) })
    }

    const getBy = () => props.step.by

    const handleChangeTransport = (event: any) => {
        let by = event.target.value

        if ((by === 'CAR' || by === 'ELECTRIC_CAR' || by === 'BUS' || by === 'MOTO'))
            updateDist({
                ...props.step, by: event.target.value
            })
        else {

            props.updateStep({
                ...props.step, by: event.target.value, dist: getDist(props.step)
            }, props.id)
        }
    }

    const getNbPers = () => props.step.nbPers

    const ChangeNumber = (event: any) => {
        props.updateStep({
            ...props.step,
            nbPers: event.target.value
        }, props.id)
    }

    const displayValid = (country: string) => {
        if (!country) {
            return (
                <CancelIcon className={classes.valid} style={{ color: "#ee0000" }} />
            )
        } else {
            return (
                <DoneOutlineIcon className={classes.valid} style={{ color: "#00ee00" }} />
            )
        }
    }

    // POPOVER

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <React.Fragment>
            <Card className={classes.card} key={props.id}>
                <CardHeader style={{ paddingBottom: "4px" }} title={t("STEP").concat(" ", props.id + 1)} action={
                    <IconButton aria-label="settings" onClick={(event) => props.deleteAction(event, props.id)} >
                        <DeleteIcon />
                    </IconButton>
                } />
                <CardContent>
                    <div className={classes.cityRow}>
                        <TextField
                            name="from"
                            required
                            label={t("FROM")}
                            variant="standard"
                            id="from"
                            value={getFrom()}
                            type="text"
                            placeholder={t("FROM")}
                            className={classes.field}
                            onChange={onChangeFrom}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    setPopover(true);
                                    find(event, getFrom());
                                }
                            }} />
                        <Typography className={classes.country} >
                            {props.step.from.country}
                        </Typography>
                        <Button className={classes.button} id="fromID" onClick={(e) => {
                            e.preventDefault();
                            setPopover(true)
                            find(e, getFrom())
                        }}><SearchIcon /></Button>
                        {displayValid(props.step.from.country)}
                    </div>
                    <div className={classes.cityRow}>
                        <TextField
                            name="to"
                            required
                            label={t("TO")}
                            variant="standard"
                            id="to" value={getTo()}
                            type="text" placeholder={t("TO")}
                            className={classes.field} onChange={onChangeTo}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    setPopover(false);
                                    find(event, getTo());
                                }
                            }} />
                        <Typography className={classes.country} >
                            {props.step.to.country}
                        </Typography>
                        <Button className={classes.button} id="toID" onClick={(e) => {
                            e.preventDefault();
                            setPopover(false)
                            find(e, getTo())
                        }}><SearchIcon /></Button>
                        {displayValid(props.step.to.country)}
                    </div>

                    <div className={classes.city}>

                        <FormControl variant="standard" className={classes.transport} style={{ paddingRight: "8px" }}>
                            <Select
                                variant="standard"
                                fullWidth
                                id="by"
                                name="by"
                                autoComplete="type"
                                onChange={handleChangeTransport}
                                value={getBy()}
                            >
                                <MenuItem value={"TGV"} >{t("TGV")}</MenuItem>
                                <MenuItem value={"PLANE"}>{t("PLANE")}</MenuItem>
                                <MenuItem value={"CAR"}>{t("CAR")}</MenuItem>
                                <MenuItem value={"ELECTRIC_CAR"}>{t("ELECTRIC_CAR")}</MenuItem>
                                <MenuItem value={"TER"}>{t("TER")}</MenuItem>
                                <MenuItem value={"MOTO"}>{t("MOTO")}</MenuItem>
                                <MenuItem value={"BUS"}>{t("BUS")}</MenuItem>
                                <MenuItem value={"FERRY_PEOPLE"}>{t("FERRY_PEOPLE")}</MenuItem>
                            </Select>
                        </FormControl>
                        {
                            (getBy() === "CAR" || getBy() === "ELECTRIC_CAR") &&
                            <FormControl variant="standard" className={classes.transport} style={{ paddingLeft: "8px" }}>
                                <Select
                                    variant="standard"
                                    fullWidth
                                    id="nbPers"
                                    name="nbPers"
                                    onChange={ChangeNumber}
                                    value={getNbPers()}
                                // className={classes.field}
                                >
                                    <MenuItem value={1}>1 {t("PASSENGER")}</MenuItem>
                                    <MenuItem value={2}>2 {t("PASSENGERS")}</MenuItem>
                                    <MenuItem value={3}>3 {t("PASSENGERS")}</MenuItem>
                                    <MenuItem value={4}>4 {t("PASSENGERS")}</MenuItem>
                                    <MenuItem value={5}>5 {t("PASSENGERS")}</MenuItem>
                                    <MenuItem value={6}>6 {t("PASSENGERS")}</MenuItem>
                                    <MenuItem value={7}>7 {t("PASSENGERS")}</MenuItem>
                                </Select>
                            </FormControl>
                        }
                    </div>
                </CardContent>
            </Card>
                <Menu open ={open} anchorEl={anchorEl} onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                {(results && results.length !== 0) ?
                    results.map((result: any, index) => (
                        <MenuItem key={index} onClick={async () => {
                            if (popover) {
                                let newStep = {
                                    ...props.step,
                                    from: {
                                        name: result.name,
                                        country: result.countryName,
                                        lat: parseFloat(result.lat),
                                        lng: parseFloat(result.lng)
                                    },
                                    dist: Math.round(getDistance({ latitude: parseFloat(result.lat), longitude: parseFloat(result.lng) }, { latitude: props.step.to.lat, longitude: props.step.to.lng }) / 10) / 100
                                }
                                if (props.step.by === 'CAR' || props.step.by === 'ELECTRIC_CAR' || props.step.by === 'BUS' || props.step.by === 'MOTO') {
                                    updateDist(newStep)
                                }
                                else {
                                    props.updateStep(newStep, props.id)
                                }
                            } else {
                                let newStep = {
                                    ...props.step,
                                    to: {
                                        name: result.name,
                                        country: result.countryName,
                                        lat: parseFloat(result.lat),
                                        lng: parseFloat(result.lng)
                                    },
                                    dist: Math.round(getDistance({ latitude: parseFloat(result.lat), longitude: parseFloat(result.lng) }, { latitude: props.step.from.lat, longitude: props.step.from.lng }) / 10) / 100
                                }
                                if (props.step.by === 'CAR' || props.step.by === 'ELECTRIC_CAR' || props.step.by === 'BUS' || props.step.by === 'MOTO') {
                                    updateDist(newStep)
                                }
                                else {
                                    props.updateStep(newStep, props.id)
                                }

                            }
                            handleClose()
                        }}> {result.name}, {result.countryName} </MenuItem>
                    ))
                    :
                    <div>pas de resultats</div>
                }</Menu>
        </React.Fragment>
    )
}
