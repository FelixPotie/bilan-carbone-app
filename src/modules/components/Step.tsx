// import classes from '*.module.css'
import { Button, Container, makeStyles, Select, Popover } from '@material-ui/core'
import { TextField, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import {geonames} from './../../utils/geonames'

interface place {
    name: string,
    country: string,
    lat: number,
    lng: number
}

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
    const [step, setStep] = useState({ from: props.step.from, to: props.step.to, by: "plane" })

    const [popoverFrom, setPopoverFrom] = useState(true)


    const onChangeFrom = (event: any) => {
        setFrom(event.target.value)
    }

    const onChangeTo = (event: any) => {
        setTo(event.target.value)
    }

    const find = (event: any, point: string) => {
        if (point && point != '')
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
                    <label>from : </label>
                    <TextField value={from} type="text" placeholder="from" className={classes.places} onChange={onChangeFrom} />
                    <Button id="fromID" onClick={(e) => {
                        setPopoverFrom(true)
                        find(e, from)
                    }}>Find</Button>
                </div>
                <div>
                    <label>To : </label>
                    <TextField value={to} type="text" placeholder="to" className={classes.places} onChange={onChangeTo} />
                    <Button onClick={(e) => {
                        setPopoverFrom(false)
                        find(e, to)
                    }}>Find</Button>
                </div>
                <div >
                    <Select value={step.by} label="transport" className={classes.transport} onChange={handleChangeTransport}>
                        <MenuItem value={"train"} >Train</MenuItem>
                        <MenuItem value={"plane"}>Avion</MenuItem>
                        <MenuItem value={"car"}>Voiture</MenuItem>
                        <MenuItem value={"bus"}>Bus</MenuItem>
                    </Select>
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
                        {(results && results.length != 0) ?
                            results.map((result: any) => (
                                <p onClick={() => {
                                    if (popoverFrom) {
                                        console.log(props.key)
                                        setFrom(`${result.name}, ${result.countryName}`)
                                        props.updateStep({
                                            ...props.step, from: {
                                                name: result.name,
                                                country: result.countryName,
                                                lat: parseFloat(result.lat),
                                                lng: parseFloat(result.lng)
                                            },
                                        }, props.id)

                                    }
                                    else {
                                        setTo(`${result.name}, ${result.countryName}`)
                                        props.updateStep({
                                            
                                            ...props.step, to: {
                                                name: result.name,
                                                country: result.countryName,
                                                lat: parseFloat(result.lat),
                                                lng: parseFloat(result.lng)
                                            },
                                        }, props.id)
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
