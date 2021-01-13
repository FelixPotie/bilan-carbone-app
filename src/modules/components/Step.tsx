// import classes from '*.module.css'
import { Button, Container, makeStyles, Select, Popover } from '@material-ui/core'
import { TextField, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { geonames } from './../../utils/geonames'

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: "90%",
        padding: "10px",
        margin: "10px",
        borderStyle: "solid",
        border: "2px",
        borderRadius: "10px",
        display: "inline-block",
    },
    transport: {
        minWidth: "100px",
        marginTop: "15px",
        borderStyle: "solid",
        marginRight: "15px",
        textAlign: "center"
    },
    places: {
        borderStyle: "solid"
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

    const [popoverFrom, setPopoverFrom] = useState(true)


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
            <Container className={classes.card}>
                <div>
                    <label>{t("FROM")} : </label>
                    <TextField value={from} type="text" placeholder="from" className={classes.places} onChange={onChangeFrom} onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            setPopoverFrom(false)
                            find(event, to)
                        }
                    }}/>
                    <Button id="fromID" onClick={(e) => {
                        setPopoverFrom(true)
                        find(e, from)
                    }}>{t("FIND")}</Button>
                </div>
                <div>
                    <label>{t("TO")} : </label>
                    <TextField value={to} type="text" placeholder="to" className={classes.places} onChange={onChangeTo} onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            setPopoverFrom(false)
                            find(event, to)
                        }
                    }} />
                    <Button onClick={(e) => {
                        setPopoverFrom(false)
                        find(e, to)
                    }}>{t("FIND")}</Button>
                </div>
                <div >
                    <Select value={step.by} label="transport" className={classes.transport} onChange={handleChangeTransport}>
                        <MenuItem value={"TGV"} >{t("TGV")}</MenuItem>
                        <MenuItem value={"PLANE"}>{t("PLANE")}</MenuItem>
                        <MenuItem value={"CAR"}>{t("CAR")}</MenuItem>
                        <MenuItem value={"ELECTRIC_CAR"}>{t("ELECTRIC_CAR")}</MenuItem>
                        <MenuItem value={"TER"}>{t("TER")}</MenuItem>
                        <MenuItem value={"MOTO"}>{t("MOTO")}</MenuItem>
                        <MenuItem value={"BUS"}>{t("BUS")}</MenuItem>

                    </Select>
                    {
                        (step.by === "CAR" || step.by === "ELECTRIC_CAR") && <Select value={step.nbPers} className={classes.transport} onChange={ChangeNumber}>
                            <MenuItem value={1}>1 {t("PASSENGER")}</MenuItem>
                            <MenuItem value={2}>2 {t("PASSENGERS")}</MenuItem>
                            <MenuItem value={3}>3 {t("PASSENGERS")}</MenuItem>
                            <MenuItem value={4}>4 {t("PASSENGERS")}</MenuItem>
                            <MenuItem value={5}>5 {t("PASSENGERS")}</MenuItem>
                            <MenuItem value={6}>6 {t("PASSENGERS")}</MenuItem>
                            <MenuItem value={7}>7 {t("PASSENGERS")}</MenuItem>
                        </Select>
                    }
                </div>
            </Container>
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
