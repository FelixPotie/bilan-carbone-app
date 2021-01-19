// import classes from '*.module.css'
import { makeStyles, Select, Popover, FormControl, Button, Card, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core'
import { TextField, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { geonames } from './../../utils/geonames'
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: "5px",
        margin: "5px",
        // borderStyle: "solid",
        // border: "2px",
        borderRadius: "10px",
        //display: "inline-block",
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
        // marginRight:"20%",
        marginTop: theme.spacing(2),
        minWidth: "100px"
    },
    search: {
        verticalAlign: "middle"
    },
    city: {
        width: "90%",
        //margin: "auto"
    },
    button: {
        marginTop: "28px",
        width: "20%",
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
        padding: "6px 8px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
        color: "grey",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap"
    },
}));

export default function Step(props: any) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);
    const [results, setResults] = useState([])

    const { t } = useTranslation('simulationPage');

    const [popoverFrom, setPopoverFrom] = useState(false)

    const getFrom = () => {
        return props.step.from.name
    }
    const getTo = () => {
        return props.step.to.name
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
        props.updateStep(newStep, props.id)

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
        props.updateStep(newStep, props.id)
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
        props.updateStep({
            ...props.step, by: event.target.value
        }, props.id)
    }

    const getNbPers = () => props.step.nbPers

    const ChangeNumber = (event: any) => {
        props.updateStep({
            ...props.step,
            nbPers: event.target.value
        }, props.id)
    }

    // POPOVER

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <React.Fragment>
            <Card className={classes.card} >
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
                            placeholder="from"
                            className={classes.field}
                            onChange={onChangeFrom}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    setPopoverFrom(true)
                                    find(event, getFrom())
                                }
                            }} />
                        <Typography className={classes.country} >
                            {props.step.from.country}
                        </Typography>
                        <Button className={classes.button} id="fromID" onClick={(e) => {
                            setPopoverFrom(true)
                            find(e, getFrom())
                        }}><SearchIcon /></Button>
                    </div>
                    <div className={classes.cityRow}>
                        <TextField
                            name="to"
                            required
                            label={t("TO")}
                            variant="standard"
                            id="to" value={getTo()}
                            type="text" placeholder="to"
                            className={classes.field} onChange={onChangeTo}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    setPopoverFrom(false)
                                    find(event, getTo())
                                }
                            }} />
                        <Typography className={classes.country} >
                            {props.step.to.country}
                        </Typography>
                        <Button className={classes.button} id="toID" onClick={(e) => {
                            setPopoverFrom(false)
                            find(e, getTo())
                        }}><SearchIcon /></Button>
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
            <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                {(results && results.length !== 0) ?
                    results.map((result: any) => (
                        <p onClick={() => {
                            if (popoverFrom) {
                                let newStep = {
                                    ...props.step,
                                    from: {
                                        name: result.name,
                                        country: result.countryName,
                                        lat: parseFloat(result.lat),
                                        lng: parseFloat(result.lng)
                                    }
                                }
                                props.updateStep(newStep, props.id)
                            }
                            else {
                                let newStep = {
                                    ...props.step,
                                    to: {
                                        name: result.name,
                                        country: result.countryName,
                                        lat: parseFloat(result.lat),
                                        lng: parseFloat(result.lng)
                                    }
                                }
                                props.updateStep(newStep, props.id)
                            }
                            handleClose()
                        }}> {result.name}, {result.countryName} </p>
                    ))
                    :
                    <div>pas de resultats</div>
                }</Popover>
        </React.Fragment>
    )
}
