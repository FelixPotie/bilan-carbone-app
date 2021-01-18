// import classes from '*.module.css'
import {Container, makeStyles, Select, Popover, FormControl, Button, Card, CardContent} from '@material-ui/core'
import { TextField, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { geonames } from './../../utils/geonames'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: "5px",
        margin: "5px",
        // borderStyle: "solid",
        // border: "2px",
        borderRadius: "10px",
        display: "inline-block",
        backgroundColor: '#e3e3ff',
        position:'relative'
    },
    transport: {
        marginTop:theme.spacing(2),
        width:"40%"
    },
    places: {
        borderStyle: "solid"
    },
    field: {
        width: "80%",
        // marginRight:"20%",
        marginTop: theme.spacing(2),
        minWidth: "100px"
    },
    search: {
        verticalAlign: "middle"
    },
    city: {
        width:"90%",
        margin: "auto"
    },
    button: {
        marginTop:"28px",
        width: "20%",
        position:'absolute',
        right:'5%'
    }
}));

export default function Step(props: any) {
    const classes = useStyles()
    const [from, setFrom] = useState('Montpellier, France')
    const [to, setTo] = useState('Montpellier, France')
    const [anchorEl, setAnchorEl] = useState(null);
    const [results, setResults] = useState([])
    const [step, setStep] = useState({ from: props.step.from, to: props.step.to, by: props.step.by, nbPers: props.step.nbPers })


    const { t } = useTranslation('simulationPage');

    const [popoverFrom, setPopoverFrom] = useState(false)


    const onChangeFrom = (event: any) => {
        setFrom(event.target.value)
    }

    const onChangeTo = (event: any) => {
        setTo(event.target.value)
    }

    const find = (event: any, point: string) => {
        if (point && point !== '')
            geonames.search({ q: point, maxRows: 3 }).then((resp: any) => {
                setResults(resp.geonames)
                setAnchorEl(event.target);
            }).catch(err => { console.log(err) })
    }

    const handleChangeTransport = (event: any) => {
        props.updateStep({
            ...step, by: event.target.value
        }, props.id)
        setStep({ ...step, by: event.target.value })
    }

    const ChangeNumber = (event: any) => {
        props.updateStep({
            ...step,
            nbPers: event.target.value
        }, props.id)
        setStep({
            ...step,
            nbPers: event.target.value
        })
    }

    // POPOVER

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <React.Fragment>
            <Card className={classes.card} variant="outlined" >
                <CardContent>
                    <div className={classes.city}>
                        <TextField
                            name="from"
                            label={t("FROM")}
                            variant="outlined"
                            id="from"
                            value={from}
                            type="text"
                            placeholder="from"
                            className={classes.field}
                            onChange={onChangeFrom}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    setPopoverFrom(true)
                                    find(event, from)
                                }
                            }} />
                            <Button className={classes.button} id="fromID" onClick={(e) => {
                                setPopoverFrom(true)
                                find(e, from)
                            }}><SearchIcon /></Button>
                        <TextField
                            name="to"
                            label={t("TO")}
                            variant="outlined"
                            id="to" value={to}
                            type="text" placeholder="to"
                            className={classes.field} onChange={onChangeTo}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    setPopoverFrom(false)
                                    find(event, to)
                                }
                            }} />
                            <Button className={classes.button} id="fromID" onClick={(e) => {
                                setPopoverFrom(false)
                                find(e, to)
                            }}><SearchIcon /></Button>
                    </div>
                    <div className={classes.city}>

                        <FormControl variant="outlined" className={classes.transport}>
                            <Select
                                variant="outlined"
                                fullWidth
                                id="by"
                                name="by"
                                autoComplete="type"
                                onChange={handleChangeTransport}
                                value={step.by}
                                // className={classes.field}
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
                            (step.by === "CAR" || step.by === "ELECTRIC_CAR") &&
                            <FormControl variant="outlined" className={classes.transport}>
                                <Select
                                    variant="outlined"
                                    fullWidth
                                    id="nbPers"
                                    name="nbPers"
                                    onChange={ChangeNumber}
                                    value={step.nbPers}
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
                                console.log(props.key)
                                setFrom(`${result.name}, ${result.countryName}`)
                                let newStep = {
                                    ...step,
                                    from: {
                                        name: result.name,
                                        country: result.countryName,
                                        lat: parseFloat(result.lat),
                                        lng: parseFloat(result.lng)
                                    }
                                }
                                props.updateStep(newStep, props.id)
                                setStep(newStep)

                            }
                            else {
                                setTo(`${result.name}, ${result.countryName}`)
                                let newStep = {
                                    ...step,
                                    to: {
                                        name: result.name,
                                        country: result.countryName,
                                        lat: parseFloat(result.lat),
                                        lng: parseFloat(result.lng)
                                    }
                                }
                                props.updateStep(newStep, props.id)
                                setStep(newStep)
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
